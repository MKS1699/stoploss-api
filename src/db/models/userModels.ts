// todo : remove dead comments aks previous old responses

import {
  DATABASE_CODE_ENUM,
  DATABASE_RESPONSE_RESULT,
  DBResponseMessage,
} from "tools/databaseResponseCodes";
import { UserModel } from "../Schema";

// function for getting total number of users in the user collection
export async function totalUsers(): Promise<DATABASE_RESPONSE_RESULT<number>> {
  try {
    const users = await UserModel.countDocuments();
    return {
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_USERS_TOTAL_COUNT_SUCCESS
      ),
      responseCode: DATABASE_CODE_ENUM.DB_USERS_TOTAL_COUNT_SUCCESS,
      result: users,
      success: true,
      // count: users,
    };
  } catch (error) {
    return {
      responseCode: DATABASE_CODE_ENUM.DB_USERS_TOTAL_COUNT_ERROR,
      message: DBResponseMessage(DATABASE_CODE_ENUM.DB_USERS_TOTAL_COUNT_ERROR),
      result: error,
      success: false,
      // error,
    };
  }
}

// function for adding new user to the collection
export async function addUser({
  userPassword,
  userName,
}: {
  userPassword: string;
  userName: string;
}): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const user = await UserModel.create({
      userPassword,
      userName,
    });
    return {
      message: DBResponseMessage(DATABASE_CODE_ENUM.DB_USER_CREATE_SUCCESS),
      responseCode: DATABASE_CODE_ENUM.DB_USER_CREATE_SUCCESS,
      result: user,
      success: true,
    };
    // return { message: "success", user };
  } catch (error) {
    return {
      responseCode: DATABASE_CODE_ENUM.DB_USER_CREATE_ERROR,
      message: DBResponseMessage(DATABASE_CODE_ENUM.DB_USER_CREATE_ERROR),
      result: error,
      success: false,
      // error,
    };
  }
}

// function for finding user by user name
export async function findUserByUserName(
  userName: string
): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const foundedUser = await UserModel.findOne({ userName }).select(
      "userName _id"
    );
    if (foundedUser !== null) {
      return {
        responseCode: DATABASE_CODE_ENUM.DB_USER_FIND_BY_NAME_SUCCESS,
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_USER_FIND_BY_NAME_SUCCESS
        ),
        result: foundedUser,
        success: true,
      };
      // return { message: "success", foundedUser };
    } else {
      // return { message: "success", foundedUser };
      return {
        responseCode: DATABASE_CODE_ENUM.DB_USER_FIND_BY_NAME_ERROR,
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_USER_FIND_BY_NAME_ERROR
        ),
        result: null,
        success: false,
      };
    }
  } catch (error) {
    // return { message: "error", error };
    return {
      responseCode: DATABASE_CODE_ENUM.DB_USER_FIND_BY_NAME_QUERY_ERROR,
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_USER_FIND_BY_NAME_QUERY_ERROR
      ),
      result: error,
      success: false,
    };
  }
}

// function for getting userPassword only
export async function getUserPassword(
  userId: string
): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const user = await UserModel.findById(userId).select("userPassword");
    if (user !== null) {
      // return {
      //   operation: "success",
      //   message: "User found.",
      //   user,
      // };
      return {
        responseCode:
          DATABASE_CODE_ENUM.DB_USER_FIND_PASSWORD_BY_USER_ID_SUCCESS,
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_USER_FIND_PASSWORD_BY_USER_ID_SUCCESS
        ),
        result: user,
        success: true,
      };
    } else {
      // return {
      //   operation: "success",
      //   message: "User found.",
      //   user,
      // };
      return {
        responseCode: DATABASE_CODE_ENUM.DB_USER_FIND_PASSWORD_BY_USER_ID_ERROR,
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_USER_FIND_PASSWORD_BY_USER_ID_ERROR
        ),
        result: null,
        success: false,
      };
    }
  } catch (error) {
    // return { operation: "error", message: "Unable to find the user", error };
    return {
      responseCode:
        DATABASE_CODE_ENUM.DB_USER_FIND_PASSWORD_BY_USER_ID_QUERY_ERROR,
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_USER_FIND_PASSWORD_BY_USER_ID_QUERY_ERROR
      ),
      result: error,
      success: false,
    };
  }
}

