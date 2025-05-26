import {
  createTag,
  deleteTagByTagId,
  findPostsRelatedToTags,
  findTag,
  findTagsRelatedToPost,
  findTagsnPostsRelatedToPostId,
  removePostRelatedToTag,
  updateTagByPostID,
} from "../db/models/tagModels";
import {
  countAllPosts,
  countPostsByType,
  countPostsByUsers,
  createPost,
  deletePostById,
  findPostById,
  findPostByTypeWithLimit,
  findPostByTypeWithLimitByDateOfLastElem,
  findPostsByUser,
  getAllPostsForSearch,
  latestPosts,
} from "../db/models/postModels";
import express from "express";
import {
  POST,
  // UPCOMINGIPOLISTTYPES
} from "types/@types";
// import {
//   addOneLinkedPostId,
//   createNewUpcomingIPO,
//   deleteOneLinkedPostId,
//   deleteUpcomingIPOEntryByIPOName,
//   deleteUpcomingIPOEntryById,
//   findAllUpcomingIPOEntries,
//   findUpcomingIPOEntryByID,
//   findUpcomingIPOEntryByIPOName,
//   findUpcomingIPOEntryByLinkedPostId,
//   updateUpcomingIPOEntryClose,
//   updateUpcomingIPOEntryIPOName,
//   updateUpcomingIPOEntryOpen,
// } from "../db/models/upcomingIPOModels";
import {
  createInternalServerErrorResponse,
  mapAPIResponseToDBResponse,
} from "../tools/apiResponse";

