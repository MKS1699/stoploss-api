// todo : remove dead comments / previous responses
import { POST } from "types/@types";
import { PostModel } from "../Schema";
import {
  DATABASE_CODE_ENUM,
  DATABASE_RESPONSE,
  DBResponseMessage,
} from "tools/databaseResponseCodes";
import { IIPODocument } from "db/Schema/ipoSchema";
import { IPostDocument } from "db/Schema/postSchema";
import { createDBResponseFromCode } from "tools/dbResponse";

// create new post
export async function createPost(
  post: POST
): Promise<DATABASE_RESPONSE<IIPODocument>> {
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

    const newPost: any = await PostModel.create({
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
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_POST_CREATE_SUCCESS,
      result: newPost,
    });
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_POST_CREATE_ERROR,
      result: error,
    });
  }
}

// find post
// by id
export async function findPostById(
  id: string
): Promise<DATABASE_RESPONSE<IPostDocument>> {
  try {
    const post: IPostDocument = await PostModel.findById(id);
    if (post !== null) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_POST_FIND_BY_POST_ID_SUCCESS,
        result: post,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_POST_FIND_BY_POST_ID_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_POST_FIND_BY_POST_ID_QUERY_ERROR,
      result: error,
    });
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
): Promise<DATABASE_RESPONSE<IPostDocument[]>> {
  try {
    if (limit > 0) {
      const posts: IPostDocument[] = await PostModel.find({ postType })
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
        return createDBResponseFromCode({
          code: DATABASE_CODE_ENUM.DB_POST_FIND_BY_TYPE_LIMIT_SUCCESS,
          result: posts,
        });
      } else {
        return createDBResponseFromCode({
          code: DATABASE_CODE_ENUM.DB_POST_FIND_BY_TYPE_LIMIT_ERROR,
          result: null,
        });
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
        return createDBResponseFromCode({
          code: DATABASE_CODE_ENUM.DB_POST_FIND_BY_TYPE_LIMIT_SUCCESS,
          result: posts,
        });
      } else {
        return createDBResponseFromCode({
          code: DATABASE_CODE_ENUM.DB_POST_FIND_BY_TYPE_LIMIT_ERROR,
          result: null,
        });
      }
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_POST_FIND_BY_TYPE_LIMIT_QUERY_ERROR,
      result: error,
    });
  }
}

// in desc order of date that is newest first irrespective of category
export async function latestPosts(): Promise<
  DATABASE_RESPONSE<IPostDocument[]>
> {
  try {
    const posts: IPostDocument[] = await PostModel.find()
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
    if (posts.length > 0) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_POST_FIND_LATEST_SUCCESS,
        result: posts,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_POST_FIND_LATEST_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_POST_FIND_LATEST_QUERY_ERROR,
      result: error,
    });
  }
}

// find posts by a user
export async function findPostsByUser(
  userId: string,
  afterLastPostDate: Date | 0 = 0,
  limit: number = 10
): Promise<DATABASE_RESPONSE<IPostDocument[]>> {
  try {
    let posts: IPostDocument[] = [];
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
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_POST_FIND_BY_USER_ID_SUCCESS,
        result: posts,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_POST_FIND_BY_USER_ID_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_POST_FIND_BY_USER_ID_QUERY_ERROR,
      result: error,
    });
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
): Promise<DATABASE_RESPONSE<IPostDocument[]>> {
  try {
    if (limit > 0) {
      const posts: IPostDocument[] = await PostModel.find({ postType })
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
        return createDBResponseFromCode({
          code: DATABASE_CODE_ENUM.DB_POST_FIND_BY_TYPE_LIMIT_SUCCESS,
          result: posts,
        });
      } else {
        return createDBResponseFromCode({
          code: DATABASE_CODE_ENUM.DB_POST_FIND_BY_TYPE_LIMIT_ERROR,
          result: null,
        });
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
        return createDBResponseFromCode({
          code: DATABASE_CODE_ENUM.DB_POST_FIND_BY_TYPE_LIMIT_SUCCESS,
          result: posts,
        });
      } else {
        return createDBResponseFromCode({
          code: DATABASE_CODE_ENUM.DB_POST_FIND_BY_TYPE_LIMIT_ERROR,
          result: null,
        });
      }
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_POST_FIND_BY_TYPE_LIMIT_QUERY_ERROR,
      result: error,
    });
  }
}

// count posts
// by type
export async function countPostsByType(
  postType: POST["postType"]
): Promise<DATABASE_RESPONSE<number>> {
  try {
    const nPosts: number = await PostModel.countDocuments({ postType });
    if (nPosts > 0) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_POST_COUNT_BY_TYPE_SUCCESS,
        result: nPosts,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_POST_COUNT_BY_TYPE_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_POST_COUNT_BY_TYPE_QUERY_ERROR,
      result: error,
    });
  }
}

// all posts
export async function countAllPosts(): Promise<DATABASE_RESPONSE<number>> {
  try {
    const nPosts: number = await PostModel.countDocuments();
    if (nPosts > 0) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_POST_COUNT_ALL_SUCCESS,
        result: nPosts,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_POST_COUNT_ALL_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_POST_COUNT_ALL_QUERY_ERROR,
      result: error,
    });
  }
}

// by users
export async function countPostsByUsers(
  userId: POST["createdBy"]["id"]
): Promise<DATABASE_RESPONSE<number>> {
  try {
    const nPosts: number = await PostModel.countDocuments({
      "createdBy.id": userId,
    });
    if (nPosts > 0) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_POST_COUNT_BY_USER_ID_SUCCESS,
        result: nPosts,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_POST_COUNT_BY_USER_ID_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_POST_COUNT_BY_USER_ID_QUERY_ERROR,
      result: error,
    });
  }
}

// delete post by id
export async function deletePostById(
  postId: string
): Promise<DATABASE_RESPONSE<IPostDocument>> {
  try {
    const deletedPost: IPostDocument = await PostModel.findByIdAndDelete(
      postId
    );
    if (deletedPost !== null) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_POST_DELETE_BY_ID_SUCCESS,
        result: deletedPost,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_POST_DELETE_BY_ID_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_POST_DELETE_BY_ID_QUERY_ERROR,
      result: error,
    });
  }
}

// get all the posts (title, image, description , authors & Id )
// in postUpdate descending format latest first
// for search purpose (searching will be done in the browser)
export async function getAllPostsForSearch(): Promise<
  DATABASE_RESPONSE<IPostDocument[]>
> {
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
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_POST_FIND_ALL_SUCCESS,
        result: posts,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_POST_FIND_ALL_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_POST_FIND_ALL_QUERY_ERROR,
      result: error,
    });
  }
}
