import { TagModel } from "../Schema";

// creating a new tag
export async function createTag({ tag, id }: { tag: string; id: string }) {
  try {
    const TAG = await TagModel.create({ tag, posts: id });
    return {
      message: "Tag created successfully for the post.",
      operation: "success",
      TAG,
    };
  } catch (error) {
    return {
      message: "Unable to create tag for the post.",
      operation: "fail",
      error,
    };
  }
}

// finding a existing tag
export async function findTag(tag: string) {
  try {
    const foundTag = await TagModel.findOne({ tag });
    return {
      message: "Tag found",
      operation: "success",
      foundTag,
    };
  } catch (error) {
    return {
      message: "Unable to found tag",
      operation: "fail",
      error,
    };
  }
}

// update existing tag
export async function updateTagByPostID({
  postID,
  tagID,
}: //   posts,
{
  postID: string;
  tagID: string;
  //   posts : string[]
}) {
  try {
    // const newPostsArr : string[] = [...posts, postID];
    const updatedTAG = await TagModel.findByIdAndUpdate(tagID, {
      $push: { posts: postID },
    });

    return {
      message: "Post linked to existing tag.",
      operation: "success",
      updatedTAG,
    };
  } catch (error) {
    return {
      message: "Unable to link post to tag.",
      operation: "fail",
      error,
    };
  }
}