// post related
// get post by id
export async function getPostById(req: express.Request, res: express.Response) {
  try {
    const { id }: { id: string } = req.body;
    // if (id) {
    //   const result = await findPostById(id);
    //   if (result.operation) {
    //     res.status(200).json({
    //       result,
    //     });
    //   }
    // } else {
    //   res.status(401).json({
    //     message: "Please provide post id. 'id' ",
    //   });
    // }
    const findPostByIdResponse = await findPostById(id);

    const { success, result } = findPostByIdResponse;

    // success & result
    if (success && result) {
      return res
        .status(200)
        .json(mapAPIResponseToDBResponse({ dbResponse: findPostByIdResponse }));
    }
    // error & null result
    else if (!success && !result) {
      return res
        .status(400)
        .json(mapAPIResponseToDBResponse({ dbResponse: findPostByIdResponse }));
    }
    // error & error result
    else if (!success && result) {
      return res
        .status(500)
        .json(mapAPIResponseToDBResponse({ dbResponse: findPostByIdResponse }));
    }
  } catch (error) {
    // res.status(500).json({
    //   message: "Internal Server Error.",
    //   error,
    // });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// by user
export async function getPostsByUser(
  req: express.Request,
  res: express.Response
) {
  try {
    const {
      userId,
      limit,
      fromLastPostDate,
    }: {
      userId: string;
      limit: number;
      fromLastPostDate: Date;
    } = req.body;

    // if (userId) {
    //   const result = await findPostsByUser(userId, fromLastPostDate, limit);
    //   if (result.statusCode == 1 && result.operation == true) {
    //     res.status(200).json({
    //       result,
    //     });
    //   } else if ((result.statusCode = 0 && result.operation == true)) {
    //     res.status(200).json({
    //       result,
    //       message: `There are no posts by the user ${userId}`,
    //     });
    //   } else if ((result.statusCode = 0 && result.operation == false)) {
    //     res
    //       .status(500)
    //       .json({ result, message: `Error occurred while finding posts.` });
    //   }
    // } else {
    //   res.status(401).json({ message: "UserId not provided" });
    // }

    const findPostsByUserResponse = await findPostsByUser(
      userId,
      fromLastPostDate,
      limit
    );

    const { success, result } = findPostsByUserResponse;

    // success & result
    if (success && result) {
      return res
        .status(200)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: findPostsByUserResponse })
        );
    }
    // error & null result
    else if (!success && !result) {
      return res
        .status(400)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: findPostsByUserResponse })
        );
    }
    // error & error result
    else if (!success && result) {
      return res
        .status(400)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: findPostsByUserResponse })
        );
    }
  } catch (error) {
    // res.status(500).json({ message: "Internal Server Error" });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// posts by type with limit
export async function getPostsByTypeWithLimit(
  req: express.Request,
  res: express.Response
) {
  try {
    const { postType, limit }: { postType: string; limit: number } = req.body;
    // if (postType) {
    //   const result = await findPostByTypeWithLimit(postType, limit);
    //   if (result.operation) {
    //     res.status(200).json({ result });
    //   }
    // } else {
    //   res.status(401).json({
    //     message: "Please provide type of the posts to get. 'postType' ",
    //   });
    // }
    const findPostByTypeWithLimitResponse = await findPostByTypeWithLimit(
      postType,
      limit
    );

    const { success, result } = findPostByTypeWithLimitResponse;

    // success & result
    if (success && result) {
      return res.status(200).json(
        mapAPIResponseToDBResponse({
          dbResponse: findPostByTypeWithLimitResponse,
        })
      );
    }
    // error & null result
    else if (success && result) {
      return res.status(400).json(
        mapAPIResponseToDBResponse({
          dbResponse: findPostByTypeWithLimitResponse,
        })
      );
    }
    // error & error result
    else if (success && result) {
      return res.status(400).json(
        mapAPIResponseToDBResponse({
          dbResponse: findPostByTypeWithLimitResponse,
        })
      );
    }
  } catch (error) {
    // res.status(500).json({ message: "Internal Server Error." });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// posts by type with limit and older than previous last updated
export async function getPostsByTypeWithLimitOlderElements(
  req: express.Request,
  res: express.Response
) {
  try {
    const {
      postUpdatedOfLastElement,
      postType,
      limit,
    }: {
      postType: string;
      limit: number;
      postUpdatedOfLastElement: Date;
    } = req.body;

    // if (postType && postUpdatedOfLastElement) {
    //   const result = await findPostByTypeWithLimitByDateOfLastElem(
    //     postUpdatedOfLastElement,
    //     postType,
    //     limit
    //   );
    //   if (result.operation) {
    //     res.status(200).json({ result });
    //   }
    // } else if (!postType) {
    //   res.status(401).json({
    //     message: "Please provide postType of the posts to get. 'postType' ",
    //   });
    // } else if (!postUpdatedOfLastElement) {
    //   res.status(401).json({
    //     message:
    //       "Please provide postUpdatedOfLastElement date of the last posts to get. 'postUpdatedOfLastElement'",
    //   });
    // }

    const findPostByTypeWithLimitByDateOfLastElemResponse =
      await findPostByTypeWithLimitByDateOfLastElem(
        postUpdatedOfLastElement,
        postType,
        limit
      );

    const { success, result } = findPostByTypeWithLimitByDateOfLastElemResponse;

    // success & result
    if (success && result) {
      return res.status(200).json(
        mapAPIResponseToDBResponse({
          dbResponse: findPostByTypeWithLimitByDateOfLastElemResponse,
        })
      );
    }
    // error & null result
    else if (!success && !result) {
      return res.status(400).json(
        mapAPIResponseToDBResponse({
          dbResponse: findPostByTypeWithLimitByDateOfLastElemResponse,
        })
      );
    }
    // error & error result
    else if (!success && result) {
      return res.status(400).json(
        mapAPIResponseToDBResponse({
          dbResponse: findPostByTypeWithLimitByDateOfLastElemResponse,
        })
      );
    }
  } catch (error) {
    // res.status(500).json({ message: "Internal Server Error." });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// posts by created/updated as latest
export async function getLatestPosts(
  _: express.Request,
  res: express.Response
) {
  try {
    // const result = await latestPosts();
    // res.status(200).json({ result });

    const latestPostsResponse = await latestPosts();
    const { success, result } = latestPostsResponse;

    // success & result
    if (success && result) {
      return res
        .status(200)
        .json(mapAPIResponseToDBResponse({ dbResponse: latestPostsResponse }));
    }
    // error & null result
    else if (!success && !result) {
      return res
        .status(400)
        .json(mapAPIResponseToDBResponse({ dbResponse: latestPostsResponse }));
    }
    // error & error result
    else if (!success && result) {
      return res
        .status(400)
        .json(mapAPIResponseToDBResponse({ dbResponse: latestPostsResponse }));
    }
  } catch (error) {
    // res.status(500).json({
    //   message: "Internal Server Error",
    //   error,
    // });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// number of posts
// by type
export async function getPostSizeByType(
  req: express.Request,
  res: express.Response
) {
  try {
    const { postType }: { postType: POST["postType"] } = req.body;
    // if (postType) {
    //   const result = await countPostsByType(postType);
    //   if (result.operation) {
    //     res.status(200).json({ result });
    //   }
    // } else {
    //   res
    //     .status(424)
    //     .json({ message: 'Please provide type of posts. "postType"' });
    // }
    const countPostByPostTypeResponse = await countPostsByType(postType);
    const { success, result } = countPostByPostTypeResponse;

    // success & result
    if (success && result) {
      return res.status(200).json(
        mapAPIResponseToDBResponse({
          dbResponse: countPostByPostTypeResponse,
        })
      );
    }
    // error & null result
    else if (!success && !result) {
      return res.status(400).json(
        mapAPIResponseToDBResponse({
          dbResponse: countPostByPostTypeResponse,
        })
      );
    }
    //  error & error result
    else if (!success && result) {
      return res.status(500).json(
        mapAPIResponseToDBResponse({
          dbResponse: countPostByPostTypeResponse,
        })
      );
    }
  } catch (error) {
    // res.status(500).json({ message: "Internal server error.", error });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// all posts
export async function getAllPostsSize(_: null, res: express.Response) {
  try {
    // const result = await countAllPosts();
    // if (result.operation) {
    //   res.status(200).json({ result });
    // }
    const countAllPostsResponse = await countAllPosts();
    const { success, result } = countAllPostsResponse;

    // success & result
    if (success && result) {
      return res
        .status(200)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: countAllPostsResponse })
        );
    }
    // error & null result
    else if (!success && !result) {
      return res
        .status(400)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: countAllPostsResponse })
        );
    }
    // error & error result
    else if (!success && result) {
      return res
        .status(400)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: countAllPostsResponse })
        );
    }
  } catch (error) {
    // res.status(500).json({ message: "Internal server error.", error });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// created by user
export async function getPostsSizeByUser(
  req: express.Request,
  res: express.Response
) {
  try {
    const { userId }: { userId: POST["createdBy"]["id"] } = req.body;
    // if (userId) {
    //   const result = await countPostsByUsers(userId);
    //   if (result.operation) {
    //     res.status(200).json({ result });
    //   }
    // } else {
    //   res
    //     .status(401)
    //     .json({ message: 'Please provide id of the user "userId".' });
    // }
    const countPostByUserIdResponse = await countPostsByUsers(userId);
    const { success, result } = countPostByUserIdResponse;

    // success & result
    if (success && result) {
      return res
        .status(200)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: countPostByUserIdResponse })
        );
    }
    // error & null result
    else if (!success && !result) {
      return res
        .status(400)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: countPostByUserIdResponse })
        );
    }
    // error & error result
    else if (!success && result) {
      return res
        .status(400)
        .json(
          mapAPIResponseToDBResponse({ dbResponse: countPostByUserIdResponse })
        );
    }
  } catch (error) {
    // res.status(500).json({ message: "Internal server error.", error });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}
// create new post with tags, ipo entry creation & linking
export async function createNewPost(
  req: express.Request,
  res: express.Response
) {
  try {
    const post: POST = req.body.post;
    const tags: string[] = req.body.tags;

    // post in db
    const createPostResponse = await createPost(post);
    const { success: createPostSuccess, result: createPostResult } =
      createPostResponse;

    // success && result
    if (createPostSuccess && createPostResult) {
      // created post id
      const postId: any | string = createPostResult._id;

      // creating tags or updating existing tags in the post
      for (let tag of tags) {
        const findTagResponse = await findTag(tag);

        const { success: findTagSuccess, result: findTagResult } =
          findTagResponse;

        // error & null result => no tag found
        if (!findTagSuccess && !findTagResult) {
          // creating new tag
          await createTag({ tag, id: postId });

          // response will be provided at last
          // const createNewTagResponse = await createTag({tag, id : postId});
        }
        // success & result => tag found will link post to the tag
        else if (findTagSuccess && findTagResult) {
          const { posts, _id } = findTagResult;
          const tagId: any | string = _id;
          const linkedPost = posts.filter((post: string) => post === postId);

          // posts is not linked to the tag
          if (linkedPost.length <= 0) {
            // updating tag
            await updateTagByPostID({
              postID: postId,
              tagID: tagId,
            });

            // response will be provided at last
            // const updatedTAG = await updateTagByPostID({
            //   postID : postId,
            //   tagID: tagId,
            // });
          }
        }
      }

      // response of post creation
      return res.status(200).json(
        mapAPIResponseToDBResponse({
          dbResponse: createPostResponse,
        })
      );
    }
    // error & null result
    else if (!createPostSuccess && !createPostResult) {
      return res
        .status(400)
        .json(mapAPIResponseToDBResponse({ dbResponse: createPostResponse }));
    }
    // error & error result
    else if (!createPostSuccess && createPostResult) {
      return res
        .status(400)
        .json(mapAPIResponseToDBResponse({ dbResponse: createPostResponse }));
    }

    // const upcomingIPOEntry: UPCOMINGIPOLISTTYPES = req.body.post.postInfo;
    // // storing post in db
    // const RESULT = await createPost(post);
    // if (RESULT.operation) {
    //   const postID = RESULT.newPost?._id;
    //   // storing tags linked to current post in db
    //   for (let tag of tags) {
    //     const TAG_EXIST = await findTag(tag);
    //     if (TAG_EXIST.foundTag === null) {
    //       const newTAG = await createTag({ tag, id: postID });
    //     } else if (TAG_EXIST.foundTag !== null) {
    //       const posts = TAG_EXIST.foundTag.posts;
    //       const postLinked = posts.filter((post: string) => post === postID);
    //       if (postLinked.length === 0) {
    //         const updatedTAG = await updateTagByPostID({
    //           postID,
    //           tagID: TAG_EXIST.foundTag._id,
    //         });
    //       }
    //     }
    //   }
    //   // storing upcmoingIPO entry and post linking
    //   if (post.postInfo.upcomingIPO) {
    //     const { ipoName, open, close, linkedPostsId }: UPCOMINGIPOLISTTYPES =
    //       upcomingIPOEntry;
    //     const searchEntry = await findUpcomingIPOEntryByIPOName(ipoName);
    //     // update existing entry
    //     if (searchEntry.foundEntry !== null) {
    //       const foundEntryId = searchEntry.foundEntry._id;
    //       const updateEntry = await addOneLinkedPostId({
    //         id: foundEntryId,
    //         linkedPostId: postID,
    //       });
    //     }
    //     // create new entry
    //     else {
    //       const newEntry = await createNewUpcomingIPO({
    //         ipoName,
    //         open,
    //         close,
    //         linkedPostsId: [postID],
    //       });
    //     }
    //   }
    // }
    // res.status(201).json(RESULT);
  } catch (error) {
    // res.status(500).json({
    //   message: "Internal server error.",
    //   error,
    // });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

/* This section deals with tags for post(s) */
// get tags related to post
export async function getTagsRelatedToPost(
  req: express.Request,
  res: express.Response
) {
  try {
    const { postId }: { postId: string } = req.body;
    // if (postId) {
    //   const result = await findTagsRelatedToPost(postId);
    //   if (result.operation) {
    //     res.status(200).json({ result });
    //   }
    // } else {
    //   res.status(424).json({
    //     message: "Please provide id of post of which tags to get. 'postId' ",
    //   });
    // }
    const findTagsRelatedToPostResponse = await findTagsRelatedToPost(postId);

    const { success, result } = findTagsRelatedToPostResponse;

    // success & result
    if (success && result) {
      return res.status(200).json(
        mapAPIResponseToDBResponse({
          dbResponse: findTagsRelatedToPostResponse,
        })
      );
    }
    // error & null result
    else if (!success && !result) {
      return res.status(400).json(
        mapAPIResponseToDBResponse({
          dbResponse: findTagsRelatedToPostResponse,
        })
      );
    }
    // error & error result
    else if (!success && result) {
      return res.status(400).json(
        mapAPIResponseToDBResponse({
          dbResponse: findTagsRelatedToPostResponse,
        })
      );
    }
  } catch (error) {
    // res.status(500).json({ message: "Internal Server Error" });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// get posts related to tag
export async function getPostsRelatedToTag(
  req: express.Request,
  res: express.Response
) {
  try {
    const { tag }: { tag: string } = req.body;
    // if (tag) {
    //   const result = await findPostsRelatedToTags(tag);
    //   if (result.operation) {
    //     res.status(200).json({ result });
    //   }
    // } else {
    //   res.status(401).json({ message: 'Please provide "tag".' });
    // }
    const findPostsRelatedToTagsResponse = await findPostsRelatedToTags(tag);
    const { success, result } = findPostsRelatedToTagsResponse;

    // success & result
    if (success && result) {
      return res.status(200).json(
        mapAPIResponseToDBResponse({
          dbResponse: findPostsRelatedToTagsResponse,
        })
      );
    }
    // error & null result
    else if (!success && !result) {
      return res.status(400).json(
        mapAPIResponseToDBResponse({
          dbResponse: findPostsRelatedToTagsResponse,
        })
      );
    }
    // error & error result
    else if (!success && result) {
      return res.status(400).json(
        mapAPIResponseToDBResponse({
          dbResponse: findPostsRelatedToTagsResponse,
        })
      );
    }
  } catch (error) {
    // res.status(500).json({ message: "Internal server error." });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// delete post
export async function deletePost(req: express.Request, res: express.Response) {
  try {
    const { postId } = req.body;
    const findPostByIdResponse = await findPostById(postId);
    const { success: findPostSuccess, result: findPostResult } =
      findPostByIdResponse;
    // success & result (postId)
    if (findPostSuccess && findPostResult) {
      const tagsRelatedToPostByPostIdResponse =
        await findTagsnPostsRelatedToPostId(postId);

      const { success: tagsSuccess, result: tagsResult } =
        tagsRelatedToPostByPostIdResponse;

      // // future implementation for post related to tag update response
      // const removingPostSuccess: boolean = true;
      // const removingPostErrorResults : any[] = [];
      // const deletingTagSuccess : boolean = true;
      // const deletingTagErrorResults : any[] = [];

      // success & result
      if (tagsSuccess && tagsResult) {
        // deleting / updating tags
        // deleting/updating tags and deleting post

        for (let tag of tagsResult) {
          const { _id, posts } = tag;
          const tagId: any | string = _id;

          // updating tag(s)
          if (posts.length > 1) {
            // removing post related to tag
            // this takes time
            // no success , error , query error response
            // as it can be very large and time consuming process
            await removePostRelatedToTag(tagId, postId);
            // this can be added in the future
            // const removePostRelatedToTagResponse = await removePostRelatedToTag(
            //   tagId,
            //   postId
            // );

            // const { success, result, message } = removePostRelatedToTagResponse;

            // // checking for errors & error / null results
            // if (!success && !result) {
            //   removingPostErrorResults.push({
            //     tagId,
            //     postId,
            //     message,
            //     result,
            //   });
            // } else if (!success && result) {
            //   removingPostErrorResults.push({
            //     tagId,
            //     postId,
            //     message,
            //     result,
            //   });
            // }
          }
          // deleting tag
          else {
            await deleteTagByTagId(tagId);

            // future feature just as removing tags one
            // const deleteTagByTagIdResponse = await deleteTagByTagId(tagId);

            // const {success, result, message} = deleteTagByTagIdResponse;

            // if(!success && !result) {
            //   deletingTagErrorResults.push({
            //     tagId,
            //     message,
            //     result
            //   })
            // }
            // else if(!success && result) {
            //   deletingTagErrorResults.push({
            //     tagId,
            //     message,
            //     result
            //   })
            // }
          }
        }
        // error & null result
      } else if (!tagsSuccess && !tagsResult) {
        return res.status(400).json(
          mapAPIResponseToDBResponse({
            dbResponse: tagsRelatedToPostByPostIdResponse,
          })
        );
      }
      // error & error result
      else if (!tagsSuccess && tagsResult) {
        return res.status(400).json(
          mapAPIResponseToDBResponse({
            dbResponse: tagsRelatedToPostByPostIdResponse,
          })
        );
      }
      // finally deleting post
      // can link future feature  deleteTag / removePost
      // which are commented as of now

      const deletePostByIdResponse = await deletePostById(postId);
      const { success: deletePostSuccess, result: deletePostResult } =
        deletePostByIdResponse;

      // success & result
      if (deletePostSuccess && deletePostResult) {
        return res.status(200).json(
          mapAPIResponseToDBResponse({
            dbResponse: deletePostByIdResponse,
          })
        );
      }
      // error & null result
      else if (deletePostSuccess && deletePostResult) {
        return res.status(400).json(
          mapAPIResponseToDBResponse({
            dbResponse: deletePostByIdResponse,
          })
        );
      }
      // error & error result
      else if (deletePostSuccess && deletePostResult) {
        return res.status(400).json(
          mapAPIResponseToDBResponse({
            dbResponse: deletePostByIdResponse,
          })
        );
      }
    }
    // error & null result
    else if (!findPostSuccess && !findPostResult) {
      return res
        .status(400)
        .json(mapAPIResponseToDBResponse({ dbResponse: findPostByIdResponse }));
    }
    // error & error result
    else if (!findPostSuccess && findPostResult) {
      return res
        .status(400)
        .json(mapAPIResponseToDBResponse({ dbResponse: findPostByIdResponse }));
    }

    // checking postId
    // // if (postId) {
    // //   const post = await findPostById(postId); // find post
    // //   if (post.statusCode == 1 && post.operation == true) {
    // //     const { postType } = post.post;
    // //     const tagsRelatedToPost = await findTagsnPostsRelatedToPostId(postId);
    // //     const { tags } = tagsRelatedToPost;
    // //     // ipo related upcomingipo entries
    // //     // deleting/updating entry
    // //     if (postType == "ipo") {
    // //       const entryRelatedToPost = await findUpcomingIPOEntryByLinkedPostId(
    // //         postId
    // //       );
    // //       const { entry } = entryRelatedToPost;
    // //       const { _id, linkedPostsId, ipoName } = entry;

    // //       if (linkedPostsId.length > 1) {
    // //         await deleteOneLinkedPostId({ id: _id, linkedPostId: postId });
    // //       } else {
    // //         await deleteUpcomingIPOEntryById(_id);
    // //       }
    // //     }
    // //     // deleting/updating tags and deleting post
    // //     for (let tag of tags) {
    // //       const { _id: tagId, posts } = tag;
    // //       // updating tag
    // //       if (posts.length > 1) {
    // //         await removePostRelatedToTag(tagId, postId);
    // //       }
    // //       // deleting tag
    // //       else {
    // //         await deleteTagByTagId(tagId);
    // //       }
    // //     }
    // //     // deleting post
    // //     await deletePostById(postId);
    // //     res.status(201).json({ message: "Post deleted successfully" });
    // //   } else {
    // //     res
    // //       .status(403)
    // //       .json({ message: `Post with ${postId} does not exists.` });
    // //   }
    // } else {
    //   res
    //     .status(401)
    //     .json({ message: "Please provide postId of the post to delete." });
    // }
  } catch (error) {
    // res.status(500).json({ message: "Internal server error.", error });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// get all the posts for search
export async function getAllPosts(_: express.Request, res: express.Response) {
  try {
    // const result = await getAllPostsForSearch();
    // res.status(200).json({ result });

    const getAllPostsForSearchResponse = await getAllPostsForSearch();
    const { success, result } = getAllPostsForSearchResponse;

    // success & result
    if (success && result) {
      return res.status(200).json(
        mapAPIResponseToDBResponse({
          dbResponse: getAllPostsForSearchResponse,
        })
      );
    }
    // error & null result
    else if (!success && !result) {
      return res.status(400).json(
        mapAPIResponseToDBResponse({
          dbResponse: getAllPostsForSearchResponse,
        })
      );
    }
    // error & error result
    else if (!success && result) {
      return res.status(200).json(
        mapAPIResponseToDBResponse({
          dbResponse: getAllPostsForSearchResponse,
        })
      );
    }
  } catch (error) {
    // res.status(500).json({ error, message: "Internal Server Error" });
    return res.status(500).json(createInternalServerErrorResponse(error));
  }
}

// below are deprecated
/* This section deals with upcoming IPO List creation */
// get all ipo entries
// export async function getAllIPOEntries(_: null, res: express.Response) {
//   try {
//     const RESULT = await findAllUpcomingIPOEntries();
//     res.status(200).json({ RESULT });
//   } catch (error) {
//     res.send(500).json({ message: "Internal Server Error.", error });
//   }
// }

// // get ipo entry by name
// export async function getIPOEntryByName(
//   req: express.Request,
//   res: express.Response
// ) {
//   try {
//     const { ipoName }: { ipoName: string } = req.body;
//     if (ipoName) {
//       const RESULT = await findUpcomingIPOEntryByIPOName(ipoName);
//       res.status(200).json({ RESULT });
//     } else {
//       res
//         .status(424)
//         .json({ message: 'Please provide "ipoName" of the entry.' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error.", error });
//   }
// }

// // get ipo entry by id
// export async function getIPOEntryById(
//   req: express.Request,
//   res: express.Response
// ) {
//   try {
//     const { id }: { id: string } = req.body;
//     if (id) {
//       const RESULT = await findUpcomingIPOEntryByID(id);
//       res.status(200).json({ RESULT });
//     } else {
//       res.status(400).json({ message: 'Please provide "id" of the entry.' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error.", error });
//   }
// }

// // create new ipo list entry
// export async function createNewUpcomingIPOListEntry(
//   req: express.Request,
//   res: express.Response
// ) {
//   try {
//     const upcomingIPOListEntry: UPCOMINGIPOLISTTYPES =
//       req.body.upcomingIPOListEntry;
//     if (upcomingIPOListEntry) {
//       const entryExists = await findUpcomingIPOEntryByIPOName(
//         upcomingIPOListEntry.ipoName
//       );
//       if (entryExists.foundEntry === null) {
//         const RESULT = await createNewUpcomingIPO(upcomingIPOListEntry);
//         if (RESULT.operation === "success") {
//           res.status(201).json({
//             message: "Upcoming IPO Entry created",
//             operation: "success",
//             RESULT,
//           });
//         }
//       } else {
//         res.status(409).json({
//           message: `'Entry already exists for ipoName : "${upcomingIPOListEntry.ipoName}".`,
//           operation: "error",
//         });
//       }
//     } else {
//       res.status(400).json({
//         message: `upcomingIPOListEntry not provided check docs for more.`,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ error, message: "Internal Server Error" });
//   }
// }

// // update ipo entry
// // ipo name
// export async function updateUpcomingIPOName(
//   req: express.Request,
//   res: express.Response
// ) {
//   try {
//     const id = req.body.id;
//     const newIPOName = req.body.newIPOName;
//     if (id && newIPOName) {
//       const RESULT = await updateUpcomingIPOEntryIPOName({ id, newIPOName });
//       if (RESULT.operation === "success") {
//         res.status(201).json({
//           message: "Entry updated successfully.",
//           operation: "success",
//           RESULT,
//         });
//       }
//     } else if (!id) {
//       res
//         .status(400)
//         .json({ message: "Please provide id of the entry to update." });
//     } else if (!newIPOName) {
//       res
//         .status(400)
//         .json({ message: "Please provide newIPOName of the entry to update." });
//     } else {
//       res.status(400).json({
//         message: "Please provide id & newIPOName of the entry to update.",
//       });
//     }
//   } catch (error) {
//     return {
//       error,
//       message: "Internal Server Error",
//     };
//   }
// }

// // ipo open field
// export async function updateUpcomingIPOOpen(
//   req: express.Request,
//   res: express.Response
// ) {
//   try {
//     const id = req.body.id;
//     const newOpen = req.body.newOpen;
//     if (id && newOpen) {
//       const RESULT = await updateUpcomingIPOEntryOpen({ id, newOpen });
//       if (RESULT.operation === "success") {
//         res.status(201).json({
//           message: "Entry updated successfully.",
//           operation: "success",
//           RESULT,
//         });
//       }
//     } else if (!id) {
//       res
//         .status(400)
//         .json({ message: "Please provide id of the entry to update." });
//     } else if (!newOpen) {
//       res
//         .status(400)
//         .json({ message: "Please provide newOpen of the entry to update." });
//     } else {
//       res.status(400).json({
//         message: "Please provide id & newOpen of the entry to update.",
//       });
//     }
//   } catch (error) {
//     return {
//       error,
//       message: "Internal Server Error",
//     };
//   }
// }

// //ipo close field
// export async function updateUpcomingIPOClose(
//   req: express.Request,
//   res: express.Response
// ) {
//   try {
//     const id = req.body.id;
//     const newClose = req.body.newClose;
//     if (id && newClose) {
//       const RESULT = await updateUpcomingIPOEntryClose({ id, newClose });
//       if (RESULT.operation === "success") {
//         res.status(201).json({
//           message: "Entry updated successfully.",
//           operation: "success",
//           RESULT,
//         });
//       }
//     } else if (!id) {
//       res
//         .status(400)
//         .json({ message: "Please provide id of the entry to update." });
//     } else if (!newClose) {
//       res
//         .status(400)
//         .json({ message: "Please provide newClose of the entry to update." });
//     } else {
//       res.status(400).json({
//         message: "Please provide id & newClose of the entry to update.",
//       });
//     }
//   } catch (error) {
//     return {
//       error,
//       message: "Internal Server Error",
//     };
//   }
// }

// // linkedPost field
// // add new linked post
// export async function addOneLinkedPost(
//   req: express.Request,
//   res: express.Response
// ) {
//   try {
//     const { id, linkedPostId }: { id: string; linkedPostId: string } = req.body;
//     if (id && linkedPostId) {
//       const updatedEntry = await addOneLinkedPostId({ id, linkedPostId });
//       if (updatedEntry.operation === "success") {
//         res.status(200).json({ updatedEntry });
//       } else if (updatedEntry.operation === "duplicate") {
//         res
//           .status(400)
//           .json({ message: "Duplicate linkedPostId", updatedEntry });
//       }
//     } else if (!id) {
//       res
//         .status(400)
//         .json({ message: 'Please provide "id" of the entry to update.' });
//     } else if (!linkedPostId) {
//       res
//         .status(400)
//         .json({ message: 'Please provide "linkedPostId" to add to entry.' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error", error });
//   }
// }

// // delete
// // delete complete entry
// export async function deleteUpcomingIPOEntry(
//   req: express.Request,
//   res: express.Response
// ) {
//   try {
//     const { ipoName, id } = req.body;
//     if (ipoName) {
//       const deletedEntry = await deleteUpcomingIPOEntryByIPOName(ipoName);
//       if (deletedEntry.deletedEntry) {
//         res.status(200).json({ deletedEntry });
//       } else if (deletedEntry.operation === "error") {
//         res
//           .status(200)
//           .json({ message: "Check deleted entry for error.", deletedEntry });
//       }
//     } else if (id) {
//       const deletedEntry = await deleteUpcomingIPOEntryById(id);
//       if (deletedEntry.operation === "success") {
//         res.status(200).json({ deletedEntry });
//       } else if (deletedEntry.operation === "error") {
//         res
//           .status(200)
//           .json({ message: "Check deleted entry for error.", deletedEntry });
//       }
//     } else {
//       res.status(400).json({
//         message: "Please provide ipoName or id of the entry to delete.",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error", error });
//   }
// }

// // removing one linkedPostId from entry
// export async function removeOneLinkedPost(
//   req: express.Request,
//   res: express.Response
// ) {
//   try {
//     const { id, linkedPostId }: { id: string; linkedPostId: string } = req.body;
//     if (id && linkedPostId) {
//       const updatedEntry = await deleteOneLinkedPostId({ id, linkedPostId });
//       if (updatedEntry.operation === "success") {
//         res.status(200).json({
//           message: "LinkedPostId removed successfully.",
//           updatedEntry,
//         });
//       } else if (updatedEntry.operation === "error") {
//         res.status(400).json({
//           message: "Check error mention in updatedEntry.",
//           updatedEntry,
//         });
//       }
//     } else if (!id) {
//       res.status(400).json({ message: "Please provide id of the entry." });
//     } else if (!linkedPostId) {
//       res
//         .status(400)
//         .json({ message: "Please provide linkedPostId to remove from entry." });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error." });
//   }
// }
