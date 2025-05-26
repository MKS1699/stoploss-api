import {
  checkRequiredFields,
  verifyCreatorAndExecutioner,
  verifyToken,
} from "../middleware";
import {
  createNewPost,
  deletePost,
  getAllPosts,
  getAllPostsSize,
  getLatestPosts,
  getPostById,
  getPostSizeByType,
  getPostsByTypeWithLimit,
  getPostsByTypeWithLimitOlderElements,
  getPostsByUser,
  getPostsRelatedToTag,
  getPostsSizeByUser,
  getTagsRelatedToPost,
} from "../controllers/postControllers";
import express from "express";
import { listAllKeys } from "../tools";
import { emptyPost } from "../types/@types";

const postRouter: express.Router = express.Router();

// post keys
const allPostKeys = listAllKeys(emptyPost, "post");
// posts related routes

// get post
// by id
postRouter.post("/get/id", checkRequiredFields("id"), getPostById);
// by type with limit
postRouter.post(
  "/get/type",
  checkRequiredFields("postType"),
  getPostsByTypeWithLimit
);

// by type with limit but older than last element
postRouter.post(
  "/get/type/pagination",
  checkRequiredFields("postType", "postUpdatedOfLastElement"),
  getPostsByTypeWithLimitOlderElements
);

// 5 latest posts
postRouter.get("/get/latest", getLatestPosts);

// by userId
postRouter.post("/get/user", checkRequiredFields("userId"), getPostsByUser);

// posts count
// by type
postRouter.post(
  "/count/type",
  checkRequiredFields("postType"),
  getPostSizeByType
);

// all posts
postRouter.get("/count/all", getAllPostsSize);

// by user
postRouter.post(
  "/count/user",
  checkRequiredFields("userId"),
  getPostsSizeByUser
);

// tags related to post
postRouter.post("/tags/", checkRequiredFields("postId"), getTagsRelatedToPost);

// posts related to tag
postRouter.post(
  "/tags/relatedPosts",
  checkRequiredFields("tag"),
  getPostsRelatedToTag
);

// create new post
postRouter.post(
  "/create",
  verifyToken,
  checkRequiredFields("post", ...allPostKeys, "tags"),
  createNewPost
);

// deleting a post
postRouter.delete(
  "/delete",
  checkRequiredFields("itemId"),
  verifyToken,
  verifyCreatorAndExecutioner,
  deletePost
);

// get all posts
postRouter.get("/get/all", getAllPosts);

export default postRouter;
