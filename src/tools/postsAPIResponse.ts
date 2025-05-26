// postAPI response also handles tagAPI responses as tags are used with posts only as of now

import {
  createErrorResponse,
  createGenericErrorResponse,
  createSuccessResponse,
  responseType,
} from "./apiResponse";
import { API_RESPONSE_CODE_ENUM, API_RESPONSE } from "./apiResponseCodes";
import { DATABASE_CODE_ENUM, DATABASE_RESPONSE } from "./databaseResponseCodes";

// posts responses
export function postsAPIResponse<T>({
  dbResponse,
  responseType,
  customResult,
}: {
  responseType: responseType;
  dbResponse: DATABASE_RESPONSE<T>;
  customResult?: API_RESPONSE<T>["result"];
}): API_RESPONSE<any> {
  const dbResponseCode: DATABASE_CODE_ENUM = dbResponse.responseCode;
  const dbResponseResult: DATABASE_RESPONSE<T>["result"] = dbResponse.result;

  let result = customResult ?? dbResponseResult; // result for api response
  let apiResponse: API_RESPONSE<T> | null = null; // api response result

  switch (responseType) {
    // success
    case "success":
      switch (dbResponseCode) {
        // find post by post id
        case DATABASE_CODE_ENUM.DB_POST_FIND_BY_POST_ID_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_POST_ID_SUCCESS,
            result,
          });
          break;
        // find post by post type and limit
        case DATABASE_CODE_ENUM.DB_POST_FIND_BY_TYPE_LIMIT_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_POST_TYPE_WITH_LIMIT_SUCCESS,
            result,
          });
          break;
        // latest posts
        case DATABASE_CODE_ENUM.DB_POST_FIND_LATEST_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_LATEST_POSTS_SUCCESS,
            result,
          });
          break;
        // find post by user id
        case DATABASE_CODE_ENUM.DB_POST_FIND_BY_USER_ID_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_USER_ID_SUCCESS,
            result,
          });
          break;
        // count post(s) with post type
        case DATABASE_CODE_ENUM.DB_POST_COUNT_BY_TYPE_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_COUNT_BY_POST_TYPE_SUCCESS,
            result,
          });
          break;
        // count all post(s)
        case DATABASE_CODE_ENUM.DB_POST_COUNT_ALL_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_COUNT_ALL_SUCCESS,
            result,
          });
          break;
        // count post(s) created by user (user id)
        case DATABASE_CODE_ENUM.DB_POST_COUNT_BY_USER_ID_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_COUNT_BY_CREATED_BY_USER_ID_SUCCESS,
            result,
          });
          break;
        // find all post(s)
        case DATABASE_CODE_ENUM.DB_POST_FIND_ALL_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_ALL_SUCCESS,
            result,
          });
          break;
        // creating new post
        case DATABASE_CODE_ENUM.DB_POST_CREATE_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_CREATE_SUCCESS,
            result,
          });
          break;
        // deleting a post
        case DATABASE_CODE_ENUM.DB_POST_DELETE_BY_ID_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_DELETE_BY_POST_ID_SUCCESS,
            result,
          });
          break;
        default:
          console.log(`Unknown DB Response Code : ${dbResponseCode}`);
          break;
      }
      break;
    // errors
    case "error":
      switch (dbResponseCode) {
        // find post by post id
        case DATABASE_CODE_ENUM.DB_POST_FIND_BY_POST_ID_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_POST_ID_ERROR,
            result,
          });
          break;
        // find post by post type and limit
        case DATABASE_CODE_ENUM.DB_POST_FIND_BY_TYPE_LIMIT_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_POST_TYPE_WITH_LIMIT_ERROR,
            result,
          });
          break;
        // latest posts
        case DATABASE_CODE_ENUM.DB_POST_FIND_LATEST_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_LATEST_POSTS_ERROR,
            result,
          });
          break;
        // find post by user id
        case DATABASE_CODE_ENUM.DB_POST_FIND_BY_USER_ID_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_USER_ID_ERROR,
            result,
          });
          break;
        // count post(s) with post type
        case DATABASE_CODE_ENUM.DB_POST_COUNT_BY_TYPE_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_COUNT_BY_POST_TYPE_ERROR,
            result,
          });
          break;
        // count all post(s)
        case DATABASE_CODE_ENUM.DB_POST_COUNT_ALL_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_COUNT_ALL_ERROR,
            result,
          });
          break;
        // count post(s) created by user (user id)
        case DATABASE_CODE_ENUM.DB_POST_COUNT_BY_USER_ID_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_COUNT_BY_CREATED_BY_USER_ID_ERROR,
            result,
          });
          break;
        // find all post(s)
        case DATABASE_CODE_ENUM.DB_POST_FIND_ALL_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_ALL_ERROR,
            result,
          });
          break;
        // deleting a post
        case DATABASE_CODE_ENUM.DB_POST_DELETE_BY_ID_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_POST_ID_ERROR,
            result,
          });
          break;
        default:
          console.log(`Unknown DB Response Code : ${dbResponseCode}`);
          break;
      }
      break;
    // generic errors / query errors
    case "genericError":
      switch (dbResponseCode) {
        // find post by post id
        case DATABASE_CODE_ENUM.DB_POST_FIND_BY_POST_ID_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_POST_ID_QUERY_ERROR,
            result,
          });
          break;
        // find post by post type and limit
        case DATABASE_CODE_ENUM.DB_POST_FIND_BY_TYPE_LIMIT_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_POST_TYPE_WITH_LIMIT_QUERY_ERROR,
            result,
          });
          break;
        // latest posts
        case DATABASE_CODE_ENUM.DB_POST_FIND_LATEST_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_LATEST_POSTS_QUERY_ERROR,
            result,
          });
          break;
        // find post by user id
        case DATABASE_CODE_ENUM.DB_POST_FIND_BY_USER_ID_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_BY_USER_ID_QUERY_ERROR,
            result,
          });
          break;
        // count post(s) with post type
        case DATABASE_CODE_ENUM.DB_POST_COUNT_BY_TYPE_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_COUNT_BY_POST_TYPE_QUERY_ERROR,
            result,
          });
          break;
        // count all post(s)
        case DATABASE_CODE_ENUM.DB_POST_COUNT_ALL_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_COUNT_ALL_QUERY_ERROR,
            result,
          });
          break;
        // count post(s) created by user (user id)
        case DATABASE_CODE_ENUM.DB_POST_COUNT_BY_USER_ID_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_COUNT_BY_CREATED_BY_USER_ID_QUERY_ERROR,
            result,
          });
          break;
        // find all post(s)
        case DATABASE_CODE_ENUM.DB_POST_FIND_ALL_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_FIND_ALL_QUERY_ERROR,
            result,
          });
          break;
        // creating new post
        case DATABASE_CODE_ENUM.DB_POST_CREATE_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_CREATE_ERROR,
            result,
          });
          break;
        // deleting a post
        case DATABASE_CODE_ENUM.DB_POST_DELETE_BY_ID_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_POST_DELETE_BY_POST_ID_QUERY_ERROR,
            result,
          });
          break;
        default:
          console.log(`Unknown DB Response Code : ${dbResponseCode}`);
          break;
      }
      break;
    default:
      console.log(`Unknown response type : ${responseType}`);
      break;
  }

  if (!apiResponse) {
    apiResponse = createGenericErrorResponse({
      code: API_RESPONSE_CODE_ENUM.API_POST_UNKNOWN_ERROR,
      result,
    });
  }

  return apiResponse;
}
