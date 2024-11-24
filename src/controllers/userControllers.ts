import express from "express";
import {
  addUser,
  deleteUser,
  totalUsers,
  updateUserName,
  updateUserPassword,
} from "../db/models/userModels";
import { stringHash } from "../tools";

// new user creating route
export async function createUser(req: express.Request, res: express.Response) {
  try {
    const usersLimit = await totalUsers();
    if (usersLimit.count < 3) {
      const { userPassword, userName } = req.body;
      const result = await addUser({ userPassword, userName });
      if (result.message === "success") {
        res.status(200).json({
          operation: "success",
          message: "Signed Up Successfully",
          userName: result.user.userName,
          userId: result.user._id,
        });
      } else {
        res.status(400).json({
          operation: "error",
          message: "Unable to Sign Up.",
          result,
        });
      }
    } else {
      res.status(403).json({
        message: "error",
        ErrorMessage: "As of now there can't be more than 3 users.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

// update user
export async function updateUser(req: express.Request, res: express.Response) {
  try {
    const { fieldToUpdate } = req.body;
    // user name updating
    if (fieldToUpdate === "name") {
      const { newUserName, id } = req.body;
      const result = await updateUserName(id, newUserName);

      if (result.message === "success") {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    }
    // user password updation
    else if (fieldToUpdate === "password") {
      const { newUserPassword, id } = req.body;
      const hashedPassword = await stringHash(newUserPassword);
      const result = await updateUserPassword(id, hashedPassword);

      if (result.message === "success") {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    }
  } catch (error) {
    res.status(500).json({ error, message: "Internal Server Error" });
  }
}

// Deleting the user.
export async function userDelete(req: express.Request, res: express.Response) {
  try {
    const { id } = req.body;
    const result = await deleteUser(id);
    if (result.message === "success") {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json({ error, message: "Internal Server Error" });
  }
}

// logging in the user
export async function login(req: express.Request, res: express.Response) {
  const { generatedToken, userName, userId } = req.body;
  res.status(200).json({
    operation: "success",
    message: "User Logged In.",
    generatedToken,
    userName,
    userId,
  });
}
