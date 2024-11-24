import express from "express";
import {
  addPostIdToIPO,
  createIPO,
  deleteIPO,
  deletePostIdFromIPO,
  getAllIPO,
  getIPOById,
  getIPOByName,
  getIPOCreatedByUserId,
  getIPOCreatedByUserName,
  updateIPO,
} from "../controllers/ipoControllers";
import { verifyCreatorAndExecutioner, verifyToken } from "../middleware";

const ipoRouter: express.Router = express.Router();

// create IPO
ipoRouter.post("/create", verifyToken, createIPO);

// get IPO
// all IPO
ipoRouter.get("/get", getAllIPO);
// by id
ipoRouter.post("/get/id", getIPOById);
// by name
ipoRouter.post("/get/name", getIPOByName);
// created by user
// userId
ipoRouter.post("/get/user/id", getIPOCreatedByUserId);
// userName
ipoRouter.post("/get/user/name", getIPOCreatedByUserName);

// update
ipoRouter.post("/update", verifyToken, updateIPO);

// add postId to IPO
ipoRouter.post("/update/add/postId", verifyToken, addPostIdToIPO);

// delete postId from IPO
ipoRouter.delete("/update/remove/postId", verifyToken, deletePostIdFromIPO);

// delete ipo
ipoRouter.delete(
  "/delete",
  verifyToken,
  verifyCreatorAndExecutioner,
  deleteIPO
);

export default ipoRouter;
