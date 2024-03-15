import { createTag, findTag, updateTagByPostID } from "../db/models/tagModels";
import { createPost } from "../db/models/postModels";
import express from "express";
import { POST } from "types/@types";
export async function postImageUpload(
  req: express.Request,
  res: express.Response
) {
  //   const { image } = req.body;
  //   console.log(req);
  //   const a: express.Request = req;
  //   const file = req.file
  //   res.status(200).json({ message: "Image Upload", re });
}

export async function createNewPost(
  req: express.Request,
  res: express.Response
) {
  try {
    const post: POST = req.body.post;
    const tags: [string] = req.body.post.postTags;
    const RESULT = await createPost(post);
    const postID = RESULT.newPost?._id;
    for (let tag of tags) {
      const foundTag = await findTag(tag);
      const foundTagID: string = foundTag.foundTag?._id.toString();
      // const foundTagPosts : [string] = foundTag.foundTag?.posts;
      if (foundTag.foundTag === null) {
        // new tag creation for the post
        const newTAG = await createTag({
          tag,
          id: postID,
        });
      } else {
        // updating existing tag and linking a new post to it
        const TAG = await updateTagByPostID({ postID, tagID: foundTagID });
      }
    }
    res.status(201).json(RESULT);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      error,
    });
  }
}
