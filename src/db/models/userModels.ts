/* Instructions for writing model :
 * Every model will use a try & catch block for better debugging.
 * Every model will return a object based on the request handled.
 * If the request is "successful" then the object returned will
 * be:
 * ```
 *      return {
 *            message : 'success',
 *            "requested query result"
 *            }
 * ```
 *  @ ~ "requested query result" -> will be what ever the model
 *      action has returned upon its successful completion.
 *
 * If the request is `not successful` which means it catches an
 * "Error" then the object returned will be:
 * ```
 *      return {
 *          message : "error",
 *          error
 *          }
 * ```
 *
 * @ ~ error -> Implies the error caught while handling the model
 *     action in the try catch block.
 *
 */

import { UserModel } from "../Schema";

// function for getting total number of users in the user collection
export async function totalUsers() {
  try {
    const users = await UserModel.countDocuments();
    return {
      message: "success",
      count: users,
    };
  } catch (error) {
    return {
      message: "Error",
      error,
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
}) {
  try {
    const user = await UserModel.create({
      userPassword,
      userName,
    });
    return { message: "success", user };
  } catch (error) {
    return { message: "error", error };
  }
}

// function for finding user by user name
export async function findUserByUserName(userName: string) {
  try {
    const foundedUser = await UserModel.findOne({ userName }).select(
      "userName _id"
    );
    return { message: "success", foundedUser };
  } catch (error) {
    return { message: "error", error };
  }
}

// function for getting userPassword only
export async function getUserPassword(userId: string) {
  try {
    const user = await UserModel.findById(userId).select("userPassword");

    return {
      operation: "success",
      message: "User found.",
      user,
    };
  } catch (error) {
    return { operation: "error", message: "Unable to find the user", error };
  }
}

// function for updating user Name
export async function updateUserName(id: string, newUserName: string) {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        userName: newUserName,
      },
      { new: true, returnDocument: "after" }
    );
    return { message: "success", updatedUser };
  } catch (error) {
    return { message: "error", error };
  }
}

// function for updating the userPassword
export async function updateUserPassword(id: string, newUserPassword: string) {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, {
      userPassword: newUserPassword,
    });
    return { message: "success", updatedUser };
  } catch (error) {
    return { message: "error", error };
  }
}

// function for deleting the user
export async function deleteUser(id: string) {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    return { message: "success", deletedUser };
  } catch (error) {
    return { message: "error", error };
  }
}
