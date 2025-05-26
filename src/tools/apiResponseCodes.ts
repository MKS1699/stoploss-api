// API RESPONSE RESULT TYPES
export type API_RESPONSE<T> = {
  success: boolean;
  message: string;
  result: T | null;
  responseCode: API_RESPONSE_CODE_ENUM;
};

// API CODE INFO TYPE
export type API_RESPONSE_CODES = Record<API_RESPONSE_CODE_ENUM, string>;

// API CODES CODES
export enum API_RESPONSE_CODE_ENUM {
  // 1xxx Informational

  // POST API INFORMATIONAL (1101 - 1200)

  // 2xxx Success

  // USER API SUCCESS (2000 - 2099)

  API_USER_TOTAL_COUNT_SUCCESS = 2000,
  API_USER_UPDATE_NAME_SUCCESS = 2001,
  API_USER_UPDATE_PASSWORD_SUCCESS = 2002,
  API_USER_DELETE_SUCCESS = 2003,
  API_USER_LOGIN_SUCCESS = 2004,
  API_USER_CREATE_SUCCESS = 2005,

  // POST API SUCCESS (2100 - 2199)

  API_POST_FIND_BY_POST_ID_SUCCESS = 2100,
  API_POST_FIND_BY_POST_TYPE_WITH_LIMIT_SUCCESS = 2101,
  API_POST_FIND_LATEST_POSTS_SUCCESS = 2102,
  API_POST_FIND_BY_USER_ID_SUCCESS = 2103,
  API_POST_COUNT_BY_POST_TYPE_SUCCESS = 2104,
  API_POST_COUNT_ALL_SUCCESS = 2105,
  API_POST_COUNT_BY_CREATED_BY_USER_ID_SUCCESS = 2106,
  API_POST_FIND_ALL_SUCCESS = 2107,
  API_POST_CREATE_SUCCESS = 2108,
  API_POST_DELETE_BY_POST_ID_SUCCESS = 2109,
  // IPO CARD API SUCCESS (2200 - 2299)

  API_IPO_CARD_CREATE_SUCCESS = 2200,
  API_IPO_CARD_FIND_ALL_SUCCESS = 2201,
  API_IPO_CARD_FIND_IPO_BY_IPO_ID_SUCCESS = 2202,
  API_IPO_CARD_FIND_IPO_BY_IPO_NAME_SUCCESS = 2203,
  API_IPO_CARD_FIND_IPO_BY_USER_ID_CREATED_SUCCESS = 2204,
  API_IPO_CARD_FIND_IPO_BY_USER_NAME_CREATED_SUCCESS = 2205,
  API_IPO_CARD_UPDATE_BY_IPO_ID_SUCCESS = 2206,
  API_IPO_CARD_UPDATE_POST_ID_ADD_BY_IPO_ID_SUCCESS = 2207,
  API_IPO_CARD_UPDATE_POST_ID_REMOVE_BY_IPO_ID_SUCCESS = 2208,
  API_IPO_CARD_DELETE_BY_IPO_ID_SUCCESS = 2209,

  // TAG API SUCCESS (2300 - 2399)

  API_TAG_FIND_BY_POST_ID_SUCCESS = 2300,
  API_TAG_FIND_POST_BY_TAG_NAME_SUCCESS = 2301,
  API_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_SUCCESS = 2302,
  // 3xxx Redirection (THIRD PARTY APIS)

  // 4xxx Client Errors

  // USER API ERROR (4000 - 4099)

  API_USER_TOTAL_COUNT_ERROR = 4000,
  API_USER_UPDATE_NAME_ERROR = 4001,
  API_USER_UPDATE_PASSWORD_ERROR = 4002,
  API_USER_DELETE_ERROR = 4003,
  API_USER_LOGIN_ERROR = 4004,
  API_USER_SIGNUP_DUPLICATE_USER_ERROR = 4005,
  API_USER_LOGIN_NULL_USER_ERROR = 4006,
  API_USER_CREATE_ERROR = 4007,

  // POST API ERROR (4100 - 4199)

  API_POST_FIND_BY_POST_ID_ERROR = 4100,
  API_POST_FIND_BY_POST_TYPE_WITH_LIMIT_ERROR = 4101,
  API_POST_FIND_LATEST_POSTS_ERROR = 4102,
  API_POST_FIND_BY_USER_ID_ERROR = 4103,
  API_POST_COUNT_BY_POST_TYPE_ERROR = 4104,
  API_POST_COUNT_ALL_ERROR = 4105,
  API_POST_COUNT_BY_CREATED_BY_USER_ID_ERROR = 4106,
  API_POST_FIND_ALL_ERROR = 4107,
  API_POST_CREATE_ERROR = 4108,

