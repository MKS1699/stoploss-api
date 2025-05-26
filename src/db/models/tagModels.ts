import {
  DATABASE_CODE_ENUM,
  DATABASE_RESPONSE,
  DBResponseMessage,
} from "../../tools/databaseResponseCodes";
import { TagModel } from "../Schema";
import { ITagDocument } from "../Schema/tagSchema";
import { createDBResponseFromCode } from "../../tools/dbResponse";

// creating a new tag
export async function createTag({
  tag,
  id,
}: {
  tag: string;
  id: string;
}): Promise<DATABASE_RESPONSE<ITagDocument>> {
  try {
    const TAG: ITagDocument = await TagModel.create({ tag, posts: id });
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_TAG_CREATE_SUCCESS,
      result: TAG,
    });
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_TAG_CREATE_ERROR,
      result: error,
    });
  }
}

// finding a existing tag
export async function findTag(
  tag: string
): Promise<DATABASE_RESPONSE<ITagDocument>> {
  try {
    const foundTag: ITagDocument = await TagModel.findOne({ tag });
    if (foundTag !== null) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_TAG_NAME_SUCCESS,
        result: foundTag,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_TAG_NAME_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_TAG_NAME_QUERY_ERROR,
      result: error,
    });
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
}): Promise<DATABASE_RESPONSE<ITagDocument>> {
  try {
    // const newPostsArr : string[] = [...posts, postID];
    const updatedTAG: ITagDocument = await TagModel.findByIdAndUpdate(tagID, {
      $push: { posts: postID },
    });

    if (updatedTAG !== null) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_TAG_UPDATE_ADD_POST_BY_TAG_ID_SUCCESS,
        result: updatedTAG,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_TAG_UPDATE_BY_TAG_ID_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_TAG_UPDATE_ADD_POST_BY_TAG_ID_QUERY_ERROR,
      result: error,
    });
  }
}

// find tag related to specific post
export async function findTagsRelatedToPost(
  postId: string
): Promise<DATABASE_RESPONSE<ITagDocument[]>> {
  try {
    const tags = await TagModel.find({ posts: postId }).select(["tag"]);
    if (tags.length > 0) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_SUCCESS,
        result: tags,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_QUERY_ERROR,
      result: error,
    });
  }
}

// find posts related to tag
export async function findPostsRelatedToTags(
  tag: string
): Promise<DATABASE_RESPONSE<ITagDocument[]>> {
  try {
    const posts = await TagModel.find({ tag }).select(["posts"]);
    if (posts.length > 0) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_TAG_FIND_POST_BY_TAG_NAME_SUCCESS,
        result: posts,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_TAG_FIND_POST_BY_TAG_NAME_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_TAG_FIND_POST_BY_TAG_NAME_QUERY_ERROR,
      result: error,
    });
  }
}

// find tag and posts by postId related to tag
export async function findTagsnPostsRelatedToPostId(
  postId: string
): Promise<DATABASE_RESPONSE<ITagDocument[]>> {
  try {
    const tags: ITagDocument[] = await TagModel.find({ posts: postId });
    if (tags.length > 0) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_SUCCESS,
        result: tags,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_QUERY_ERROR,
      result: error,
    });
  }
}

// remove a single post linked to tag
export async function removePostRelatedToTag(
  tagId: string,
  postId: string
): Promise<DATABASE_RESPONSE<ITagDocument>> {
  try {
    const TAG: ITagDocument = await TagModel.findById(tagId);
    if (TAG) {
      const { _id, tag, posts } = TAG;
      const newPostArray = posts.filter((id: string) => id !== postId);
      const updatedTag = await TagModel.findByIdAndUpdate(tagId, {
        posts: newPostArray,
      });
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_SUCCESS,
        result: updatedTag,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_TAG_UPDATE_BY_TAG_ID_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_QUERY_ERROR,
      result: error,
    });
  }
}

// deleting tag
export async function deleteTagByTagId(
  tagId: string
): Promise<DATABASE_RESPONSE<ITagDocument>> {
  try {
    const deletedTag: ITagDocument = await TagModel.findByIdAndDelete(tagId);
    if (deletedTag !== null) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_TAG_DELETE_BY_TAG_ID_SUCCESS,
        result: deletedTag,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_TAG_DELETE_BY_TAG_ID_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_TAG_DELETE_BY_TAG_ID_QUERY_ERROR,
      result: error,
    });
  }
}
