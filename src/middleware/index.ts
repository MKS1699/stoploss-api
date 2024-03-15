import express from "express";
import bcrypt from "bcrypt";
import { findUserByUserName, getUserPassword } from "../db/models/userModels";
import { createToken } from "../tools";
import jwt from "jsonwebtoken";

/* middleware for checking if user exists or not and acts
 * according to the path the req is coming from, if it is
 * from '/signup' and the user exists then he cannot signup
 * whereas if the req is coming from '/login' and if user
 * exists then only he can login.
 */
export async function userExist(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { userName } = req.body;

    const path = req.route.path;

    const result = await findUserByUserName(userName);
    if (result.message === "success") {
      if (path === "/signup") {
        if (result.foundedUser === null) {
          next();
        } else {
          res
            .status(403)
            .json({ operation: "Error", message: "User already exists." });
        }
      } else if (path === "/login") {
        if (result.foundedUser !== null) {
          req.body.userId = result.foundedUser._id;
          next();
        } else {
          res.status(400).json({
            operation: "Error",
            message: "User does not exists with provided credentials.",
            credentials: {
              userName,
            },
          });
        }
      }
    } else {
      res.status(400).json(result.error);
    }
  } catch (error) {
    return res.status(500).json(error);
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

    const hashedStr = await bcrypt
      .hash(userPassword, 8)
      .then((res) => res)
      .catch((err) => err);
    if (hashedStr.length > 0) {
      req.body.userPassword = hashedStr;
      next();
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

// middleware : validating user name and user password are string
export async function validateCredentials(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { userName, userPassword } = req.body;
  if (typeof userName && typeof userPassword === "string") {
    if (userName.length >= 4 && userName.length <= 10) {
      if (userPassword.length >= 8 && userPassword.length <= 20) {
        next();
      } else {
        res.status(400).json({
          operation: "Error",
          message: "User Password provided is not valid.",
        });
      }
    } else {
      res.status(400).json({
        operation: "Error",
        message: "User Name provided is not valid.",
      });
    }
  } else {
    res.status(403).json({
      operation: "Error",
      message: "userName & userPassword provided must be string",
    });
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
    res.status(500).json({ error });
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
    const authHeader = req.header("Authorization");
    const bearer = authHeader.split(" ");
    const token = bearer[1];
    if (!token) {
      res.status(401).json({
        message: "Error",
        result: "Token not provided, please provide a token.",
      });
    } else {
      jwt.verify(token, key, (err, decode: any) => {
        if (err) {
          res.status(401).json({
            message: "error",
            ErrorMessage: "Unable to verify token.",
            err,
          });
        } else {
          req.body.userId = decode.payload;
        }
      });
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: "error",
      error,
      ErrorMessage: "Server Error while verifying token.",
    });
  }
}

// middleware : Password checking for login
export async function passwordCheck(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { userId, userPassword } = req.body;
    const result = await getUserPassword(userId);
    if (result.operation === "success") {
      const storedPassword = result.user.userPassword;
      const arePasswordsEqual = await bcrypt
        .compare(userPassword, storedPassword)
        .then((res) => res)
        .catch((err) => err);
      if (arePasswordsEqual) {
        next();
      } else {
        res.status(401).json({
          operation: "error",
          message: "Provided Passwords are not equal",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      operation: "error",
      message: "Password Verification Failed",
      error,
    });
  }
}