  // IPO CARD API ERROR (4200 - 4299)

  API_IPO_CARD_CREATE_ERROR = 4200,
  API_IPO_CARD_FIND_ALL_ERROR = 4201,
  API_IPO_CARD_FIND_IPO_BY_IPO_ID_ERROR = 4202,
  API_IPO_CARD_FIND_IPO_BY_IPO_NAME_ERROR = 4203,
  API_IPO_CARD_FIND_IPO_BY_USER_ID_CREATED_ERROR = 4204,
  API_IPO_CARD_FIND_IPO_BY_USER_NAME_CREATED_ERROR = 4205,

  // TAG API ERROR (4300 - 4399)

  API_TAG_FIND_BY_POST_ID_ERROR = 4300,
  API_TAG_FIND_POST_BY_TAG_NAME_ERROR = 4301,
  API_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_ERROR = 4302,

  // 5xxx Server Errors / Generic Errors

  // server errors  (5000 - 5099)

  API_INTERNAL_SERVER_ERROR = 5000,
  API_INTERNAL_CONFIG_ERROR = 5001,

  // generic informational errors (5100 - 5199)

  API_INVALID_REQUEST_ERROR = 5100,
  API_MISSING_REQUIRED_REQUEST_BODY_ARGUMENTS_ERROR = 5101,
  API_INVALID_ARGUMENT_TYPE_ERROR = 5102,
  API_INVALID_ARGUMENT_VALUE_ERROR = 5103,
  API_AUTH_TOKEN_MISSING_ERROR = 5104,
  API_AUTH_TOKEN_VERIFICATION_FAILED = 5105,
  API_AUTH_IPO_CARD_CREATOR_USER_NOT_REQUEST_USER_ERROR = 5106,
  API_AUTH_POST_CREATOR_USER_NOT_REQUEST_USER_ERROR = 5107,
  API_UNKNOWN_DB_RESPONSE_CODE_ERROR = 5108,

  // generic USER api errors (5200 - 5299)

  API_USER_UPDATE_NAME_QUERY_ERROR = 5201,
  API_USER_UPDATE_PASSWORD_QUERY_ERROR = 5202,
  API_USER_DELETE_QUERY_ERROR = 5203,
  API_USER_INVALID_REQUEST_ERROR = 5204,
  API_USER_NAME_LENGTH_ERROR = 5205,
  API_USER_PASSWORD_LENGTH_ERROR = 5206,
  API_USER_PASSWORD_HASHING_FAILED = 5207,
  API_USER_WRONG_PASSWORD_ERROR = 5208,
  API_USER_UNKNOWN_ERROR = 5209,

  // generic POST api errors (5300 - 5399)

  API_POST_UNKNOWN_ERROR = 5300,
  API_POST_FIND_BY_POST_ID_QUERY_ERROR = 5301,
  API_POST_FIND_BY_POST_TYPE_WITH_LIMIT_QUERY_ERROR = 5302,
  API_POST_FIND_LATEST_POSTS_QUERY_ERROR = 5303,
  API_POST_FIND_BY_USER_ID_QUERY_ERROR = 5304,
  API_POST_COUNT_BY_POST_TYPE_QUERY_ERROR = 5305,
  API_POST_COUNT_ALL_QUERY_ERROR = 5306,
  API_POST_COUNT_BY_CREATED_BY_USER_ID_QUERY_ERROR = 5307,
  API_POST_FIND_ALL_QUERY_ERROR = 5308,
  API_POST_DELETE_BY_POST_ID_QUERY_ERROR = 5309,

  // generic IPO api errors (5400 - 5499)

