import { IPOTYPES } from "types/@types";
import { IPOModel } from "../Schema";
import { checkForDuplicate } from "../../tools";
import {
  DATABASE_CODE_ENUM,
  DATABASE_RESPONSE,
  DATABASE_RESPONSES_DETAILS,
  DBResponseMessage,
} from "tools/databaseResponseCodes";
import { IIPODocument } from "db/Schema/ipoSchema";
import { createDBResponseFromCode } from "tools/dbResponse";

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
}: IPOTYPES): Promise<DATABASE_RESPONSE<IIPODocument>> {
  try {
    const newIPO: IIPODocument = await IPOModel.create({
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
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_IPO_CARDS_CREATE_SUCCESS,
      result: newIPO,
    });
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_IPO_CARDS_CREATE_ERROR,
      result: error,
    });
  }
}

// find ipo

// by id
export async function findIPObyId(
  id: string
): Promise<DATABASE_RESPONSE<IIPODocument>> {
  try {
    const ipo: IIPODocument = await IPOModel.findById(id);
    if (ipo !== null) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_ID_SUCCESS,
        result: ipo,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_ID_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_ID_QUERY_ERROR,
      result: error,
    });
  }
}

// by name
export async function findIPObyName(
  name: string
): Promise<DATABASE_RESPONSE<IIPODocument>> {
  try {
    const ipo: IIPODocument = await IPOModel.findOne({ name: name });
    if (ipo !== null) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_NAME_SUCCESS,
        result: ipo,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_NAME_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_NAME_QUERY_ERROR,
      result: error,
    });
  }
}

// by created user

// user name
export async function getIPOByUserName(
  userName: string
): Promise<DATABASE_RESPONSE<IIPODocument[]>> {
  try {
    const ipo: IIPODocument[] = await IPOModel.find({
      "createdBy.userName": userName,
    });
    if (ipo.length > 0) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_SUCCESS,
        result: ipo,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_QUERY_ERROR,
      result: error,
    });
  }
}

// by user Id
export async function getIPOByUserId(
  userId: string
): Promise<DATABASE_RESPONSE<IIPODocument[]>> {
  try {
    const ipo: IIPODocument[] = await IPOModel.find({
      "createdBy.userId": userId,
    });
    if (ipo.length > 0) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_SUCCESS,
        result: ipo,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_QUERY_ERROR,
      result: error,
    });
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
}): Promise<DATABASE_RESPONSE<IIPODocument>> {
  try {
    const updatedIPO: IIPODocument = await IPOModel.findByIdAndUpdate(
      id,
      ipoUpdate,
      {
        new: true,
      }
    );
    if (updatedIPO !== null) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_SUCCESS,
        result: updatedIPO,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_QUERY_ERROR,
      result: error,
    });
  }
}

// add a postId to linkedPostsId of a ipo
export async function addPostIdToIPOByIPOId(
  postId: string,
  ipoId: string
): Promise<DATABASE_RESPONSE<IIPODocument>> {
  try {
    const IPO: IIPODocument = await IPOModel.findById(ipoId);
    if (IPO !== null) {
      const linkedPostsId: IIPODocument["linkedPostsId"] = IPO.linkedPostsId;

      const postExistInIPO: boolean = await checkForDuplicate(
        postId,
        linkedPostsId
      );

      if (!postExistInIPO) {
        linkedPostsId.push(postId);
        const updatedIPO: IIPODocument = await IPOModel.findByIdAndUpdate(
          ipoId,
          { linkedPostsId },
          { new: true }
        );
        return createDBResponseFromCode({
          code: DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_SUCCESS,
          result: updatedIPO,
        });
      } else {
        return createDBResponseFromCode({
          code: DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_DUPLICATE_ERROR,
          result: null,
        });
      }
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_QUERY_ERROR,
      result: error,
    });
  }
}

// delete a postId to linkedPostsId of a ipo
export async function removePostIdFromIPOByIPOId(
  postId: string,
  ipoId: string
): Promise<DATABASE_RESPONSE<IIPODocument>> {
  try {
    const IPO: IIPODocument = await IPOModel.findById(ipoId);
    if (IPO !== null) {
      const linkedPostsId: IIPODocument["linkedPostsId"] = IPO.linkedPostsId;
      const postExistInIPO: boolean = await checkForDuplicate(
        postId,
        linkedPostsId
      );
      if (postExistInIPO) {
        const postIdIndex = linkedPostsId.indexOf(postId);
        linkedPostsId.splice(postIdIndex, 1);
        const updatedIPO: IIPODocument = await IPOModel.findByIdAndUpdate(
          ipoId,
          { linkedPostsId },
          { new: true }
        );
        return createDBResponseFromCode({
          code: DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_SUCCESS,
          result: updatedIPO,
        });
      } else {
        return createDBResponseFromCode({
          code: DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_MISSING_ERROR,
          result: null,
        });
      }
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_QUERY_ERROR,
      result: error,
    });
  }
}

// delete ipo by id and name
export async function deleteIPOById(
  id: string
): Promise<DATABASE_RESPONSE<IIPODocument>> {
  try {
    const deletedIPO: IIPODocument = await IPOModel.findByIdAndDelete(id);
    if (deletedIPO !== null) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_IPO_CARDS_DELETE_BY_IPO_ID_SUCCESS,
        result: deletedIPO,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_IPO_CARDS_DELETE_BY_IPO_ID_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_IPO_CARDS_DELETE_BY_IPO_ID_QUERY_ERROR,
      result: error,
    });
  }
}

//get all the IPO in one go
export async function findAllIPO(): Promise<DATABASE_RESPONSE<IIPODocument[]>> {
  try {
    const ALL_IPO: IIPODocument[] = await IPOModel.find();
    if (ALL_IPO.length > 0) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_ALL_SUCCESS,
        result: ALL_IPO,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_ALL_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_ALL_QUERY_ERROR,
      result: error,
    });
  }
}
