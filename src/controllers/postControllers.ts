import { createTag, findTag, updateTagByPostID } from "../db/models/tagModels";
import { createPost } from "../db/models/postModels";
import express from "express";
import { POST, UPCOMINGIPOLISTTYPES } from "types/@types";
import {
  addOneLinkedPostId,
  createNewUpcomingIPO,
  deleteOneLinkedPostId,
  deleteUpcomingIPOEntryByIPOName,
  deleteUpcomingIPOEntryById,
  findAllUpcomingIPOEntries,
  findUpcomingIPOEntryByID,
  findUpcomingIPOEntryByIPOName,
  updateUpcomingIPOEntryClose,
  updateUpcomingIPOEntryIPOName,
  updateUpcomingIPOEntryOpen,
} from "../db/models/upcomingIPOModels";
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

/* This section deals with upcoming IPO List creation */
// todo
// get all ipo entries
export async function getAllIPOEntries(_: null, res: express.Response) {
  try {
    const RESULT = await findAllUpcomingIPOEntries();
    res.status(200).json({ RESULT });
  } catch (error) {
    res.send(500).json({ message: "Internal Server Error.", error });
  }
}

// get ipo entry by name
export async function getIPOEntryByName(
  req: express.Request,
  res: express.Response
) {
  try {
    const { ipoName }: { ipoName: string } = req.body;
    if (ipoName) {
      const RESULT = await findUpcomingIPOEntryByIPOName(ipoName);
      res.status(200).json({ RESULT });
    } else {
      res
        .status(400)
        .json({ message: 'Please provide "ipoName" of the entry.' });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error.", error });
  }
}

// get ipo entry by id
export async function getIPOEntryById(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id }: { id: string } = req.body;
    if (id) {
      const RESULT = await findUpcomingIPOEntryByID(id);
      res.status(200).json({ RESULT });
    } else {
      res.status(400).json({ message: 'Please provide "id" of the entry.' });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error.", error });
  }
}