  API_IPO_CARD_FIND_ALL_QUERY_ERROR = 5400,
  API_IPO_CARD_FIND_IPO_BY_IPO_ID_QUERY_ERROR = 5401,
  API_IPO_CARD_FIND_IPO_BY_IPO_NAME_QUERY_ERROR = 5402,
  API_IPO_CARD_FIND_IPO_BY_USER_ID_CREATED_QUERY_ERROR = 5403,
  API_IPO_CARD_FIND_IPO_BY_USER_NAME_CREATED_QUERY_ERROR = 5404,
  API_IPO_CARD_UPDATE_POST_ID_ADD_BY_IPO_ID_DUPLICATE_POST_ID_ERROR = 5405,
  API_IPO_CARD_UPDATE_POST_ID_REMOVE_BY_IPO_ID_NULL_POST_ID_ERROR = 5406,
  API_IPO_CARD_UNKNOWN_ERROR = 5407,
  API_IPO_CARD_DELETE_BY_IPO_ID_QUERY_ERROR = 5408,

  // generic TAG api errors (5500 - 5599)

  API_TAG_UNKNOWN_ERROR = 5500,
  API_TAG_FIND_BY_POST_ID_QUERY_ERROR = 5501,
  API_TAG_FIND_POST_BY_TAG_NAME_QUERY_ERROR = 5502,
  API_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_QUERY_ERROR = 5503,
}