// function for updating user Name
export async function updateUserName(
  id: string,
  newUserName: string
): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        userName: newUserName,
      },
      { new: true, returnDocument: "after" }
    );
    if (updatedUser !== null) {
      // return { message: "success", updatedUser };
      return {
        responseCode: DATABASE_CODE_ENUM.DB_USER_UPDATE_NAME_SUCCESS,
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_USER_UPDATE_NAME_SUCCESS
        ),
        result: updatedUser,
        success: true,
      };
    } else {
      // return { message: "success", updatedUser };
      return {
        responseCode: DATABASE_CODE_ENUM.DB_USER_UPDATE_NAME_ERROR,
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_USER_UPDATE_NAME_ERROR
        ),
        result: null,
        success: false,
      };
    }
  } catch (error) {
    // return { message: "error", error };
    return {
      responseCode: DATABASE_CODE_ENUM.DB_USER_UPDATE_NAME_QUERY_ERROR,
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_USER_UPDATE_NAME_QUERY_ERROR
      ),
      result: error,
      success: false,
    };
  }
}

// function for updating the userPassword
export async function updateUserPassword(
  id: string,
  newUserPassword: string
): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, {
      userPassword: newUserPassword,
    });
    if (updatedUser !== null) {
      // return { message: "success", updatedUser };
      return {
        responseCode: DATABASE_CODE_ENUM.DB_USER_UPDATE_PASSWORD_SUCCESS,
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_USER_UPDATE_PASSWORD_SUCCESS
        ),
        result: updatedUser,
        success: true,
      };
    } else {
      // return { message: "success", updatedUser };
      return {
        responseCode: DATABASE_CODE_ENUM.DB_USER_UPDATE_PASSWORD_ERROR,
        message: DBResponseMessage(
          DATABASE_CODE_ENUM.DB_USER_UPDATE_PASSWORD_ERROR
        ),
        result: null,
        success: false,
      };
    }
  } catch (error) {
    // return { message: "error", error };
    return {
      responseCode: DATABASE_CODE_ENUM.DB_USER_UPDATE_PASSWORD_QUERY_ERROR,
      message: DBResponseMessage(
        DATABASE_CODE_ENUM.DB_USER_UPDATE_PASSWORD_QUERY_ERROR
      ),
      result: error,
      success: false,
    };
  }
}

// function for deleting the user
export async function deleteUser(
  id: string
): Promise<DATABASE_RESPONSE_RESULT<any>> {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (deletedUser !== null) {
      // return { message: "success", deletedUser };
      return {
        responseCode: DATABASE_CODE_ENUM.DB_USER_DELETE_SUCCESS,
        message: DBResponseMessage(DATABASE_CODE_ENUM.DB_USER_DELETE_SUCCESS),
        result: deletedUser,
        success: true,
      };
    } else {
      // return { message: "success", deletedUser };
      return {
        responseCode: DATABASE_CODE_ENUM.DB_USER_DELETE_ERROR,
        message: DBResponseMessage(DATABASE_CODE_ENUM.DB_USER_DELETE_ERROR),
        result: null,
        success: false,
      };
    }
  } catch (error) {
    // return { message: "error", error };
    return {
      responseCode: DATABASE_CODE_ENUM.DB_USER_DELETE_QUERY_ERROR,
      message: DBResponseMessage(DATABASE_CODE_ENUM.DB_USER_DELETE_QUERY_ERROR),
      result: error,
      success: false,
    };
  }
}
