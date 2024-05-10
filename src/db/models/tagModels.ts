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

// find tag related to specific post
export async function findTagsRelatedToPost(postId: string) {
  try {
    const tags = await TagModel.find({ posts: postId }).select(["tag"]);
    if (tags.length > 0) {
      return {
        tags,
        message: `Tags related to post with id : ${postId}.`,
        operation: true,
        statusCode: 1,
      };
    } else {
      return {
        tags,
        message: `Tags do not exist for post with id  :${postId}.`,
        operation: true,
        statusCode: 0,
      };
    }
  } catch (error) {
    return {
      message: "Error finding tags related to post.",
      error,
      operation: false,
      statusCode: 0,
    };
  }
}

// find posts related to tag
export async function findPostsRelatedToTags(tag: string) {
  try {
    const posts = await TagModel.find({ tag }).select(["posts"]);
    if (posts.length > 0) {
      return {
        posts,
        message: `Posts related to tag: "${tag}" .`,
        operation: true,
        statusCode: 1,
      };
    } else {
      return {
        posts,
        operation: true,
        message: "Posts do not exist for tag.",
        statusCode: 0,
      };
    }
  } catch (error) {
    return {
      error,
      message: "Error finding posts related to tag.",
      operation: false,
      statusCode: 0,
    };
  }
}
