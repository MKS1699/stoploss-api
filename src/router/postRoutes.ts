import { verifyToken } from "../middleware";
import { createNewPost, postImageUpload } from "../controllers/postControllers";
import express from "express";

const postRouter: express.Router = express.Router();

postRouter.post("/imageUpload", postImageUpload);

postRouter.post("/createPost", verifyToken, createNewPost);

export default postRouter;
