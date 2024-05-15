// important : All post routes other than GET will need to have verifyToken middleware
import { verifyToken } from "../middleware";
import {
  addOneLinkedPost,
  createNewPost,
  createNewUpcomingIPOListEntry,
  deleteUpcomingIPOEntry,
  getAllIPOEntries,
  getAllPostsSize,
  getIPOEntryById,
  getIPOEntryByName,
  getLatestPosts,
  getPostById,
  getPostSizeByType,
  getPostsByTypeWithLimit,
  getPostsByTypeWithLimitOlderElements,
  getPostsRelatedToTag,
  getPostsSizeByUser,
  getTagsRelatedToPost,
  removeOneLinkedPost,
  updateUpcomingIPOClose,
  updateUpcomingIPOName,
  updateUpcomingIPOOpen,
} from "../controllers/postControllers";
import express from "express";

const postRouter: express.Router = express.Router();

// posts related routes

// get post
// by id
postRouter.post("/get/id", getPostById);
// by type with limit
postRouter.post("/get/type", getPostsByTypeWithLimit);

// by type with limit but older than last element
postRouter.post("/get/type/pagination", getPostsByTypeWithLimitOlderElements);

// 5 latest posts
postRouter.get("/get/latest", getLatestPosts);

// posts count
// by type
postRouter.post("/count/type", getPostSizeByType);

// all posts
postRouter.get("/count/all", getAllPostsSize);

// by user
postRouter.post("/count/user", getPostsSizeByUser);

// tags related to post
postRouter.post("/tags/", getTagsRelatedToPost);

// posts related to tag
postRouter.post("/tags/relatedPosts", getPostsRelatedToTag);

// create new post
postRouter.post("/createPost", verifyToken, createNewPost);

// upcoming ipo list related post routes

// get routes
// all entries
postRouter.get("/upcomingIPO/get", getAllIPOEntries);
// entry by id
postRouter.post("/upcomingIPO/get/id", getIPOEntryById);
// entry by name
postRouter.post("/upcomingIPO/get/name", getIPOEntryByName);

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
