import express from "express";
import {
  createUser,
  login,
  // updateUser,
  updateName,
  updatePassword,
  userDelete,
} from "../controllers/userControllers";
import {
  checkRequiredFields,
  generateToken,
  passwordCheck,
  passwordHash,
  userExist,
  validateUserCredentials,
  verifyToken,
} from "../middleware";

const userRouter: express.Router = express.Router();

// Route : signing up the user
userRouter.post(
  "/signup",
  checkRequiredFields("userName", "userPassword"),
  validateUserCredentials,
  passwordHash,
  userExist,
  createUser
);

// Route : updating the user
// userRouter.put("/update", verifyToken, updateUser);

// Route : updating the user name
userRouter.put(
  "/update/name",
  checkRequiredFields("newUserName"),
  verifyToken,
  updateName
);

// Route : updating the user password
userRouter.put(
  "/update/password",
  checkRequiredFields("newUserPassword"),
  verifyToken,
  updatePassword
);

// Route : deleting the user
userRouter.delete("/delete", verifyToken, userDelete);

// Route : Logging in the user
userRouter.post(
  "/login",
  checkRequiredFields("userName", "userPassword"),
  validateUserCredentials,
  userExist,
  passwordCheck,
  generateToken,
  login
);

export default userRouter;
