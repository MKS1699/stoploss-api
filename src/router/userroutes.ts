import express from "express";
import {
  createUser,
  login,
  updateUser,
  userDelete,
} from "../controllers/userControllers";
import {
  generateToken,
  passwordCheck,
  passwordHash,
  userExist,
  validateCredentials,
  verifyToken,
} from "../middleware";

const userRouter: express.Router = express.Router();

// Route : signing up the user
userRouter.post(
  "/signup",
  validateCredentials,
  passwordHash,
  userExist,
  createUser
);

// Route : updating the user
userRouter.put("/updateUser", verifyToken, updateUser);

// Route : deleting the user
userRouter.delete("/deleteUser", verifyToken, userDelete);

// Route : Logging in the user
userRouter.post(
  "/login",
  validateCredentials,
  userExist,
  passwordCheck,
  generateToken,
  login
);

export default userRouter;
