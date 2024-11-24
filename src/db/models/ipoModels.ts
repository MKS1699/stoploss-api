import { IPOTYPES } from "types/@types";
import { IPOModel } from "../Schema";
import { checkForDuplicate } from "../../tools";

// create new ipo
export async function createNewIPO({
  name,
  category,
  dates,
  exPremium,
  linkedPostsId,
  logo,
  lotSize,
  offerPrice,
  status,
  subscription,
  ipoPhase,
  allotmentLink,
  allotmentStatus,
  createdBy,
}: IPOTYPES) {
  try {
    const newIPO: IPOTYPES = await IPOModel.create({
      name,
      category,
      dates,
      exPremium,
      linkedPostsId,
      logo,
      lotSize,
      offerPrice,
      status,
      subscription,
      ipoPhase,
      allotmentLink,
      allotmentStatus,
      createdBy,
    });
    return {
      message: "New IPO created.",
      operation: "success",
      newIPO,
    };
  } catch (error) {
    return {
      message: "Error creating New IPO.",
      operation: "error",
      error,
    };
  }
}

// find ipo
// by id
export async function findIPObyId(id: string) {
  try {
    const ipo = await IPOModel.findById(id);
    if (ipo !== null) {
      return {
        message: "IPO found.",
        operation: "success",
        ipo,
      };
    } else {
      return {
        message: `IPO with ${id} does not exist.`,
        operation: "fail",
        ipo,
      };
    }
  } catch (error) {
    return {
      message: "Error finding IPO by Id.",
      operation: "error",
      error,
    };
  }
}
// by name
export async function findIPObyName(name: string) {
  try {
    const ipo = await IPOModel.findOne({ name: name });
    if (ipo !== null) {
      return {
        message: "IPO found.",
        operation: "success",
        ipo,
      };
    } else {
      return {
        message: `IPO with ${name} does not exist.`,
        operation: "fail",
        ipo,
      };
    }
  } catch (error) {
    return {
      message: "Error finding IPO by Name.",
      operation: "error",
      error,
    };
  }
}

// by created user
// user name
export async function getIPOByUserName(userName: string) {
  try {
    const ipo = await IPOModel.find({
      "createdBy.userName": userName,
    });
    if (ipo.length > 0) {
      return {
        message: "IPO found.",
        operation: "success",
        ipo,
      };
    } else {
      return {
        message: `IPO create by user : ${userName} does not exist.`,
        operation: "fail",
        ipo,
      };
    }
  } catch (error) {
    return {
      message: `Error finding IPO created by user : ${userName}`,
      operation: "error",
      error,
    };
  }
}

// by user Id
export async function getIPOByUserId(userId: string) {
  try {
    const ipo = await IPOModel.find({
      "createdBy.userId": userId,
    });
    if (ipo.length > 0) {
      return {
        message: "IPO found.",
        operation: "success",
        ipo,
      };
    } else {
      return {
        message: `IPO created by user with id : ${userId} does not exist.`,
        operation: "fail",
        ipo,
      };
    }
  } catch (error) {
    return {
      message: `Error finding IPO created by user with id : ${userId}`,
      operation: "error",
      error,
    };
  }
}

// update
// byId
export async function findIPOAndUpdate({
  id,
  ipoUpdate,
}: {
  id: string;
  ipoUpdate: IPOTYPES;
}) {
  try {
    const updatedIPO = await IPOModel.findByIdAndUpdate(id, ipoUpdate, {
      new: true,
    });
    if (updatedIPO !== null) {
      return {
        message: "IPO found and updated.",
        operation: "success",
        updatedIPO,
      };
    } else {
      return {
        message: `IPO with ${id} not found.`,
        operation: "fail",
        updatedIPO,
      };
    }
  } catch (error) {
    return {
      message: "Error finding IPO by Name.",
      operation: "error",
      error,
    };
  }
}

// add a postId to linkedPostsId of a ipo
export async function addPostIdToIPOByIPOId(postId: string, ipoId: string) {
  try {
    const IPO: IPOTYPES = await IPOModel.findById(ipoId);
    if (IPO !== null) {
      const linkedPostsId: IPOTYPES["linkedPostsId"] = IPO.linkedPostsId;

      const postExistInIPO = await checkForDuplicate(postId, linkedPostsId);
      if (!postExistInIPO) {
        linkedPostsId.push(postId);
        const updatedIPO = await IPOModel.findByIdAndUpdate(
          ipoId,
          { linkedPostsId },
          { new: true }
        );
        return {
          message: "Post Id added successfully to IPO.",
          operation: "success",
          updatedIPO,
        };
      } else {
        return {
          message: "Post already linked with IPO.",
          operation: "duplicate",
          IPO,
        };
      }
    } else {
      return {
        message: `IPO with ${ipoId} doesn't exist.`,
        operation: "fail",
        IPO,
      };
    }
  } catch (error) {
    return {
      message: "Error while adding postId to IPO.",
      operation: "error",
      error,
    };
  }
}

// delete a postId to linkedPostsId of a ipo
export async function removePostIdFromIPOByIPOId(
  postId: string,
  ipoId: string
) {
  try {
    const IPO: IPOTYPES = await IPOModel.findById(ipoId);
    if (IPO !== null) {
      const linkedPostsId: IPOTYPES["linkedPostsId"] = IPO.linkedPostsId;
      const postExistInIPO = await checkForDuplicate(postId, linkedPostsId);
      if (postExistInIPO) {
        const postIdIndex = linkedPostsId.indexOf(postId);
        linkedPostsId.splice(postIdIndex, 1);
        const updatedIPO = await IPOModel.findByIdAndUpdate(
          ipoId,
          { linkedPostsId },
          { new: true }
        );
        return {
          message: "Post Id removed successfully from IPO.",
          operation: "success",
          updatedIPO,
        };
      } else {
        return {
          message: "PostId is not linked with IPO.",
          operation: null,
          IPO,
        };
      }
    } else {
      return {
        message: `IPO with ${ipoId} doesn't exist.`,
        operation: "fail",
        IPO,
      };
    }
  } catch (error) {
    return {
      message: "Error while deleting postId from IPO.",
      operation: "error",
      error,
    };
  }
}

// delete ipo by id and name
export async function deleteIPOById(id: string) {
  try {
    const deletedIPO = await IPOModel.findByIdAndDelete(id);
    if (deletedIPO !== null) {
      return {
        message: "IPO deleted successfully.",
        operation: "success",
        deletedIPO,
      };
    } else {
      return {
        message: `IPO does not exists with id : ${id} .`,
        operation: "fail",
        deletedIPO,
      };
    }
  } catch (error) {
    return {
      message: "Error while deleting IPO.",
      operation: "error",
      error,
    };
  }
}

//get all the IPO in one go
export async function findAllIPO() {
  try {
    const ALL_IPO = await IPOModel.find();
    if (ALL_IPO.length > 0) {
      return {
        message: "All IPO fetched successfully.",
        operation: "success",
        ALL_IPO,
      };
    } else {
      return {
        message: "No IPO stored in the DB.",
        operation: "fail",
        ALL_IPO,
      };
    }
  } catch (error) {
    return {
      message: "Error while getting all the IPO.",
      operation: "error",
      error,
    };
  }
}