export const API_RESPONSE_DETAILS: API_RESPONSE_CODES = {
  // 1xxx Informational

  // POST API INFORMATIONAL (1101 - 1200)

  // 2xxx Success

  // USER API SUCCESS (2000 - 2099)

  [API_RESPONSE_CODE_ENUM.API_USER_TOTAL_COUNT_SUCCESS]:
    "Total number of users is less than the required.",
  [API_RESPONSE_CODE_ENUM.API_USER_UPDATE_NAME_SUCCESS]:
    "Success in updating the user name.",
  [API_RESPONSE_CODE_ENUM.API_USER_UPDATE_PASSWORD_SUCCESS]:
    "Success in updating the user password.",
  [API_RESPONSE_CODE_ENUM.API_USER_DELETE_SUCCESS]:
    "Success in deleting the user.",
  [API_RESPONSE_CODE_ENUM.API_USER_LOGIN_SUCCESS]:
    "User successfully loggedIn.",
  [API_RESPONSE_CODE_ENUM.API_USER_CREATE_SUCCESS]: "Success in creating user.",
  // POST API SUCCESS (2100 - 2199)

  [API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_POST_ID_SUCCESS]:
    "Success in finding post with provided post id.",
  [API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_POST_TYPE_WITH_LIMIT_SUCCESS]:
    "Success in finding post(s) with provided post type and limit.",
  [API_RESPONSE_CODE_ENUM.API_POST_FIND_LATEST_POSTS_SUCCESS]:
    "Success in finding latest post(s).",
  [API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_USER_ID_SUCCESS]:
    "Success in finding post(s) with provided user id.",
  [API_RESPONSE_CODE_ENUM.API_POST_COUNT_BY_POST_TYPE_SUCCESS]:
    "Success in counting number of post(s) with provided post type.",
  [API_RESPONSE_CODE_ENUM.API_POST_COUNT_ALL_SUCCESS]:
    "Success in counting all post(s).",
  [API_RESPONSE_CODE_ENUM.API_POST_COUNT_BY_CREATED_BY_USER_ID_SUCCESS]:
    "Success in counting post(s) created by user with provided user id.",
  [API_RESPONSE_CODE_ENUM.API_POST_FIND_ALL_SUCCESS]:
    "Success in finding all post(s).",
  [API_RESPONSE_CODE_ENUM.API_POST_CREATE_SUCCESS]:
    "Post successfully created.",
  [API_RESPONSE_CODE_ENUM.API_POST_DELETE_BY_POST_ID_SUCCESS]:
    "Success in deleting post with provided post id.",

  // IPO CARD SUCCESS (2200 - 2299)

  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_CREATE_SUCCESS]:
    "Success in creating IPO Card.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_ALL_SUCCESS]:
    "Success in finding all IPO(s).",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_ID_SUCCESS]:
    "Success in finding IPO with provided ipo id.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_NAME_SUCCESS]:
    "Success in finding IPO with provided ipo name.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_USER_ID_CREATED_SUCCESS]:
    "Success in finding IPO created by user with provided user id.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_USER_NAME_CREATED_SUCCESS]:
    "Success in finding IPO created by user with provided user name.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_UPDATE_BY_IPO_ID_SUCCESS]:
    "Success in updating IPO with provided ipo id.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_UPDATE_POST_ID_ADD_BY_IPO_ID_SUCCESS]:
    "Success in adding postID to IPO with provided ipo id.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_UPDATE_POST_ID_REMOVE_BY_IPO_ID_SUCCESS]:
    "Success in removing postID from IPO with provided ipo id.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_DELETE_BY_IPO_ID_SUCCESS]:
    "Success in deleting ipo card with provided ipo id.",

  // TAG API SUCCESS (4300 - 4399)

  [API_RESPONSE_CODE_ENUM.API_TAG_FIND_BY_POST_ID_SUCCESS]:
    "Success in finding tag(s) for post with provided post id.",
  [API_RESPONSE_CODE_ENUM.API_TAG_FIND_POST_BY_TAG_NAME_SUCCESS]:
    "Success in finding post(s) related with provided tag(s) name.",
  [API_RESPONSE_CODE_ENUM.API_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_SUCCESS]:
    "Success in removing post related with tag by provided tag(s) id.",
  // 3xxx Redirection (THIRD PARTY APIS)

  // 4xxx Client Errors

  // USER API ERROR (4000 - 4099)

  [API_RESPONSE_CODE_ENUM.API_USER_TOTAL_COUNT_ERROR]:
    "Total number of users limit reached.",
  [API_RESPONSE_CODE_ENUM.API_USER_UPDATE_NAME_ERROR]:
    "Error in updating the user name the user doesn't exists with provided user id.",
  [API_RESPONSE_CODE_ENUM.API_USER_UPDATE_PASSWORD_ERROR]:
    "Error in updating the user password the user doesn't exists with provided user id.",
  [API_RESPONSE_CODE_ENUM.API_USER_DELETE_ERROR]:
    "Error in deleting the user, the user doesn't exists with provided user id.",
  [API_RESPONSE_CODE_ENUM.API_USER_LOGIN_ERROR]: "Failed to loggedIn the user.",
  [API_RESPONSE_CODE_ENUM.API_USER_SIGNUP_DUPLICATE_USER_ERROR]:
    "User with provided user name exists.",
  [API_RESPONSE_CODE_ENUM.API_USER_LOGIN_NULL_USER_ERROR]:
    "User with provided user name does not exists.",
  [API_RESPONSE_CODE_ENUM.API_USER_CREATE_ERROR]: "Error in creating user.",

  // POST API ERROR (4100 - 4199)

  [API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_POST_ID_ERROR]:
    "Post does not exists with provided post id.",
  [API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_POST_TYPE_WITH_LIMIT_ERROR]:
    "Post(s) with provided post type and limit does not exists.",
  [API_RESPONSE_CODE_ENUM.API_POST_FIND_LATEST_POSTS_ERROR]:
    "There are no latest post(s).",
  [API_RESPONSE_CODE_ENUM.API_POST_COUNT_ALL_ERROR]: "There are no post(s).",
  [API_RESPONSE_CODE_ENUM.API_POST_COUNT_BY_CREATED_BY_USER_ID_ERROR]:
    "There are no post(s) created by user with provided user id.",
  [API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_USER_ID_ERROR]:
    "Post(s) with provided user id does not exists.",
  [API_RESPONSE_CODE_ENUM.API_POST_COUNT_BY_POST_TYPE_ERROR]:
    "No post(s)  with provided post type exists.",
  [API_RESPONSE_CODE_ENUM.API_POST_FIND_ALL_ERROR]: "There are no post(s).",
  [API_RESPONSE_CODE_ENUM.API_POST_CREATE_ERROR]:
    "There was a error creating post please see error and contact administrator or the support team.",

  // IPO CARD API ERROR (4200 - 4299)

  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_CREATE_ERROR]:
    "Error while creating IPO Card.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_ALL_ERROR]: "No IPO(s) are there.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_ID_ERROR]:
    "IPO with provided ipo id does not exists.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_NAME_ERROR]:
    "IPO with provided ipo name does not exists.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_USER_ID_CREATED_ERROR]:
    "IPO created by user with provided user id does not exists.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_USER_NAME_CREATED_ERROR]:
    "IPO created by user with provided user name does not exists.",

  // TAG API ERROR (4300 - 4399)

  [API_RESPONSE_CODE_ENUM.API_TAG_FIND_BY_POST_ID_ERROR]:
    "There are no tag(s) for post with provided post id.",
  [API_RESPONSE_CODE_ENUM.API_TAG_FIND_POST_BY_TAG_NAME_ERROR]:
    "There are no post(s) related with provided tag(s) name.",
  [API_RESPONSE_CODE_ENUM.API_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_ERROR]:
    "There is no tag with provided tag id or post is not linked with provided post id.",
  // 5xxx Server Errors / Generic Errors

  // server errors  (5000 - 5099)

  [API_RESPONSE_CODE_ENUM.API_INTERNAL_SERVER_ERROR]:
    "There was an internal server error while performing the action.",

  // generic informational errors (5100 - 5199)

  [API_RESPONSE_CODE_ENUM.API_INVALID_REQUEST_ERROR]:
    "Your request could not be processed. Please check the input and try again.",
  [API_RESPONSE_CODE_ENUM.API_MISSING_REQUIRED_REQUEST_BODY_ARGUMENTS_ERROR]:
    "Missing required body arguments in the request.",
  [API_RESPONSE_CODE_ENUM.API_INVALID_ARGUMENT_TYPE_ERROR]:
    "Invalid type for one or more request body fields.",
  [API_RESPONSE_CODE_ENUM.API_INVALID_ARGUMENT_VALUE_ERROR]:
    "One or more fields have invalid values.",
  [API_RESPONSE_CODE_ENUM.API_AUTH_TOKEN_MISSING_ERROR]:
    "The client request is missing an authorization token, which is required to verify the identity of the user before allowing access to this API endpoint.",
  [API_RESPONSE_CODE_ENUM.API_AUTH_TOKEN_VERIFICATION_FAILED]:
    "Authorization token verification failed. The token may be invalid, expired, or tampered with.",
  [API_RESPONSE_CODE_ENUM.API_INTERNAL_CONFIG_ERROR]:
    "Server configuration error. Please contact the administrator or support team.",
  [API_RESPONSE_CODE_ENUM.API_AUTH_IPO_CARD_CREATOR_USER_NOT_REQUEST_USER_ERROR]:
    "You are not authorized to perform this action. Only the creator of this IPO card can access or modify it.",
  [API_RESPONSE_CODE_ENUM.API_AUTH_POST_CREATOR_USER_NOT_REQUEST_USER_ERROR]:
    "You are not authorized to perform this action. Only the creator of this post can access or modify it.",
  [API_RESPONSE_CODE_ENUM.API_UNKNOWN_DB_RESPONSE_CODE_ERROR]:
    "Unknown response code from the DB Response see error and contact administrator or the developers.",

  // generic USER api errors (5200 - 5299)

  [API_RESPONSE_CODE_ENUM.API_USER_UPDATE_NAME_QUERY_ERROR]:
    "Error while updating name of the user see result for error info and contact developers.",
  [API_RESPONSE_CODE_ENUM.API_USER_UPDATE_PASSWORD_QUERY_ERROR]:
    "Error while updating password of the user see result for error info and contact developers.",
  [API_RESPONSE_CODE_ENUM.API_USER_DELETE_QUERY_ERROR]:
    "Error while deleting the user see result for error info and contact developers.",
  [API_RESPONSE_CODE_ENUM.API_USER_INVALID_REQUEST_ERROR]:
    "Invalid or unrecognized request sent to '/api/users/' . Please check the route and request body.",
  [API_RESPONSE_CODE_ENUM.API_USER_NAME_LENGTH_ERROR]:
    "Length of provided user name is less or more than the required length.",
  [API_RESPONSE_CODE_ENUM.API_USER_PASSWORD_LENGTH_ERROR]:
    "Length of provided user password is less or more than the required length.",
  [API_RESPONSE_CODE_ENUM.API_USER_PASSWORD_HASHING_FAILED]:
    "Password hashing failed due to internal error.",
  [API_RESPONSE_CODE_ENUM.API_USER_WRONG_PASSWORD_ERROR]:
    "The provided user password is wrong.",
  [API_RESPONSE_CODE_ENUM.API_USER_UNKNOWN_ERROR]:
    "An unknown error occurred in the USER model due to the client request. Please check the error details and contact the administrator or support team if the issue persists.",

  // generic POST api errors (5300 - 5399)

  [API_RESPONSE_CODE_ENUM.API_POST_UNKNOWN_ERROR]:
    "An unknown error occurred in the POST model due to the client request. Please check the error details and contact the administrator or support team if the issue persists.",
  [API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_POST_ID_QUERY_ERROR]:
    "Error occurred while finding post with provided post id see error and contact the administrator or the support team.",
  [API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_POST_TYPE_WITH_LIMIT_QUERY_ERROR]:
    "Error occurred while finding post(s) with provided post type with limit see error and contact the administrator or the support team.",
  [API_RESPONSE_CODE_ENUM.API_POST_FIND_LATEST_POSTS_QUERY_ERROR]:
    "Error occurred while finding latest post(s) see error and contact the administrator or the support team.",
  [API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_USER_ID_QUERY_ERROR]:
    "Error occurred while finding post(s) with provided user id see error and contact the administrator or the support team.",
  [API_RESPONSE_CODE_ENUM.API_POST_COUNT_BY_POST_TYPE_QUERY_ERROR]:
    "Error occurred while counting post(s) with provided post type see error and contact the administrator or the support team.",
  [API_RESPONSE_CODE_ENUM.API_POST_COUNT_ALL_QUERY_ERROR]:
    "Error occurred while counting all post(s) see error and contact the administrator or the support team.",
  [API_RESPONSE_CODE_ENUM.API_POST_COUNT_BY_CREATED_BY_USER_ID_QUERY_ERROR]:
    "Error occurred while counting post(s) created by user with provided user id see error and contact the administrator or the support team.",
  [API_RESPONSE_CODE_ENUM.API_POST_FIND_ALL_QUERY_ERROR]:
    "Error occurred while finding post(s) see error and contact the administrator or the support team.",
  [API_RESPONSE_CODE_ENUM.API_POST_DELETE_BY_POST_ID_QUERY_ERROR]:
    "Error occurred while deleting post with provided post id see error and contact the administrator or the support team.",

  // generic IPO api errors (5400 - 5499)

  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_ALL_QUERY_ERROR]:
    "Error while finding IPO(s) see error and contact the administrator or the support team.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_ID_QUERY_ERROR]:
    "Error while finding IPO with provided ipo id see error and contact the administrator or the support team.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_NAME_QUERY_ERROR]:
    "Error while finding IPO with provided ipo name see error and contact the administrator or the support team.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_USER_ID_CREATED_QUERY_ERROR]:
    "Error while finding IPO created by user with provided user id see error and contact the administrator or the support team.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_USER_NAME_CREATED_QUERY_ERROR]:
    "Error while finding IPO created by user with provided user name see error and contact the administrator or the support team.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_UPDATE_POST_ID_ADD_BY_IPO_ID_DUPLICATE_POST_ID_ERROR]:
    "Provided post id to add is already linked with the ipo.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_UPDATE_POST_ID_REMOVE_BY_IPO_ID_NULL_POST_ID_ERROR]:
    "Provided post id to remove is not in the ipo.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_UNKNOWN_ERROR]:
    "An unknown error occurred in the IPO card model due to the client request. Please check the error details and contact the administrator or support team if the issue persists.",
  [API_RESPONSE_CODE_ENUM.API_IPO_CARD_DELETE_BY_IPO_ID_QUERY_ERROR]:
    "An unknown error occurred in the IPO card model due to the client request while trying to delete ipo card with provided ipo id. Please check the error details and contact the administrator or support team if the issue persists.",

  // generic TAG api errors (5500 - 5599)

  [API_RESPONSE_CODE_ENUM.API_TAG_UNKNOWN_ERROR]:
    "An unknown error occurred in the TAG model due to the client request. Please check the error details and contact the administrator or support team if the issue persists.",
  [API_RESPONSE_CODE_ENUM.API_TAG_FIND_BY_POST_ID_QUERY_ERROR]:
    "An unknown error occurred in the TAG model finding tag(s) with provided post id due to the client request. Please check the error details and contact the administrator or support team if the issue persists.",
  [API_RESPONSE_CODE_ENUM.API_TAG_FIND_POST_BY_TAG_NAME_QUERY_ERROR]:
    "An unknown error occurred in the TAG model finding post(s) related to tag(s) with provided tag name due to the client request. Please check the error details and contact the administrator or support team if the issue persists.",
  [API_RESPONSE_CODE_ENUM.API_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_QUERY_ERROR]:
    "An unknown error occurred in the TAG model removing post(s) related to tag(s) with provided post id and tag id due to the client request. Please check the error details and contact the administrator or support team if the issue persists.",
};

// API RESPONSE MESSAGE
export function APIResponseMessage(
  api_resp_code: API_RESPONSE_CODE_ENUM
): string {
  return API_RESPONSE_DETAILS[api_resp_code];
}
