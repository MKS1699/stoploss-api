// Middlewares info
const MIDDLEWARES = [
  {
    name: "userExists",
    about:
      "This middleware checks for existence of the user through the provided `userName` variable in the request body and tells if the user exists or not and based on the `path` which it automatically detects in the request it performs action.",
    bodyArgs: [
      {
        name: "userName",
        type: "string",
        about:
          "The `userName` of the user which he/she wants to use to log in or sign up.",
      },
      {
        name: "userId",
        type: "string",
        about:
          "The `userID` of the user which is already detected when user trying to log in.",
      },
    ],
    responses: [
      {
        status: "403",
        message: "The user already exists if trying to `sign In`.",
        operation: "Error",
        result: "",
      },
      {
        status: "400",
        message: "User does not exists with provided credentials.",
        operation: "Error",
        result: "",
      },
      {
        status: "500",
        message: "Internal Server Error",
        operation: "Error",
        result: "Error - Object will provide the error that happened.",
      },
    ],
  },
  {
    name: "passwordHash",
    about:
      "MiddleWare for hashing the password using the `bcrypt` and replacing it with `hashed password` for security. This middleware when executes if successful then it calls the next function otherwise gives error which could in the overall function or while hashing the password.",
    responses: [
      {
        status: "404 / 500",
        message: "",
        operation: "",
        result: "Error - Object which happened while hashing the password.",
      },
      {
        status: "500",
        message: "Internal Server Error",
        operation: "",
        result: "Error - Object which tell about the error.",
      },
    ],
    bodyArgs: [
      {
        name: "userPassword",
        type: "string",
        about:
          "The password of the user who is trying to `log in` or `sign up`.",
      },
    ],
  },
  {
    name: "validateCredentials",
    about:
      "Middleware used for verifying the credentials of the user who is trying to log in where the credentials provided are `userName` and `userPassword`.",
    responses: [
      {
        status: "400",
        message: "User Password provided is not valid.",
        operation: "Error",
        result: "",
      },
      {
        status: "400",
        message: "User Name provided is not valid.",
        operation: "Error",
        result: "",
      },
      {
        status: "403",
        message: "userName & userPassword provided must be string",
        operation: "Error",
        result: "",
      },
      {
        status: "500",
        message: "Internal Server Error",
        operation: "Error",
        result: "Error - Object which tells about the error.",
      },
    ],
    bodyArgs: [
      {
        name: "userName",
        type: "string",
        about:
          "The `userName` of the user in the request who is trying to log in.",
      },
      {
        name: "userPassword",
        type: "string",
        about:
          "The `userPassword` of the user in the request who is trying to log in.",
      },
    ],
  },
  {
    name: "generateToken",
    about:
      "Middleware for generating a `jwt` token for the user based on its `userId`. After the token is generated it is added to the request and forwarded to the next middleware.",
    responses: [
      {
        status: "500",
        message: "Internal Server Error",
        operation: "",
        result: "Error -  Object which tell about the error.",
      },
    ],
    bodyArgs: [
      {
        name: "userId",
        type: "string",
        about:
          "The `userId` of the user for which the `token` will be generated.",
      },
    ],
  },
  {
    name: "verifyToken",
    about:
      "Middleware for verifying the token (`jwt`) which is provided in the request and let the request perform its request if correct token else reject the request.",
    responses: [
      {
        status: "401",
        message: "Token not provided, please provide a token.",
        operation: "Error",
        result: "",
      },
      {
        status: "401",
        message: "Unable to verify token.",
        operation: "Error",
        result: "",
      },
      {
        status: "500",
        message: "Internal Server Error",
        operation: "",
        result: "Error - Object which tells about the error.",
      },
    ],
    bodyArgs: [
      {
        name: "bearer",
        type: "",
        about:
          "This the `bearer token` in the `header` of the request not in `body` which is of the format : ['bearer(this exact word)', 'token(`;jwt` token which will be verified to detect the request is from a valid resource or not.']",
      },
    ],
  },
  {
    name: "passwordCheck",
    about:
      "Middleware for checking the password provided is actual password or not.The password stored is hashed password so these two (provided and stored) are compared using `bcrypt` and If it is actual or equal then it calls the next middleware other wise gives the error.",
    responses: [
      {
        status: "401",
        message: "Provided Passwords are not equal",
        operation: "error",
        result: "",
      },
      {
        status: "400",
        message: "Password Verification Failed",
        operation: "error",
        result: "",
      },
    ],
    bodyArgs: [
      {
        name: "userId",
        type: "string",
        about: "The `userId` of the user whose password is to be checked.",
      },
      {
        name: "userPassword",
        type: "string",
        about:
          "The `userPassword` of the user whose password is to be checked.",
      },
    ],
  },
];

export default MIDDLEWARES;
