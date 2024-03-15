import { POST } from "types/@types";
import { PostModel } from "../Schema";

export async function createPost(post: POST) {
  try {
    const {
      postAuthors,
      postDescription,
      hasImage,
      postImage,
      postInfo,
      postParagraphs,
      // postTags,
      postTitle,
      postType,
      postCreated,
      postUpdated,
      createdBy,
    } = post;

    const newPost = await PostModel.create({
      postAuthors,
      postDescription,
      hasImage,
      postImage,
      postInfo,
      postParagraphs,
      // postTags,
      postTitle,
      postType,
      postCreated,
      postUpdated,
      createdBy,
    });
    return {
      message: "Post created.",
      operation: "success",
      newPost,
    };
  } catch (error) {
    return {
      message: "Unable to create post.",
      error,
      operation: "fail",
    };
  }
}
