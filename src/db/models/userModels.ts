// todo : remove dead comments aks previous old responses

import { createDBResponseFromCode } from "tools/dbResponse";
import {
  DATABASE_CODE_ENUM,
  DATABASE_RESPONSE,
  DBResponseMessage,
} from "../../tools/databaseResponseCodes";
import { UserModel } from "../Schema";
import { IUserDocument } from "db/Schema/userSchema";

// function for getting total number of users in the user collection
export async function totalUsers(): Promise<DATABASE_RESPONSE<number>> {
  try {
    const numberOfUsers: number = await UserModel.countDocuments();
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_USERS_TOTAL_COUNT_SUCCESS,
      result: numberOfUsers,
    });
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_USERS_TOTAL_COUNT_ERROR,
      result: error,
    });
  }
}

// function for adding new user to the collection
export async function addUser({
  userPassword,
  userName,
}: {
  userPassword: string;
  userName: string;
}): Promise<DATABASE_RESPONSE<IUserDocument>> {
  try {
    const user: IUserDocument = await UserModel.create({
      userPassword,
      userName,
    });
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_USER_CREATE_SUCCESS,
      result: user,
    });
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_USER_CREATE_ERROR,
      result: error,
    });
  }
}

// function for finding user by user name
export async function findUserByUserName(
  userName: string
): Promise<DATABASE_RESPONSE<IUserDocument>> {
  try {
    const foundedUser: IUserDocument = await UserModel.findOne({
      userName,
    }).select("userName _id");
    if (foundedUser !== null) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_USER_FIND_BY_NAME_SUCCESS,
        result: foundedUser,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_USER_FIND_BY_NAME_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_USER_FIND_BY_NAME_QUERY_ERROR,
      result: error,
    });
  }
}

// function for getting userPassword only
export async function getUserPassword(
  userId: string
): Promise<DATABASE_RESPONSE<IUserDocument>> {
  try {
    const user: IUserDocument = await UserModel.findById(userId).select(
      "userPassword"
    );
    if (user !== null) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_USER_FIND_PASSWORD_BY_USER_ID_SUCCESS,
        result: user,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_USER_FIND_PASSWORD_BY_USER_ID_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_USER_FIND_PASSWORD_BY_USER_ID_QUERY_ERROR,
      result: error,
    });
  }
}

// function for updating user Name
export async function updateUserName(
  id: string,
  newUserName: string
): Promise<DATABASE_RESPONSE<IUserDocument>> {
  try {
    const updatedUser: IUserDocument = await UserModel.findByIdAndUpdate(
      id,
      {
        userName: newUserName,
      },
      { new: true, returnDocument: "after" }
    );
    if (updatedUser !== null) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_USER_UPDATE_NAME_SUCCESS,
        result: updatedUser,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_USER_UPDATE_NAME_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_USER_UPDATE_NAME_QUERY_ERROR,
      result: error,
    });
  }
}

// function for updating the userPassword
export async function updateUserPassword(
  id: string,
  newUserPassword: string
): Promise<DATABASE_RESPONSE<IUserDocument>> {
  try {
    const updatedUser: IUserDocument = await UserModel.findByIdAndUpdate(id, {
      userPassword: newUserPassword,
    });
    if (updatedUser !== null) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_USER_UPDATE_PASSWORD_SUCCESS,
        result: updatedUser,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_USER_UPDATE_PASSWORD_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_USER_UPDATE_PASSWORD_QUERY_ERROR,
      result: error,
    });
  }
}

// function for deleting the user
export async function deleteUser(
  id: string
): Promise<DATABASE_RESPONSE<IUserDocument>> {
  try {
    const deletedUser: IUserDocument = await UserModel.findByIdAndDelete(id);
    if (deletedUser !== null) {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_USER_DELETE_SUCCESS,
        result: deletedUser,
      });
    } else {
      return createDBResponseFromCode({
        code: DATABASE_CODE_ENUM.DB_USER_DELETE_ERROR,
        result: null,
      });
    }
  } catch (error) {
    return createDBResponseFromCode({
      code: DATABASE_CODE_ENUM.DB_USER_DELETE_QUERY_ERROR,
      result: error,
    });
  }
}
