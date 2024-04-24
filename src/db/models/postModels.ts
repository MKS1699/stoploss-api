import { POST } from "types/@types";
import { PostModel } from "../Schema";

// create new post
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
      postExternalLinks,
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
      postExternalLinks,
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

// find post
// by id
export async function findPostById(id: string) {
  try {
    const post = await PostModel.findById(id);
    if (post) {
      return {
        post,
        message: "Post found.",
        operation: true,
      };
    } else {
      return {
        post,
        message: `Post with id : ${id} doesn't exist.`,
        operation: false,
      };
    }
  } catch (error) {
    return {
      error,
      message: "Unable to find post.",
    };
  }
}

// in desc order of date
// by type and limit
// with specific data only
// [
//   "_id",
//   "postImage",
//   "createdBy",
//   "postTitle",
//   "postAuthors",
//   "postType",
//   "postUpdated",
//   "postDescription",
// ]
export async function findPostByTypewithLimit(
  postType: string,
  limit: number = -1
) {
  try {
    if (limit > 0) {
      const posts = await PostModel.find({ postType })
        .select([
          "_id",
          "postImage",
          "createdBy",
          "postTitle",
          "postAuthors",
          "postType",
          "postUpdated",
          "postDescription",
        ])
        .sort({
          postUpdated: -1, // descending order date : new first old last
        })
        .limit(limit);
      if (posts.length > 0) {
        return {
          posts,
          message: "Posts found.",
          operation: true,
        };
      } else {
        return {
          posts,
          message: `Posts of type : ${postType} does not exist.`,
          operation: false,
        };
      }
    } else {
      const posts = await PostModel.find({ postType })
        .select([
          "_id",
          "postImage",
          "createdBy",
          "postTitle",
          "postAuthors",
          "postType",
          "postUpdated",
          "postDescription",
        ])
        .sort({
          postUpdated: -1,
        });
      if (posts.length > 0) {
        return {
          posts,
          message: "Posts found.",
          operation: true,
        };
      } else {
        return {
          posts,
          message: `Posts of type : ${postType} does not exist.`,
          operation: false,
        };
      }
    }
  } catch (error) {
    return {
      error,
      message: `Error finding "${postType}" posts.`,
    };
  }
}

// in desc order of date of last post of previous fetch
// by type and limit
// with specific data only
// [
//   "_id",
//   "postImage",
//   "createdBy",
//   "postTitle",
//   "postAuthors",
//   "postType",
//   "postUpdated",
//   "postDescription",
// ]

export async function findPostByTypewithLimitByDateOfLastElem(
  postUpdatedOfLastElement: Date,
  postType: string,
  limit: number = -1
) {
  try {
    if (limit > 0) {
      const posts = await PostModel.find({ postType })
        .where({
          postUpdated: {
            $lt: postUpdatedOfLastElement, // less than the last postUpdated Date of the post
          },
        })
        .select([
          "_id",
          "postImage",
          "createdBy",
          "postTitle",
          "postAuthors",
          "postType",
          "postUpdated",
          "postDescription",
        ])
        .sort({
          postUpdated: -1, // descending order date : new first old last
        })
        .limit(limit);
      if (posts.length > 0) {
        return {
          posts,
          message: "Posts found.",
          operation: true,
        };
      } else {
        return {
          posts,
          message: `Posts of type : ${postType} does not exist.`,
          operation: false,
        };
      }
    } else {
      const posts = await PostModel.find({ postType })
        .where({
          postUpdated: {
            $lt: postUpdatedOfLastElement, // less than the last postUpdated Date of the post
          },
        })
        .select([
          "_id",
          "postImage",
          "createdBy",
          "postTitle",
          "postAuthors",
          "postType",
          "postUpdated",
          "postDescription",
        ])
        .sort({
          postUpdated: -1,
        });
      if (posts.length > 0) {
        return {
          posts,
          message: "Posts found.",
          operation: true,
        };
      } else {
        return {
          posts,
          message: `Posts of type : ${postType} does not exist.`,
          operation: false,
        };
      }
    }
  } catch (error) {
    return {
      message: `Error finding ${postType} posts.`,
      error,
    };
  }
}

// count posts
// by type
export async function countPostsByType(postType: POST["postType"]) {
  try {
    const nPosts = await PostModel.countDocuments({ postType });
    if (nPosts > 0) {
      return {
        message: `Posts of type : ${postType} are ${nPosts}.`,
        nPosts,
        operation: true,
      };
    } else {
      return {
        message: `Posts of type  : ${postType} do not exists.`,
        nPosts,
        operation: false,
      };
    }
  } catch (error) {
    return {
      message: "Error counting posts by type.",
      error,
    };
  }
}

// all posts
export async function countAllPosts() {
  try {
    const nPosts = await PostModel.countDocuments();
    if (nPosts > 0) {
      return {
        message: `Number of posts are ${nPosts}.`,
        nPosts,
        operation: true,
      };
    } else {
      return {
        message: `Posts do not exists.`,
        nPosts,
        operation: false,
      };
    }
  } catch (error) {
    return {
      message: "Error counting all posts.",
      error,
    };
  }
}

// by users
export async function countPostsByUsers(userId: POST["createdBy"]["id"]) {
  try {
    const nPosts = await PostModel.countDocuments({ "createdBy.id": userId });
    if (nPosts > 0) {
      return {
        message: `Posts created by user with id : "${userId}" are "${nPosts}".`,
        nPosts,
        operation: true,
      };
    } else {
      return {
        message: `There are no Posts created by user with id "${userId}" .`,
        nPosts,
        operation: false,
      };
    }
  } catch (error) {
    return {
      message: "Error counting posts by user.",
      error,
    };
  }
}
