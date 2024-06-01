import { UPCOMINGIPOLISTTYPES } from "types/@types";
import { UpcomingIPOModel } from "../Schema";
import { checkForDuplicate } from "../../tools";

// create new ipo
export async function createNewUpcomingIPO({
  ipoName,
  open,
  close,
  linkedPostsId,
}: UPCOMINGIPOLISTTYPES) {
  try {
    const NewIPOList = await UpcomingIPOModel.create({
      ipoName,
      open,
      close,
      linkedPostsId,
    });
    return {
      message: "New Upcoming IPO List created.",
      operation: "success",
      NewIPOList,
    };
  } catch (error) {
    return {
      message: "Error creating New Upcoming IPO List.",
      operation: "error",
      error,
    };
  }
}

// find entry

// find all ipo entries
export async function findAllUpcomingIPOEntries() {
  try {
    const ALL_ENTRIES = await UpcomingIPOModel.find();
    if (ALL_ENTRIES.length > 0) {
      return {
        message: "All entries fetched.",
        operation: true,
        ALL_ENTRIES,
        statusCode: 1,
      };
    } else {
      return {
        message: "Create entries first.",
        operation: true,
        ALL_ENTRIES,
        statusCode: 0,
      };
    }
  } catch (error) {
    return {
      message: "Unable to get IPO Entries.",
      operation: false,
      error,
      statusCode: 0,
    };
  }
}

// by IPO name
export async function findUpcomingIPOEntryByIPOName(ipoName: string) {
  try {
    const foundEntry = await UpcomingIPOModel.findOne({ ipoName });
    if (foundEntry !== null) {
      return {
        message: "Found IPO entry.",
        operation: true,
        statusCode: 1,
        foundEntry,
      };
    } else if (foundEntry == null) {
      return {
        message: `Entry with ipoName : ${ipoName} doesn't exists.`,
        operation: true,
        foundEntry,
        statusCode: 0,
      };
    }
  } catch (error) {
    return {
      error,
      message: "Error while finding entry.",
      operation: false,
      statusCode: 0,
    };
  }
}
// by id
export async function findUpcomingIPOEntryByID(id: string) {
  try {
    const foundEntry = await UpcomingIPOModel.findById(id);
    if (foundEntry) {
      return {
        message: `Entry found with id : ${id}`,
        operation: true,
        foundEntry,
        statusCode: 1,
      };
    } else {
      return {
        message: `Entry with id : ${id} doesn't exist.`,
        operation: true,
        foundEntry,
        statusCode: 0,
      };
    }
  } catch (error) {
    return {
      error,
      message: "Error finding IPO entry by id.",
      operation: false,
      statusCode: 0,
    };
  }
}

// by linked Posts id
export async function findUpcomingIPOEntryByLinkedPostId(linkedPostId: string) {
  try {
    const entry = await UpcomingIPOModel.findOne({
      linkedPostsId: linkedPostId,
    });

    // if(entry.length )
    return {
      entry,
      message: "Found entry linked to post.",
      operation: true,
      statusCode: 1,
    };
  } catch (error) {
    return {
      error,
      message: "Error finding linked entry.",
      operation: false,
      statusCode: 0,
    };
  }
}

// updating ipo entry

// updating ipoName
export async function updateUpcomingIPOEntryIPOName({
  id,
  newIPOName,
}: {
  id: string;
  newIPOName: string;
}) {
  try {
    const updatedEntry = await UpcomingIPOModel.findByIdAndUpdate(
      id,
      {
        ipoName: newIPOName,
      },
      { new: true }
    );
    return {
      message: `IPO Name of Entry with id : ${id} updated.`,
      operation: "success",
      updatedEntry,
    };
  } catch (error) {
    return {
      error,
      message: "Error while updating Entry IPO Name",
      operation: "error",
    };
  }
}

// updating ipo open field
export async function updateUpcomingIPOEntryOpen({
  id,
  newOpen,
}: {
  id: string;
  newOpen: string;
}) {
  try {
    const updatedEntry = await UpcomingIPOModel.findByIdAndUpdate(
      id,
      {
        open: newOpen,
      },
      { new: true }
    );
    return {
      message: `Open field of Entry with id : ${id} updated.`,
      operation: "success",
      updatedEntry,
    };
  } catch (error) {
    return {
      error,
      message: "Error while updating Entry Open field.",
      operation: "error",
    };
  }
}

