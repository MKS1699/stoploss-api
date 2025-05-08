import {
  DATABASE_CODE_ENUM,
  DATABASE_RESPONSE_RESULT,
  DBResponseMessage,
} from "tools/databaseResponseCodes";
import { TagModel } from "../Schema";

// creating a new tag
export async function createTag({
  tag,
  id,
}: {
  tag: string;
  id: string;
}): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const TAG = await TagModel.create({ tag, posts: id });
    return {
      message: DBResponseMessage(DATABASE_CODE_ENUM.DB_TAG_CREATE_SUCCESS),
      responseCode: DATABASE_CODE_ENUM.DB_TAG_CREATE_SUCCESS,
      result: TAG,
      success: true,
    };
  } catch (error) {
    return {
      message: DBResponseMessage(DATABASE_CODE_ENUM.DB_TAG_CREATE_ERROR),
      responseCode: DATABASE_CODE_ENUM.DB_TAG_CREATE_ERROR,
      result: error,
      success: false,
    };
  }
}

// finding a existing tag
export async function findTag(
  tag: string
): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const foundTag = await TagModel.findOne({ tag });
    if (foundTag !== null) {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_TAG_FIND_BY_TAG_NAME_SUCCESS
        ),
        responseCode: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_TAG_NAME_SUCCESS,
        result: foundTag,
        success: true,
      };
    } else {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_TAG_FIND_BY_TAG_NAME_ERROR
        ),
        responseCode: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_TAG_NAME_ERROR,
        result: null,
        success: false,
      };
    }
  } catch (error) {
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_TAG_FIND_BY_TAG_NAME_QUERY_ERROR
      ),
      responseCode: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_TAG_NAME_QUERY_ERROR,
      result: error,
      success: false,
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
}): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    // const newPostsArr : string[] = [...posts, postID];
    const updatedTAG = await TagModel.findByIdAndUpdate(tagID, {
      $push: { posts: postID },
    });

    if (updatedTAG !== null) {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_TAG_UPDATE_ADD_POST_BY_TAG_ID_SUCCESS
        ),
        responseCode:
          DATABASE_CODE_ENUM.DB_TAG_UPDATE_ADD_POST_BY_TAG_ID_SUCCESS,
        result: updatedTAG,
        success: true,
      };
    } else {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_TAG_UPDATE_BY_TAG_ID_ERROR
        ),
        responseCode: DATABASE_CODE_ENUM.DB_TAG_UPDATE_BY_TAG_ID_ERROR,
        result: null,
        success: false,
      };
    }
  } catch (error) {
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_TAG_UPDATE_ADD_POST_BY_TAG_ID_QUERY_ERROR
      ),
      responseCode:
        DATABASE_CODE_ENUM.DB_TAG_UPDATE_ADD_POST_BY_TAG_ID_QUERY_ERROR,
      result: error,
      success: false,
    };
  }
}

// find tag related to specific post
export async function findTagsRelatedToPost(
  postId: string
): Promise<DATABASE_RESPONSE_RESULT<any[]>> {
  try {
    const tags = await TagModel.find({ posts: postId }).select(["tag"]);
    if (tags.length > 0) {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_SUCCESS
        ),
        responseCode: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_SUCCESS,
        result: tags,
        success: true,
      };
    } else {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_ERROR
        ),
        responseCode: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_ERROR,
        result: null,
        success: false,
      };
    }
  } catch (error) {
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_QUERY_ERROR
      ),
      responseCode: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_QUERY_ERROR,
      result: error,
      success: false,
    };
  }
}

// find posts related to tag
export async function findPostsRelatedToTags(
  tag: string
): Promise<DATABASE_RESPONSE_RESULT<any[]>> {
  try {
    const posts = await TagModel.find({ tag }).select(["posts"]);
    if (posts.length > 0) {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_TAG_FIND_POST_BY_TAG_NAME_SUCCESS
        ),
        responseCode: DATABASE_CODE_ENUM.DB_TAG_FIND_POST_BY_TAG_NAME_SUCCESS,
        result: posts,
        success: true,
      };
    } else {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_TAG_FIND_POST_BY_TAG_NAME_ERROR
        ),
        responseCode: DATABASE_CODE_ENUM.DB_TAG_FIND_POST_BY_TAG_NAME_ERROR,
        result: null,
        success: false,
      };
    }
  } catch (error) {
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_TAG_FIND_POST_BY_TAG_NAME_QUERY_ERROR
      ),
      responseCode: DATABASE_CODE_ENUM.DB_TAG_FIND_POST_BY_TAG_NAME_QUERY_ERROR,
      result: error,
      success: false,
    };
  }
}

// find tag and posts by postId related to tag
export async function findTagsnPostsRelatedToPostId(
  postId: string
): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const tags = await TagModel.find({ posts: postId });
    if (tags.length > 0) {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_SUCCESS
        ),
        responseCode: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_SUCCESS,
        result: tags,
        success: true,
      };
    } else {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_ERROR
        ),
        responseCode: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_ERROR,
        result: null,
        success: false,
      };
    }
  } catch (error) {
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_QUERY_ERROR
      ),
      responseCode: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_QUERY_ERROR,
      result: error,
      success: false,
    };
  }
}

// remove a single post linked to tag
export async function removePostRelatedToTag(
  tagId: string,
  postId: string
): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const TAG = await TagModel.findById(tagId);
    if (TAG) {
      const { _id, tag, posts } = TAG;
      const newPostArray = posts.filter((id: string) => id !== postId);
      const updatedTag = await TagModel.findByIdAndUpdate(tagId, {
        posts: newPostArray,
      });

      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_SUCCESS
        ),
        responseCode:
          DATABASE_CODE_ENUM.DB_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_SUCCESS,
        result: updatedTag,
        success: true,
      };
    } else {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_TAG_UPDATE_BY_TAG_ID_ERROR
        ),
        responseCode: DATABASE_CODE_ENUM.DB_TAG_UPDATE_BY_TAG_ID_ERROR,
        result: null,
        success: false,
      };
    }
  } catch (error) {
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_QUERY_ERROR
      ),
      responseCode:
        DATABASE_CODE_ENUM.DB_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_QUERY_ERROR,
      result: error,
      success: false,
    };
  }
}

// deleting tag
export async function deleteTagByTagId(
  tagId: string
): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const deletedTag = await TagModel.findByIdAndDelete(tagId);
    if (deletedTag !== null) {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_TAG_DELETE_BY_TAG_ID_SUCCESS
        ),
        responseCode: DATABASE_CODE_ENUM.DB_TAG_DELETE_BY_TAG_ID_SUCCESS,
        result: deletedTag,
        success: true,
      };
    } else {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_TAG_DELETE_BY_TAG_ID_ERROR
        ),
        responseCode: DATABASE_CODE_ENUM.DB_TAG_DELETE_BY_TAG_ID_ERROR,
        result: null,
        success: false,
      };
    }
  } catch (error) {
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_TAG_DELETE_BY_TAG_ID_QUERY_ERROR
      ),
      responseCode: DATABASE_CODE_ENUM.DB_TAG_DELETE_BY_TAG_ID_QUERY_ERROR,
      result: error,
      success: false,
    };
  }
}
