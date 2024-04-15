// important : All post routes other than GET will need to have verifyToken middleware
import { verifyToken } from "../middleware";
import {
  addOneLinkedPost,
  createNewPost,
  createNewUpcomingIPOListEntry,
  deleteUpcomingIPOEntry,
  getAllIPOEntries,
  getIPOEntryById,
  getIPOEntryByName,
  removeOneLinkedPost,
  updateUpcomingIPOClose,
  updateUpcomingIPOName,
  updateUpcomingIPOOpen,
} from "../controllers/postControllers";
import express from "express";

const postRouter: express.Router = express.Router();

// posts related routes
postRouter.post("/createPost", verifyToken, createNewPost);

// upcoming ipo list related post routes

// get routes
// all entries
postRouter.get("/upcomingIPO/get", getAllIPOEntries);
// entry by id
postRouter.get("/upcomingIPO/get/id", getIPOEntryById);
// entry by name
postRouter.get("/upcomingIPO/get/name", getIPOEntryByName);

// creating new entry
postRouter.post(
  "/upcomingIPO/create",
  verifyToken,
  createNewUpcomingIPOListEntry
);
export default postRouter;

// updating upcoming ipo entries
// update ipo name
postRouter.put("/upcomingIPO/update/name", verifyToken, updateUpcomingIPOName);
// update ipo open
postRouter.put(
  "/upcomingIPO/update/close",
  verifyToken,
  updateUpcomingIPOClose
);
// update ipo close
postRouter.put("/upcomingIPO/update/open", verifyToken, updateUpcomingIPOOpen);

// update linked post
// add one
postRouter.put(
  "/upcomingIPO/update/linkedPosts/addOne",
  verifyToken,
  addOneLinkedPost
);

// delete
// delete one entry complete
postRouter.delete("/upcomingIPO/delete/", verifyToken, deleteUpcomingIPOEntry);

// deleting one linkedPostId
postRouter.delete(
  "/upcomingIPO/delete/linkedPost/removeOne",
  verifyToken,
  removeOneLinkedPost
);