// updating ipo close field
export async function updateUpcomingIPOEntryClose({
  id,
  newClose,
}: {
  id: string;
  newClose: string;
}) {
  try {
    const updatedEntry = await UpcomingIPOModel.findByIdAndUpdate(
      id,
      {
        close: newClose,
      },
      { new: true }
    );
    return {
      message: `Close field of Entry with id : ${id} updated.`,
      operation: "success",
      updatedEntry,
    };
  } catch (error) {
    return {
      error,
      message: "Error while updating Entry Close field.",
      operation: "error",
    };
  }
}

// updating ipo linked posts
export async function addOneLinkedPostId({
  id,
  linkedPostId,
}: {
  id: string;
  linkedPostId: string;
}) {
  try {
    const getEntry = await findUpcomingIPOEntryByID(id);
    if (getEntry.foundEntry !== null) {
      const entry = getEntry.foundEntry;
      const linkedPostIdArr: string[] = entry.linkedPostsId;
      let linkedPostIdExists = await checkForDuplicate(
        linkedPostId,
        linkedPostIdArr
      );

      // checking if linkedpostId already exists
      // for (var i = 0; i < linkedPostIdArr.length; i++) {
      //   if (linkedPostIdArr[i] === linkedPostId) {
      //     linkedPostIdExists = true;
      //   }
      // }

      if (!linkedPostIdExists) {
        linkedPostIdArr[linkedPostIdArr.length] = linkedPostId;
        const updatedEntry = await UpcomingIPOModel.findByIdAndUpdate(
          id,
          { linkedPostsId: linkedPostIdArr },
          { new: true }
        );
        return {
          message: `Entry updated successfully.`,
          operation: "success",
          updatedEntry,
        };
      } else {
        return {
          message: `LinkedPostId : ${linkedPostId} already exists.`,
          operation: "duplicate",
          entry,
        };
      }
    }
  } catch (error) {
    return {
      error,
      message: `Unable to add LinkedPost to entry with id ${id}`,
      operation: "error",
    };
  }
}

// deleting an upcoming ipo entry
// delete by ipo name
export async function deleteUpcomingIPOEntryByIPOName(ipoName: string) {
  try {
    const deletedEntry = await UpcomingIPOModel.findOneAndDelete({ ipoName });
    if (deletedEntry !== null) {
      return {
        message: "IPO entry deleted successfully.",
        operation: "success",
        deletedEntry,
      };
    } else {
      return {
        message: `Entry with IPOName : "${ipoName}" doesn't exists.`,
        operation: "error",
        deletedEntry,
      };
    }
  } catch (error) {
    return {
      error,
      message: "Error while deleting entry by ipoName.",
      operation: "error",
    };
  }
}

// delete ipo entry by id
export async function deleteUpcomingIPOEntryById(id: string) {
  try {
    const deletedEntry = await UpcomingIPOModel.findByIdAndDelete(id);
    if (deletedEntry) {
      return {
        message: "IPO entry deleted successfully.",
        operation: "success",
        deletedEntry,
      };
    } else {
      return {
        message: `IPO entry with ${id} doesn't exists.`,
        operation: "success",
        deletedEntry,
      };
    }
  } catch (error) {
    return {
      error,
      message: `Error while deleting entry with id ${id}.`,
      operation: "error",
    };
  }
}

// deleting a linkedpostId from linkedpostsID
export async function deleteOneLinkedPostId({
  id,
  linkedPostId,
}: {
  id: string;
  linkedPostId: string;
}) {
  try {
    const getEntry = await findUpcomingIPOEntryByID(id);
    if (getEntry.foundEntry !== null) {
      const entry = getEntry.foundEntry;
      const linkedPostsIdArr: string[] = entry.linkedPostsId;
      // checking if linkedpostId to delete exists
      const linkedPostExist: boolean = await checkForDuplicate(
        linkedPostId,
        linkedPostsIdArr
      );

      if (linkedPostExist) {
        const newLinkedPostIdArr: string[] | [] = [];
        // creating new array
        for (var i = 0; i < linkedPostsIdArr.length; i++) {
          if (linkedPostsIdArr[i] !== linkedPostId) {
            newLinkedPostIdArr[newLinkedPostIdArr.length] = linkedPostsIdArr[i];
          }
        }

        const updatedEntry = await UpcomingIPOModel.findByIdAndUpdate(
          id,
          { linkedPostsId: newLinkedPostIdArr },
          { new: true }
        );

        return {
          message: "LinkedPostId deleted successfully.",
          operation: "success",
          updatedEntry,
        };
      } else {
        return {
          message: "LinkedPostId doesn't exists.",
          operation: "error",
          entry,
        };
      }
    }
  } catch (error) {
    return {
      error,
      operation: "error",
      message: "Error while deleting linkedPost Id",
    };
  }
}
