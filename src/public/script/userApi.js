// USERS API Paths info
const USERS_API = [
  {
    path: "/api/users/signup",
    method: "POST",
    name: "Sign Up",
    about: "Sign Up for the user for admin control.",
    responses: [
      {
        status: "200",
        message: "Signed Up successfully",
        operation: "success",
        result: "userName, userId",
      },
      {
        status: "400",
        message: "Unable to Sign Up.",
        operation: "error",
        result: "",
      },
      {
        status: "403",
        message: "As of now there can't be more than 3 users.",
        operation: "",
        result: "",
      },
      {
        status: "500",
        message: "Internal Server Error",
        operation: "",
        result: "Error - Object containing error information.",
      },
    ],
    bodyArgs: [
      {
        name: "userPassword",
        type: "string",
        about: "Password for the user who is signing up.",
        values: "",
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "userName",
        type: "string",
        about: "Name for the user who is signing up.",
        values: "",
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
    ],
    middlewares: ["validateCredentials", "passwordHash", "userExist"],
  },
  {
    path: "/api/users/updateUser",
    method: "PUT",
    name: "Update User",
    about: "Updating User Info stored of the user.",
    responses: [
      {
        status: "200",
        message: "success",
        operation: "",
        result: "result - object containing userInfo",
      },
      {
        status: "400",
        message: "error",
        operation: "",
        result: "error - Object containing error info",
      },
      {
        status: "500",
        message: "Internal Server Error",
        operation: "",
        result: "error - Object containing error Info",
      },
    ],
    bodyArgs: [
      {
        name: "id",
        type: "string",
        about: "userId of the user whose information is being updated.",
        values: "",
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "newUserName",
        type: "string",
        about: "New user name for the user.",
        values: "",
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "newUserPassword",
        type: "string",
        about: "New user Password of the user.",
        values: "",
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "fieldToUpdate",
        type: "string",
        about: "Specifying which field is to be updated.",
        values: ["name", "password"],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
    ],
    middlewares: ["verifyToken"],
  },
  {
    path: "/api/users/deleteUser",
    method: "DELETE",
    name: "Deleting the user.",
    about: "",
    responses: [
      {
        status: "200",
        message: "success",
        operation: "",
        result: "deletedUser - The user who has been deleted.",
      },
      {
        status: "400",
        message: "",
        operation: "",
        result: "error - Error related info from the db.",
      },
      {
        status: "500",
        message: "Internal Server Error",
        operation: "",
        result: "Error - Object containing error related info.",
      },
    ],
    bodyArgs: [
      {
        name: "id",
        type: "string",
        about: "Id of the user who is going to be deleted from the db.",
        values: "",
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
    ],
    middlewares: ["verifyToken"],
  },
  {
    path: "/login",
    method: "POST",
    name: "Log In",
    about: "Logging In the user in the admin control.",
    responses: [
      {
        status: "200",
        message: "User Logged In",
        operation: "success",
        result:
          "generatedToken - JWT for the user. userName - user name. userId - user Id.",
      },
    ],
    bodyArgs: [
      {
        name: "userPassword",
        type: "string",
        about: "Password for the user who is logging in.",
        values: "",
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "userName",
        type: "string",
        about: "Name for the user who is logging in.",
        values: "",
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
    ],
    middlewares: [
      "validateCredentials",
      "userExist",
      "passwordCheck",
      "generateToken",
      "login",
    ],
  },
];

export default USERS_API;
