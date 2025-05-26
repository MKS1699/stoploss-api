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
import {
  checkRequiredFields,
  verifyCreatorAndExecutioner,
  verifyToken,
} from "../middleware";
import { emptyIPO, IPOTYPES } from "../types/@types";
import { listAllKeys } from "../tools";

const ipoRouter: express.Router = express.Router();

// ipo keys for passing them as required keys in various routes

const allIPOKeys: string[] = listAllKeys(emptyIPO, "ipo");

// create IPO
ipoRouter.post(
  "/create",
  verifyToken,
  checkRequiredFields(...allIPOKeys, "userId"),
  createIPO
);

// get IPO
// all IPO
ipoRouter.get("/get/all", getAllIPO);
// by id
ipoRouter.post("/get/id", checkRequiredFields("id"), getIPOById);
// by name
ipoRouter.post("/get/name", checkRequiredFields("name"), getIPOByName);
// created by user
// userId
ipoRouter.post(
  "/get/user/id",
  checkRequiredFields("userId"),
  getIPOCreatedByUserId
);
// userName
ipoRouter.post(
  "/get/user/name",
  checkRequiredFields("userName"),
  getIPOCreatedByUserName
);

// update
ipoRouter.put(
  "/update",
  verifyToken,
  checkRequiredFields("id", "ipoUpdate"),
  updateIPO
);

// add postId to IPO
ipoRouter.put(
  "/update/postId/add",
  verifyToken,
  checkRequiredFields("postId", "ipoId"),
  addPostIdToIPO
);

// delete postId from IPO
ipoRouter.put(
  "/update/postId/remove",
  verifyToken,
  checkRequiredFields("postId", "ipoId"),
  deletePostIdFromIPO
);

// delete ipo
ipoRouter.delete(
  "/delete",
  checkRequiredFields("itemId"),
  verifyToken,
  verifyCreatorAndExecutioner,
  deleteIPO
);

export default ipoRouter;
