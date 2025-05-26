import express from "express";
import bcrypt from "bcrypt";
import { findUserByUserName, getUserPassword } from "../db/models/userModels";
import { createToken, getValueByPath, listAllKeys } from "../tools";
import jwt from "jsonwebtoken";
import { findIPObyId, getIPOByUserId } from "../db/models/ipoModels";
import { findPostById } from "../db/models/postModels";
import {
  createAPIResponse,
  createInternalServerErrorResponse,
  mapAPIResponseToDBResponse,
} from "../tools/apiResponse";
import { API_RESPONSE_CODE_ENUM } from "../tools/apiResponseCodes";

/* middleware for checking if user exists or not and acts
 * according to the path the req is coming from, if it is
 * from '/signup' and the user exists then he cannot signup
 * whereas if the req is coming from '/login' and if user
 * exists then it forwards the founded userId to the next
 * middleware and then let the user login.
 */
export async function userExist(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    // const result = await findUserByUserName(userName);
    // if (result.message === "success") {
    //   if (path === "/signup") {
    //     if (result.foundedUser === null) {
    //       next();
    //     } else {
    //       res
    //         .status(403)
    //         .json({ operation: "Error", message: "User already exists." });
    //     }
    //   } else if (path === "/login") {
    //     if (result.foundedUser !== null) {
    //       req.body.userId = result.foundedUser._id;
    //       next();
    //     } else {
    //       res.status(400).json({
    //         operation: "Error",
    //         message: "User does not exists with provided credentials.",
    //         credentials: {
    //           userName,
    //         },
    //       });
    //     }
    //   }
    // } else {
    //   res.status(400).json(result.error);
    // }
    const { userName } = req.body;
    const path = req.route.path;
    const findUserNameResponse = await findUserByUserName(userName);
    // error & error result in dbResponse
    if (!findUserNameResponse.success && findUserNameResponse.result) {
      const apiResponse = mapAPIResponseToDBResponse({
        dbResponse: findUserNameResponse,
      });
      return res.status(500).json(apiResponse);
    }

    // signing up the user
    if (path === "/signup") {
      if (!findUserNameResponse.result) {
        next();
      } else {
        const apiResult = {
          userName,
        };
        const apiResponse = createAPIResponse({
          code: API_RESPONSE_CODE_ENUM.API_USER_SIGNUP_DUPLICATE_USER_ERROR,
          result: apiResult,
          success: false,
        });
        return res.status(400).json(apiResponse);
      }
    }
    // logging in the user
    else if (path === "/login") {
      if (findUserNameResponse.result) {
        // passing founded user id for logging in
        req.body.userId = findUserNameResponse.result._id;
        next();
      } else {
        const apiResult = {
          userName,
        };
        const apiResponse = createAPIResponse({
          code: API_RESPONSE_CODE_ENUM.API_USER_LOGIN_NULL_USER_ERROR,
          result: apiResult,
          success: false,
        });
        return res.status(400).json(apiResponse);
      }
    } else {
      const apiResult = {
        path,
      };
      const apiResponse = createAPIResponse({
        code: API_RESPONSE_CODE_ENUM.API_USER_INVALID_REQUEST_ERROR,
        result: apiResult,
        success: false,
      });
      return res.status(400).json(apiResponse);
    }
  } catch (error) {
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

/* middleware for hashing password */
export async function passwordHash(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { userPassword } = req.body;

    const hashedStr = await bcrypt.hash(userPassword, 8);
    // .then((res) => res)
    // .catch((err) => err);
    if (hashedStr.length > 0) {
      req.body.userPassword = hashedStr;
      next();
    } else {
      const apiResult = {
        userPassword,
        suggestion:
          "Unexpected issue occurred while hashing the password. Contact the developers.",
      };
      return res.status(500).json(
        createAPIResponse({
          code: API_RESPONSE_CODE_ENUM.API_USER_PASSWORD_HASHING_FAILED,
          result: apiResult,
          success: false,
        })
      );
    }
  } catch (error) {
    // res.status(500).json({ error, message: "Internal Server Error" });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// middleware : validating user name and user password are string
export async function validateUserCredentials(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    // if (typeof userName && typeof userPassword === "string") {
    //   if (userName.length >= 4 && userName.length <= 10) {
    //     if (userPassword.length >= 8 && userPassword.length <= 20) {
    //       next();
    //     } else {
    //       res.status(400).json({
    //         operation: "Error",
    //         message: "User Password provided is not valid.",
    //       });
    //     }
    //   } else {
    //     res.status(400).json({
    //       operation: "Error",
    //       message: "User Name provided is not valid.",
    //     });
    //   }
    // } else {
    //   res.status(403).json({
    //     operation: "Error",
    //     message: "userName & userPassword provided must be string.",
    //   });
    // }
    const { userName, userPassword } = req.body;
    const MIN_USERNAME_LENGTH: number = 4;
    const MAX_USERNAME_LENGTH: number = 10;
    const MIN_USERPASSWORD_LENGTH: number = 8;
    const MAX_USERPASSWORD_LENGTH: number = 20;
    const missingFields: string[] = [];

    // missing fields
    // missing userName
    if (!userName) missingFields.push("userName");
    // missing userPassword
    if (!userPassword) missingFields.push("userPassword");

    // missingFields responses
    if (missingFields.length > 0) {
      return res.status(400).json(
        createAPIResponse({
          code: API_RESPONSE_CODE_ENUM.API_MISSING_REQUIRED_REQUEST_BODY_ARGUMENTS_ERROR,
          result: { missingFields },
          success: false,
        })
      );
    }

    // invalid type of fields
    if (typeof userName !== "string" || typeof userPassword !== "string") {
      const apiResult = {
        requiredType: {
          userName: "string",
          userPassword: "string",
        },
        receivedType: {
          userName: typeof userName,
          userPassword: typeof userPassword,
        },
      };
      return res.status(400).json(
        createAPIResponse({
          code: API_RESPONSE_CODE_ENUM.API_INVALID_ARGUMENT_TYPE_ERROR,
          result: apiResult,
          success: false,
        })
      );
    }

    // length of the arguments
    // user name
    if (
      userName.length < MIN_USERNAME_LENGTH ||
      userName.length > MAX_USERNAME_LENGTH
    ) {
      let lengthIssue = userName.length < MIN_USERNAME_LENGTH ? "less" : "more";

      const apiResult = {
        requiredMinLength: MIN_USERNAME_LENGTH,
        requiredMaxLength: MAX_USERNAME_LENGTH,
        actualLength: userName.length,
        suggestion: `Length of user name is ${lengthIssue} than the required length.`,
        fieldName: "userName",
        userName,
      };

      return res.status(400).json(
        createAPIResponse({
          code: API_RESPONSE_CODE_ENUM.API_USER_NAME_LENGTH_ERROR,
          result: apiResult,
          success: false,
        })
      );
    }
    // user password
    if (
      userPassword.length < MIN_USERPASSWORD_LENGTH ||
      userPassword.length > MAX_USERPASSWORD_LENGTH
    ) {
      let lengthIssue =
        userPassword.length < MIN_USERPASSWORD_LENGTH ? "less" : "more";

      const apiResult = {
        requiredMinLength: MIN_USERPASSWORD_LENGTH,
        requiredMaxLength: MAX_USERPASSWORD_LENGTH,
        actualLength: userPassword.length,
        suggestion: `Length of user password is ${lengthIssue} than the required length.`,
        fieldName: "userPassword",
        userPassword,
      };

      return res.status(400).json(
        createAPIResponse({
          code: API_RESPONSE_CODE_ENUM.API_USER_PASSWORD_LENGTH_ERROR,
          result: apiResult,
          success: false,
        })
      );
    }

    // credentials verified
    next();
  } catch (error) {
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

/* Middleware for generating Token for login */
export async function generateToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const id = req.body.userId.toString();
    const token = await createToken(id);
    req.body.generatedToken = token;
    next();
  } catch (error) {
    // res.status(500).json({ error, message: "Internal Server Error." });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

/* Middleware : Verifying token */
export async function verifyToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const key = process.env.JWT_KEY;
    if (!key) {
      return res.status(500).json(
        createAPIResponse({
          code: API_RESPONSE_CODE_ENUM.API_INTERNAL_CONFIG_ERROR,
          result: "JWT_KEY is not defined in environment variables.",
          success: false,
        })
      );
    }
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(400).json(
        createAPIResponse({
          code: API_RESPONSE_CODE_ENUM.API_AUTH_TOKEN_MISSING_ERROR,
          success: false,
        })
      );
    }
    const bearer = authHeader.split(" ");
    if (bearer.length !== 2 || bearer[0] !== "Bearer") {
      const apiResult = {
        expectedFormat: "Bearer <token>",
        received: authHeader,
      };
      return res.status(400).json(
        createAPIResponse({
          code: API_RESPONSE_CODE_ENUM.API_AUTH_TOKEN_MISSING_ERROR,
          result: apiResult,
          success: false,
        })
      );
    }
    const token = bearer[1];
    if (!token) {
      // res.status(401).json({
      //   message: "Error",
      //   result: "Token not provided, please provide a token.",
      // });

      return res.status(400).json(
        createAPIResponse({
          code: API_RESPONSE_CODE_ENUM.API_AUTH_TOKEN_MISSING_ERROR,
          success: false,
        })
      );
    } else {
      jwt.verify(token, key, (err, decode: any) => {
        if (err) {
          // res.status(401).json({
          //   message: "error",
          //   ErrorMessage: "Unable to verify token.",
          //   err,
          // });
          return res.status(400).json(
            createAPIResponse({
              code: API_RESPONSE_CODE_ENUM.API_AUTH_TOKEN_VERIFICATION_FAILED,
              result: err,
              success: false,
            })
          );
        } else {
          req.body.userId = decode.payload;
          next();
        }
      });
    }
  } catch (error) {
    // res.status(500).json({
    //   message: "error",
    //   error,
    //   ErrorMessage: "Server Error while verifying token.",
    // });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// middleware : Password checking for login
export async function passwordCheck(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    // const result = await getUserPassword(userId);
    // if (result.operation === "success") {
    //   const storedPassword = result.user.userPassword;
    //   const arePasswordsEqual = await bcrypt
    //     .compare(userPassword, storedPassword)
    //     .then((res) => res)
    //     .catch((err) => err);
    //   if (arePasswordsEqual) {
    //     next();
    //   } else {
    //     res.status(401).json({
    //       operation: "error",
    //       message: "Provided Passwords are not equal",
    //     });
    //   }
    // }
    const { userId, userPassword } = req.body;
    const getUserPasswordResponse = await getUserPassword(userId);
    if (getUserPasswordResponse.success) {
      const storedPassword = getUserPasswordResponse.result.userPassword;
      const arePasswordsEqual = await bcrypt.compare(
        userPassword,
        storedPassword
      );
      // .then((res) => res)
      // .catch((err) => err);
      if (arePasswordsEqual) {
        next();
      } else {
        const apiResult = {
          userPassword,
        };
        return res.status(400).json(
          createAPIResponse({
            code: API_RESPONSE_CODE_ENUM.API_USER_WRONG_PASSWORD_ERROR,
            result: apiResult,
            success: false,
          })
        );
      }
    }
  } catch (error) {
    // res.status(400).json({
    //   operation: "error",
    //   message: "Password Verification Failed",
    //   error,
    // });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// middleware : verifying creator and executioner are same
// used for deletion of posts or IPO card
export async function verifyCreatorAndExecutioner(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const originalUrl = req.originalUrl.toString();
    const ipoDeleteUrl: string = "/api/ipo/delete";
    const postsDeleteUrl: string = "/api/posts/delete";
    const {
      // userId is provided by the verifyToken middleware
      userId,
      // id of the post or ipo
      itemId,
    }: { userId: string; itemId: string } = req.body;

    // handling ipo deletion
    // if (originalUrl == "/api/ipo/delete") {
    //   const result = await findIPObyId(itemId);
    //   const { ipo, operation } = result;
    //   if (operation === "success") {
    //     if (ipo.createdBy.userId === userId) {
    //       // this will add ipoId in the request body for the deleteIPO
    //       req.body.ipoId = itemId;
    //       // it will call deleteIPO
    //       next();
    //     } else {
    //       res.status(403).json({
    //         message: `This IPO is not created by you.`,
    //       });
    //     }
    //   } else if (operation === "fail") {
    //     res.status(202).json({ result });
    //   } else if (operation === "error") {
    //     res.status(400).json({ result });
    //   }
    // }
    if (originalUrl === ipoDeleteUrl) {
      const findByIPOIdResponse = await findIPObyId(itemId);
      // success & result
      if (findByIPOIdResponse.success && findByIPOIdResponse.result) {
        // confirming requesting user has created the ipo
        if (findByIPOIdResponse.result.createdBy.userId === userId) {
          // providing ipo id for further actions
          req.body.ipoId = itemId;
          // calling the next controller in the route for further actions
          next();
        }
        // user has not created the ipo
        else {
          return res.status(400).json(
            createAPIResponse({
              code: API_RESPONSE_CODE_ENUM.API_AUTH_IPO_CARD_CREATOR_USER_NOT_REQUEST_USER_ERROR,
              success: false,
            })
          );
        }
      }
      // error & null result
      else if (!findByIPOIdResponse.success && !findByIPOIdResponse.result) {
        return res.status(400).json(
          createAPIResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_ID_ERROR,
            success: false,
          })
        );
      }
      // error & error result
      else if (!findByIPOIdResponse.success && findByIPOIdResponse.result) {
        return res.status(400).json(
          createAPIResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_ID_QUERY_ERROR,
            success: false,
            result: findByIPOIdResponse.result,
          })
        );
      }
    }
    // handling post deletion
    // else if (originalUrl === "/api/posts/delete") {
    //   const result = await findPostById(itemId);
    //   const { post, operation, statusCode } = result;
    //   if (operation) {
    //     if (statusCode === 1) {
    //       if (post.createdBy.id === userId) {
    //         // this will add postId in the request body for the deletePost
    //         req.body.postId = itemId;
    //         // it will call deletePost
    //         next();
    //       } else {
    //         res
    //           .status(403)
    //           .json({ message: `This post is not created by you.` });
    //       }
    //     } else if (statusCode === 0) {
    //       res.status(202).json({ result });
    //     }
    //   } else {
    //     res.status(400).json({ result });
    //   }
    // }
    else if (originalUrl === postsDeleteUrl) {
      const findPostByIdResponse = await findPostById(itemId);
      // success & result
      if (findPostByIdResponse.success && findPostByIdResponse.result) {
        // confirming requesting user has created the post
        if (findPostByIdResponse.result.createdBy.id === userId) {
          // providing post id for further actions
          req.body.postId = itemId;
          // calling next controller
          next();
        }
        // user has not created post
        else {
          return res.status(400).json(
            createAPIResponse({
              code: API_RESPONSE_CODE_ENUM.API_AUTH_POST_CREATOR_USER_NOT_REQUEST_USER_ERROR,
              success: false,
            })
          );
        }
      }
      // error & null result
      else if (!findPostByIdResponse.success && !findPostByIdResponse.result) {
        return res.status(400).json(
          createAPIResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_POST_ID_ERROR,
            success: false,
          })
        );
      }
      // error & error result
      else if (!findPostByIdResponse.success && findPostByIdResponse.result) {
        return res.status(400).json(
          createAPIResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_POST_ID_QUERY_ERROR,
            success: false,
            result: findPostByIdResponse.result,
          })
        );
      }
    }
    // error response for unknown path (delete)
    else {
      const apiResult = {
        requiredUrls: {
          ipoDeleteUrl,
          postsDeleteUrl,
        },
        clientRequestUrl: originalUrl,
      };
      return res.status(400).json(
        createAPIResponse({
          code: API_RESPONSE_CODE_ENUM.API_INVALID_REQUEST_ERROR,
          success: false,
          result: apiResult,
        })
      );
    }
  } catch (error) {
    // res.status(500).json({
    //   error,
    //   message: "Internal Server Error.",
    // });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// middleware : checking required fields in a request body.
export function checkRequiredFields(...requiredFieldNames: string[]) {
  return function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const missingFields = requiredFieldNames.filter((field: string) => {
      const value = getValueByPath(req.body, field);

      return value === undefined || value === null || value === "";
    });

    if (missingFields.length > 0) {
      const apiResult = {
        missingFields,
        suggestion:
          "Please provide required fields which are missing in the request body.",
      };
      return res.status(400).json(
        createAPIResponse({
          code: API_RESPONSE_CODE_ENUM.API_MISSING_REQUIRED_REQUEST_BODY_ARGUMENTS_ERROR,
          result: apiResult,
          success: false,
        })
      );
    }

    next();
  };
}