// create new ipo list entry
export async function createNewUpcomingIPOListEntry(
  req: express.Request,
  res: express.Response
) {
  try {
    const upcomingIPOListEntry: UPCOMINGIPOLISTTYPES =
      req.body.upcomingIPOListEntry;
    if (upcomingIPOListEntry) {
      const entryExists = await findUpcomingIPOEntryByIPOName(
        upcomingIPOListEntry.ipoName
      );
      if (entryExists.foundEntry === null) {
        const RESULT = await createNewUpcomingIPO(upcomingIPOListEntry);
        if (RESULT.operation === "success") {
          res.status(201).json({
            message: "Upcoming IPO Entry created",
            operation: "success",
            RESULT,
          });
        }
      } else {
        res.status(409).json({
          message: `'Entry already exists for ipoName : "${upcomingIPOListEntry.ipoName}".`,
          operation: "error",
        });
      }
    } else {
      res.status(400).json({
        message: `upcomingIPOListEntry not provided check docs for more.`,
      });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Internal Server Error" });
  }
}

// update ipo entry
// ipo name
export async function updateUpcomingIPOName(
  req: express.Request,
  res: express.Response
) {
  try {
    const id = req.body.id;
    const newIPOName = req.body.newIPOName;
    if (id && newIPOName) {
      const RESULT = await updateUpcomingIPOEntryIPOName({ id, newIPOName });
      if (RESULT.operation === "success") {
        res.status(201).json({
          message: "Entry updated successfully.",
          operation: "success",
          RESULT,
        });
      }
    } else if (!id) {
      res
        .status(400)
        .json({ message: "Please provide id of the entry to update." });
    } else if (!newIPOName) {
      res
        .status(400)
        .json({ message: "Please provide newIPOName of the entry to update." });
    } else {
      res.status(400).json({
        message: "Please provide id & newIPOName of the entry to update.",
      });
    }
  } catch (error) {
    return {
      error,
      message: "Internal Server Error",
    };
  }
}

// ipo open field
export async function updateUpcomingIPOOpen(
  req: express.Request,
  res: express.Response
) {
  try {
    const id = req.body.id;
    const newOpen = req.body.newOpen;
    if (id && newOpen) {
      const RESULT = await updateUpcomingIPOEntryOpen({ id, newOpen });
      if (RESULT.operation === "success") {
        res.status(201).json({
          message: "Entry updated successfully.",
          operation: "success",
          RESULT,
        });
      }
    } else if (!id) {
      res
        .status(400)
        .json({ message: "Please provide id of the entry to update." });
    } else if (!newOpen) {
      res
        .status(400)
        .json({ message: "Please provide newOpen of the entry to update." });
    } else {
      res.status(400).json({
        message: "Please provide id & newOpen of the entry to update.",
      });
    }
  } catch (error) {
    return {
      error,
      message: "Internal Server Error",
    };
  }
}

//ipo close field
export async function updateUpcomingIPOClose(
  req: express.Request,
  res: express.Response
) {
  try {
    const id = req.body.id;
    const newClose = req.body.newClose;
    if (id && newClose) {
      const RESULT = await updateUpcomingIPOEntryClose({ id, newClose });
      if (RESULT.operation === "success") {
        res.status(201).json({
          message: "Entry updated successfully.",
          operation: "success",
          RESULT,
        });
      }
    } else if (!id) {
      res
        .status(400)
        .json({ message: "Please provide id of the entry to update." });
    } else if (!newClose) {
      res
        .status(400)
        .json({ message: "Please provide newClose of the entry to update." });
    } else {
      res.status(400).json({
        message: "Please provide id & newClose of the entry to update.",
      });
    }
  } catch (error) {
    return {
      error,
      message: "Internal Server Error",
    };
  }
}

// linkedPost field
// add new linked post
export async function addOneLinkedPost(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id, linkedPostId }: { id: string; linkedPostId: string } = req.body;
    if (id && linkedPostId) {
      const updatedEntry = await addOneLinkedPostId({ id, linkedPostId });
      if (updatedEntry.operation === "success") {
        res.status(200).json({ updatedEntry });
      } else if (updatedEntry.operation === "duplicate") {
        res
          .status(400)
          .json({ message: "Duplicate linkedPostId", updatedEntry });
      }
    } else if (!id) {
      res
        .status(400)
        .json({ message: 'Please provide "id" of the entry to update.' });
    } else if (!linkedPostId) {
      res
        .status(400)
        .json({ message: 'Please provide "linkedPostId" to add to entry.' });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

// delete
// delete complete entry
export async function deleteUpcomingIPOEntry(
  req: express.Request,
  res: express.Response
) {
  try {
    const { ipoName, id } = req.body;
    if (ipoName) {
      const deletedEntry = await deleteUpcomingIPOEntryByIPOName(ipoName);
      if (deletedEntry.deletedEntry) {
        res.status(200).json({ deletedEntry });
      } else if (deletedEntry.operation === "error") {
        res
          .status(200)
          .json({ message: "Check deleted entry for error.", deletedEntry });
      }
    } else if (id) {
      const deletedEntry = await deleteUpcomingIPOEntryById(id);
      if (deletedEntry.operation === "success") {
        res.status(200).json({ deletedEntry });
      } else if (deletedEntry.operation === "error") {
        res
          .status(200)
          .json({ message: "Check deleted entry for error.", deletedEntry });
      }
    } else {
      res.status(400).json({
        message: "Please provide ipoName or id of the entry to delete.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

// removing one linkedPostId from entry
export async function removeOneLinkedPost(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id, linkedPostId }: { id: string; linkedPostId: string } = req.body;
    if (id && linkedPostId) {
      const updatedEntry = await deleteOneLinkedPostId({ id, linkedPostId });
      if (updatedEntry.operation === "success") {
        res.status(200).json({
          message: "LinkedPostId removed successfully.",
          updatedEntry,
        });
      } else if (updatedEntry.operation === "error") {
        res.status(400).json({
          message: "Check error mention in updatedEntry.",
          updatedEntry,
        });
      }
    } else if (!id) {
      res.status(400).json({ message: "Please provide id of the entry." });
    } else if (!linkedPostId) {
      res
        .status(400)
        .json({ message: "Please provide linkedPostId to remove from entry." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
}
