import { IPOTYPES } from "types/@types";
import { IPOModel } from "../Schema";
import { checkForDuplicate } from "../../tools";
import {
  DATABASE_CODE_ENUM,
  DATABASE_RESPONSE_RESULT,
  DATABASE_RESPONSES_DETAILS,
  DBResponseMessage,
} from "tools/databaseResponseCodes";

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
}: IPOTYPES): Promise<DATABASE_RESPONSE_RESULT<any>> {
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
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_IPO_CARDS_CREATE_SUCCESS
      ),
      responseCode: DATABASE_CODE_ENUM.DB_IPO_CARDS_CREATE_SUCCESS,
      result: newIPO,
      success: true,
    };
  } catch (error) {
    return {
      message: DBResponseMessage(DATABASE_CODE_ENUM.DB_IPO_CARDS_CREATE_ERROR),
      responseCode: DATABASE_CODE_ENUM.DB_IPO_CARDS_CREATE_ERROR,
      result: error,
      success: false,
    };
  }
}

// find ipo
// by id
export async function findIPObyId(
  id: string
): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const ipo = await IPOModel.findById(id);
    if (ipo !== null) {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_ID_SUCCESS
        ),
        responseCode: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_ID_SUCCESS,
        result: ipo,
        success: true,
      };
    } else {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_ID_ERROR
        ),
        responseCode: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_ID_ERROR,
        result: null,
        success: false,
      };
    }
  } catch (error) {
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_ID_QUERY_ERROR
      ),
      responseCode: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_ID_QUERY_ERROR,
      result: error,
      success: false,
    };
  }
}
// by name
export async function findIPObyName(
  name: string
): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const ipo = await IPOModel.findOne({ name: name });
    if (ipo !== null) {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_NAME_SUCCESS
        ),
        responseCode: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_NAME_SUCCESS,
        result: ipo,
        success: true,
      };
    } else {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_NAME_ERROR
        ),
        responseCode: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_NAME_ERROR,
        result: null,
        success: false,
      };
    }
  } catch (error) {
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_NAME_QUERY_ERROR
      ),
      responseCode:
        DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_NAME_QUERY_ERROR,
      result: error,
      success: false,
    };
  }
}

// by created user
// user name
export async function getIPOByUserName(
  userName: string
): Promise<DATABASE_RESPONSE_RESULT<any[]>> {
  try {
    const ipo = await IPOModel.find({
      "createdBy.userName": userName,
    });
    if (ipo.length > 0) {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_SUCCESS
        ),
        responseCode:
          DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_SUCCESS,
        result: ipo,
        success: true,
      };
    } else {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_ERROR
        ),
        responseCode:
          DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_ERROR,
        result: null,
        success: false,
      };
    }
  } catch (error) {
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_QUERY_ERROR
      ),
      responseCode:
        DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_QUERY_ERROR,
      result: error,
      success: false,
    };
  }
}

// by user Id
export async function getIPOByUserId(
  userId: string
): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const ipo = await IPOModel.find({
      "createdBy.userId": userId,
    });
    if (ipo.length > 0) {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_SUCCESS
        ),
        responseCode:
          DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_SUCCESS,
        result: ipo,
        success: true,
      };
    } else {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_ERROR
        ),
        responseCode:
          DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_ERROR,
        result: null,
        success: false,
      };
    }
  } catch (error) {
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_QUERY_ERROR
      ),
      responseCode:
        DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_QUERY_ERROR,
      result: error,
      success: false,
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
}): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const updatedIPO = await IPOModel.findByIdAndUpdate(id, ipoUpdate, {
      new: true,
    });
    if (updatedIPO !== null) {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_SUCCESS
        ),
        responseCode: DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_SUCCESS,
        result: updatedIPO,
        success: true,
      };
    } else {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_ERROR
        ),
        responseCode: DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_ERROR,
        result: null,
        success: false,
      };
    }
  } catch (error) {
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_QUERY_ERROR
      ),
      responseCode: DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_QUERY_ERROR,
      result: error,
      success: false,
    };
  }
}

// add a postId to linkedPostsId of a ipo
export async function addPostIdToIPOByIPOId(
  postId: string,
  ipoId: string
): Promise<DATABASE_RESPONSE_RESULT<any>> {
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
          message: DBResponseMessage(
            DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_SUCCESS
          ),
          responseCode:
            DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_SUCCESS,
          result: updatedIPO,
          success: true,
        };
      } else {
        return {
          message: DBResponseMessage(
            DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_DUPLICATE_ERROR
          ),
          responseCode:
            DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_DUPLICATE_ERROR,
          result: null,
          success: false,
        };
      }
    } else {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_ERROR
        ),
        responseCode:
          DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_ERROR,
        result: null,
        success: false,
      };
    }
  } catch (error) {
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_QUERY_ERROR
      ),
      responseCode:
        DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_QUERY_ERROR,
      result: error,
      success: false,
    };
  }
}

// delete a postId to linkedPostsId of a ipo
export async function removePostIdFromIPOByIPOId(
  postId: string,
  ipoId: string
): Promise<DATABASE_RESPONSE_RESULT<any>> {
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
          message: DBResponseMessage(
            DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_SUCCESS
          ),
          responseCode:
            DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_SUCCESS,
          result: updatedIPO,
          success: true,
        };
      } else {
        return {
          message: DBResponseMessage(
            DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_MISSING_ERROR
          ),
          responseCode:
            DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_MISSING_ERROR,
          result: null,
          success: false,
        };
      }
    } else {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_ERROR
        ),
        responseCode:
          DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_ERROR,
        result: null,
        success: false,
      };
    }
  } catch (error) {
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_QUERY_ERROR
      ),
      responseCode:
        DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_QUERY_ERROR,
      result: null,
      success: false,
    };
  }
}

// delete ipo by id and name
export async function deleteIPOById(
  id: string
): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const deletedIPO = await IPOModel.findByIdAndDelete(id);
    if (deletedIPO !== null) {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_IPO_CARDS_DELETE_BY_IPO_ID_SUCCESS
        ),
        responseCode: DATABASE_CODE_ENUM.DB_IPO_CARDS_DELETE_BY_IPO_ID_SUCCESS,
        result: deletedIPO,
        success: true,
      };
    } else {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_IPO_CARDS_DELETE_BY_IPO_ID_ERROR
        ),
        responseCode: DATABASE_CODE_ENUM.DB_IPO_CARDS_DELETE_BY_IPO_ID_ERROR,
        result: null,
        success: false,
      };
    }
  } catch (error) {
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_IPO_CARDS_DELETE_BY_IPO_ID_QUERY_ERROR
      ),
      responseCode:
        DATABASE_CODE_ENUM.DB_IPO_CARDS_DELETE_BY_IPO_ID_QUERY_ERROR,
      result: null,
      success: false,
    };
  }
}

//get all the IPO in one go
export async function findAllIPO(): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const ALL_IPO = await IPOModel.find();
    if (ALL_IPO.length > 0) {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_ALL_SUCCESS
        ),
        responseCode: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_ALL_SUCCESS,
        result: ALL_IPO,
        success: true,
      };
    } else {
      return {
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_ALL_ERROR
        ),
        responseCode: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_ALL_ERROR,
        result: null,
        success: false,
      };
    }
  } catch (error) {
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_ALL_QUERY_ERROR
      ),
      responseCode: DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_ALL_QUERY_ERROR,
      result: null,
      success: false,
    };
  }
}
