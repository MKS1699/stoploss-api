import express, { response } from "express";
import {
  addUser,
  deleteUser,
  totalUsers,
  updateUserName,
  updateUserPassword,
} from "../db/models/userModels";
import { stringHash } from "../tools";
import { API_RESPONSE_CODE_ENUM } from "../tools/apiResponseCodes";
import {
  createAPIResponse,
  createInternalServerErrorResponse,
  mapAPIResponseToDBResponse,
} from "../tools/apiResponse";

// new user creating route
export async function createUser(req: express.Request, res: express.Response) {
  try {
    const usersLimitResponse = await totalUsers();

    // currently restricting the users to 3 only
    if (usersLimitResponse.success && usersLimitResponse.result < 3) {
      const { userPassword, userName } = req.body;
      const createdUserResponse = await addUser({ userPassword, userName });
      // user created
      if (createdUserResponse.success && createdUserResponse.result) {
        const apiResult = {
          userName: createdUserResponse.result.userName,
          userId: createdUserResponse.result._id,
        };
        const apiResponse = mapAPIResponseToDBResponse({
          dbResponse: createdUserResponse,
          customResult: apiResult,
        });
        return res.status(200).json(apiResponse);
      }
      // user not created
      else {
        const apiResponse = mapAPIResponseToDBResponse({
          dbResponse: createdUserResponse,
        });
        return res.status(400).json(apiResponse);
      }
    } else {
      // user limit reached
      let apiResponse = createAPIResponse({
        code: API_RESPONSE_CODE_ENUM.API_USER_TOTAL_COUNT_ERROR,
        success: false,
        // result: {
        //   requiredUsers: 3,
        //   signedUpUsers: usersLimitResponse.result,
        // },
      });
      return res.status(400).json(apiResponse);
    }
    // if (usersLimit.count < 3) {
    //   const { userPassword, userName } = req.body;
    //   const result = await addUser({ userPassword, userName });
    //   if (result.message === "success") {
    //     res.status(200).json({
    //       operation: "success",
    //       message: "Signed Up Successfully",
    //       userName: result.user.userName,
    //       userId: result.user._id,
    //     });
    //   } else {
    //     res.status(400).json({
    //       operation: "error",
    //       message: "Unable to Sign Up.",
    //       result,
    //     });
    //   }
    // } else {
    //   res.status(403).json({
    //     message: "error",
    //     ErrorMessage: "As of now there can't be more than 3 users.",
    //   });
    // }
  } catch (error) {
    // res.status(500).json({ message: "Internal Server Error", error });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// update user

// user name
export async function updateName(req: express.Request, res: express.Response) {
  try {
    // const { fieldToUpdate } = req.body;
    // // updating user name
    // if (fieldToUpdate === "name") {
    //   const { newUserName, userId } = req.body;
    //   // const result = await updateUserName(id, newUserName);

    //   // if (result.message === "success") {
    //   //   res.status(200).json(result);
    //   // } else {
    //   //   res.status(400).json(result);
    //   // }
    //   const updateUserNameResponse = await updateUserName(userId, newUserName);
    //   const { success, result } = updateUserNameResponse;
    //   // success & result
    //   if (success && result) {
    //     const apiResult = {
    //       updatedUserName: result.userName,
    //       userId: result._id,
    //     };
    //     const apiResponse = mapAPIResponseToDBResponse({
    //       dbResponse: updateUserNameResponse,
    //       customResult: apiResult,
    //     });

    //     return res.status(200).json(apiResponse);
    //   }
    //   // error & null result
    //   else if (!success && !result) {
    //     const apiResponse = mapAPIResponseToDBResponse({
    //       dbResponse: updateUserNameResponse,
    //     });

    //     return res.status(400).json(apiResponse);
    //   }
    //   // error with error as result (generic query error)
    //   else if (!success && result) {
    //     const apiResponse = mapAPIResponseToDBResponse({
    //       dbResponse: updateUserNameResponse,
    //     });

    //     return res.status(500).json(apiResponse);
    //   }
    // }
    // // user password updation
    // else if (fieldToUpdate === "password") {
    //   const { newUserPassword, userId } = req.body;
    //   const hashedPassword = await stringHash(newUserPassword);
    //   // const result = await updateUserPassword(id, hashedPassword);

    //   // if (result.message === "success") {
    //   //   res.status(200).json(result);
    //   // } else {
    //   //   res.status(400).json(result);
    //   // }

    //   const updateUserPasswordResponse = await updateUserPassword(
    //     userId,
    //     hashedPassword
    //   );

    //   const { success, result } = updateUserPasswordResponse;

    //   // success & result
    //   if (success && result) {
    //     const apiResponse = mapAPIResponseToDBResponse({
    //       dbResponse: updateUserPasswordResponse,
    //     });

    //     return res.status(200).json(apiResponse);
    //   }
    //   // error & null result
    //   else if (!success && !result) {
    //     const apiResponse = mapAPIResponseToDBResponse({
    //       dbResponse: updateUserPasswordResponse,
    //     });

    //     return res.status(400).json(apiResponse);
    //   }
    //   // error & error result
    //   else if (!success && result) {
    //     const apiResponse = mapAPIResponseToDBResponse({
    //       dbResponse: updateUserPasswordResponse,
    //     });

    //     return res.status(500).json(apiResponse);
    //   }
    // }

    // updating user name
    const { newUserName, userId } = req.body;
    const updateUserNameResponse = await updateUserName(userId, newUserName);
    const { success, result } = updateUserNameResponse;
    // success & result
    if (success && result) {
      const apiResult = {
        updatedUserName: result.userName,
        userId: result._id,
      };
      const apiResponse = mapAPIResponseToDBResponse({
        dbResponse: updateUserNameResponse,
        customResult: apiResult,
      });

      return res.status(200).json(apiResponse);
    }
    // error & null result
    else if (!success && !result) {
      const apiResponse = mapAPIResponseToDBResponse({
        dbResponse: updateUserNameResponse,
      });

      return res.status(400).json(apiResponse);
    }
    // error with error as result (generic query error)
    else if (!success && result) {
      const apiResponse = mapAPIResponseToDBResponse({
        dbResponse: updateUserNameResponse,
      });

      return res.status(500).json(apiResponse);
    }
  } catch (error) {
    // res.status(500).json({ error, message: "Internal Server Error" });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// user password
export async function updatePassword(
  req: express.Request,
  res: express.Response
) {
  try {
    // const { fieldToUpdate } = req.body;
    // // updating user name
    // if (fieldToUpdate === "name") {
    //   const { newUserName, userId } = req.body;
    //   // const result = await updateUserName(id, newUserName);

    //   // if (result.message === "success") {
    //   //   res.status(200).json(result);
    //   // } else {
    //   //   res.status(400).json(result);
    //   // }
    //   const updateUserNameResponse = await updateUserName(userId, newUserName);
    //   const { success, result } = updateUserNameResponse;
    //   // success & result
    //   if (success && result) {
    //     const apiResult = {
    //       updatedUserName: result.userName,
    //       userId: result._id,
    //     };
    //     const apiResponse = mapAPIResponseToDBResponse({
    //       dbResponse: updateUserNameResponse,
    //       customResult: apiResult,
    //     });

    //     return res.status(200).json(apiResponse);
    //   }
    //   // error & null result
    //   else if (!success && !result) {
    //     const apiResponse = mapAPIResponseToDBResponse({
    //       dbResponse: updateUserNameResponse,
    //     });

    //     return res.status(400).json(apiResponse);
    //   }
    //   // error with error as result (generic query error)
    //   else if (!success && result) {
    //     const apiResponse = mapAPIResponseToDBResponse({
    //       dbResponse: updateUserNameResponse,
    //     });

    //     return res.status(500).json(apiResponse);
    //   }
    // }
    // // user password updation
    // else if (fieldToUpdate === "password") {
    //   const { newUserPassword, userId } = req.body;
    //   const hashedPassword = await stringHash(newUserPassword);
    //   // const result = await updateUserPassword(id, hashedPassword);

    //   // if (result.message === "success") {
    //   //   res.status(200).json(result);
    //   // } else {
    //   //   res.status(400).json(result);
    //   // }

    //   const updateUserPasswordResponse = await updateUserPassword(
    //     userId,
    //     hashedPassword
    //   );

    //   const { success, result } = updateUserPasswordResponse;

    //   // success & result
    //   if (success && result) {
    //     const apiResponse = mapAPIResponseToDBResponse({
    //       dbResponse: updateUserPasswordResponse,
    //     });

    //     return res.status(200).json(apiResponse);
    //   }
    //   // error & null result
    //   else if (!success && !result) {
    //     const apiResponse = mapAPIResponseToDBResponse({
    //       dbResponse: updateUserPasswordResponse,
    //     });

    //     return res.status(400).json(apiResponse);
    //   }
    //   // error & error result
    //   else if (!success && result) {
    //     const apiResponse = mapAPIResponseToDBResponse({
    //       dbResponse: updateUserPasswordResponse,
    //     });

    //     return res.status(500).json(apiResponse);
    //   }
    // }

    // updating user password
    const { newUserPassword, userId } = req.body;
    const hashedPassword = await stringHash(newUserPassword);
    // const result = await updateUserPassword(id, hashedPassword);

    // if (result.message === "success") {
    //   res.status(200).json(result);
    // } else {
    //   res.status(400).json(result);
    // }

    const updateUserPasswordResponse = await updateUserPassword(
      userId,
      hashedPassword
    );

    const { success, result } = updateUserPasswordResponse;

    // success & result
    if (success && result) {
      const apiResponse = mapAPIResponseToDBResponse({
        dbResponse: updateUserPasswordResponse,
      });

      return res.status(200).json(apiResponse);
    }
    // error & null result
    else if (!success && !result) {
      const apiResponse = mapAPIResponseToDBResponse({
        dbResponse: updateUserPasswordResponse,
      });

      return res.status(400).json(apiResponse);
    }
    // error & error result
    else if (!success && result) {
      const apiResponse = mapAPIResponseToDBResponse({
        dbResponse: updateUserPasswordResponse,
      });

      return res.status(500).json(apiResponse);
    }
  } catch (error) {
    // res.status(500).json({ error, message: "Internal Server Error" });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// export async function updateUser(req: express.Request, res: express.Response) {
//   try {
//     const { fieldToUpdate } = req.body;
//     // updating user name
//     if (fieldToUpdate === "name") {
//       const { newUserName, userId } = req.body;
//       // const result = await updateUserName(id, newUserName);

//       // if (result.message === "success") {
//       //   res.status(200).json(result);
//       // } else {
//       //   res.status(400).json(result);
//       // }
//       const updateUserNameResponse = await updateUserName(userId, newUserName);
//       const { success, result } = updateUserNameResponse;
//       // success & result
//       if (success && result) {
//         const apiResult = {
//           updatedUserName: result.userName,
//           userId: result._id,
//         };
//         const apiResponse = mapAPIResponseToDBResponse({
//           dbResponse: updateUserNameResponse,
//           customResult: apiResult,
//         });

//         return res.status(200).json(apiResponse);
//       }
//       // error & null result
//       else if (!success && !result) {
//         const apiResponse = mapAPIResponseToDBResponse({
//           dbResponse: updateUserNameResponse,
//         });

//         return res.status(400).json(apiResponse);
//       }
//       // error with error as result (generic query error)
//       else if (!success && result) {
//         const apiResponse = mapAPIResponseToDBResponse({
//           dbResponse: updateUserNameResponse,
//         });

//         return res.status(500).json(apiResponse);
//       }
//     }
//     // user password updation
//     else if (fieldToUpdate === "password") {
//       const { newUserPassword, userId } = req.body;
//       const hashedPassword = await stringHash(newUserPassword);
//       // const result = await updateUserPassword(id, hashedPassword);

//       // if (result.message === "success") {
//       //   res.status(200).json(result);
//       // } else {
//       //   res.status(400).json(result);
//       // }

//       const updateUserPasswordResponse = await updateUserPassword(
//         userId,
//         hashedPassword
//       );

//       const { success, result } = updateUserPasswordResponse;

//       // success & result
//       if (success && result) {
//         const apiResponse = mapAPIResponseToDBResponse({
//           dbResponse: updateUserPasswordResponse,
//         });

//         return res.status(200).json(apiResponse);
//       }
//       // error & null result
//       else if (!success && !result) {
//         const apiResponse = mapAPIResponseToDBResponse({
//           dbResponse: updateUserPasswordResponse,
//         });

//         return res.status(400).json(apiResponse);
//       }
//       // error & error result
//       else if (!success && result) {
//         const apiResponse = mapAPIResponseToDBResponse({
//           dbResponse: updateUserPasswordResponse,
//         });

//         return res.status(500).json(apiResponse);
//       }
//     }
//   } catch (error) {
//     // res.status(500).json({ error, message: "Internal Server Error" });
//     return res.status(500).json(createInternalServerErrorResponse(error));
//   }
// }

// Deleting the user.

export async function userDelete(req: express.Request, res: express.Response) {
  try {
    const { userId } = req.body;
    // const result = await deleteUser(id);
    // if (result.message === "success") {
    //   res.status(200).json(result);
    // } else {
    //   res.status(400).json(result);
    // }
    const deleteUserResponse = await deleteUser(userId);
    const { success, result } = deleteUserResponse;

    // success & result
    if (success && result) {
      const apiResult = {
        deletedUser: result,
      };
      const apiResponse = mapAPIResponseToDBResponse({
        dbResponse: deleteUserResponse,
        customResult: apiResult,
      });
      return res.status(200).json(apiResponse);
    }
    // error & null result
    else if (!success && !result) {
      const apiResponse = mapAPIResponseToDBResponse({
        dbResponse: deleteUserResponse,
      });
      return res.status(400).json(apiResponse);
    }
    // error & error result
    else if (!success && result) {
      const apiResponse = mapAPIResponseToDBResponse({
        dbResponse: deleteUserResponse,
      });
      return res.status(500).json(apiResponse);
    }
  } catch (error) {
    // return res.status(500).json({ error, message: "Internal Server Error" });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// logging in the user
export async function login(req: express.Request, res: express.Response) {
  // const { generatedToken, userName, userId } = req.body;
  // res.status(200).json({
  //   operation: "success",
  //   message: "User Logged In.",
  //   generatedToken,
  //   userName,
  //   userId,
  // });
  try {
    const { generatedToken, userName, userId } = req.body;
    if (userId && generatedToken && userName) {
      return res.status(200).json(
        createAPIResponse({
          result: { generatedToken, userName, userId },
          code: API_RESPONSE_CODE_ENUM.API_USER_LOGIN_SUCCESS,
          success: true,
        })
      );
    } else {
      const missingField = !userName
        ? "user name"
        : !userId
        ? "user id"
        : "token";
      return res.status(400).json(
        createAPIResponse({
          result: {
            ErrorMessage: `Missing field : ${missingField} in the request body.`,
          },
          code: API_RESPONSE_CODE_ENUM.API_USER_LOGIN_ERROR,
          success: false,
        })
      );
    }
  } catch (error) {
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}
