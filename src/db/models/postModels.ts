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
      operation: true,
      newPost,
      statusCode: 1,
    };
  } catch (error) {
    return {
      message: "Unable to create post.",
      error,
      operation: false,
      statusCode: 0,
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
        statusCode: 1,
      };
    } else {
      return {
        post,
        message: `Post with id : ${id} doesn't exist.`,
        operation: true,
        statusCode: 0,
      };
    }
  } catch (error) {
    return {
      error,
      message: "Unable to find post.",
      operation: false,
      statusCode: 0,
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
export async function findPostByTypeWithLimit(
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
          statusCode: 1,
        };
      } else {
        return {
          posts,
          message: `Posts of type : ${postType} does not exist.`,
          operation: true,
          statusCode: 0,
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
          statusCode: 1,
        };
      } else {
        return {
          posts,
          message: `Posts of type : ${postType} does not exist.`,
          operation: true,
          statusCode: 0,
        };
      }
    }
  } catch (error) {
    return {
      error,
      message: `Error finding "${postType}" posts.`,
      operation: false,
      statusCode: 0,
    };
  }
}

// in desc order of date that is newest first irrespective of category
export async function latestPosts() {
  try {
    const posts = await PostModel.find()
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
      .limit(5);
    return {
      operation: true,
      message: "Here are latest 5 posts.",
      statusCode: 1,
      posts,
    };
  } catch (error) {
    return {
      error,
      message: `Error finding latest posts.`,
      operation: false,
      statusCode: 0,
    };
  }
}

// find posts by a user
export async function findPostsByUser(
  userId: string,
  afterLastPostDate: Date | 0 = 0,
  limit: number = 10
) {
  try {
    let posts: any[] = [];
    if (afterLastPostDate == 0) {
      posts = await PostModel.find({ "createdBy.id": userId })
        .sort({ postUpdated: -1 })
        .limit(limit);
    } else {
      posts = await PostModel.find({
        "createdBy.id": userId,
      })
        .where({
          postUpdated: {
            $lt: afterLastPostDate, // less than the last postUpdated Date of the post
          },
        })
        .sort({ postUpdated: -1 })
        .limit(limit);
    }
    if (posts.length > 0) {
      return {
        posts,
        message: `Posts created by ${userId}.`,
        operation: true,
        statusCode: 1,
      };
    } else {
      return {
        posts,
        message: "There are no posts by the user.",
        operation: true,
        statusCode: 0,
      };
    }
  } catch (error) {
    return {
      error,
      message: "Unable to get Posts by User",
      operation: false,
      statusCode: 0,
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

export async function findPostByTypeWithLimitByDateOfLastElem(
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
          statusCode: 1,
        };
      } else {
        return {
          posts,
          message: `Posts of type : ${postType} does not exist.`,
          operation: true,
          statusCode: 0,
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
          statusCode: 1,
        };
      } else {
        return {
          posts,
          message: `Posts of type : ${postType} does not exist.`,
          operation: true,
          statusCode: 0,
        };
      }
    }
  } catch (error) {
    return {
      message: `Error finding ${postType} posts.`,
      error,
      operation: false,
      statusCode: 0,
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
        statusCode: 1,
      };
    } else {
      return {
        message: `Posts of type  : ${postType} do not exists.`,
        nPosts,
        operation: true,
        statusCode: 0,
      };
    }
  } catch (error) {
    return {
      message: "Error counting posts by type.",
      error,
      operation: false,
      statusCode: 0,
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
        statusCode: 1,
      };
    } else {
      return {
        message: `Posts do not exists.`,
        nPosts,
        operation: true,
        statusCode: 0,
      };
    }
  } catch (error) {
    return {
      message: "Error counting all posts.",
      error,
      operation: false,
      statusCode: 0,
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
        statusCode: 1,
      };
    } else {
      return {
        message: `There are no Posts created by user with id "${userId}" .`,
        nPosts,
        operation: true,
        statusCode: 0,
      };
    }
  } catch (error) {
    return {
      message: "Error counting posts by user.",
      error,
      operation: false,
      statusCode: 0,
    };
  }
}

// delete post by id
export async function deletePostById(postId: string) {
  try {
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    return {
      deletedPost,
      operation: true,
      statusCode: 1,
      message: `Post with id : ${postId} deleted.`,
    };
  } catch (error) {
    return {
      error,
      message: "Error while deleting post",
      operation: false,
      statusCode: 0,
    };
  }
}

// get all the posts (title, image, description , authors & Id )
// in postUpdate descending format latest first
// for search purpose (searching will be done in the browser)
export async function getAllPostsForSearch() {
  try {
    const posts = await PostModel.find()
      .select([
        "postTitle",
        "_id",
        "postImage",
        "postAuthors",
        "postDescription",
        "postUpdated",
      ])
      .sort({ postUpdated: -1 });

    if (posts.length > 0) {
      return {
        posts,
        message: "Posts found.",
        operation: "success",
      };
    } else {
      return {
        posts,
        message: "No Posts are there in the db.",
        operation: "fail",
      };
    }
  } catch (error) {
    return {
      error,
      message: "Error finding posts.",
      operation: "error",
    };
  }
}
