import {
  createErrorResponse,
  createGenericErrorResponse,
  createSuccessResponse,
  responseType,
} from "./apiResponse";
import { API_RESPONSE_CODE_ENUM, API_RESPONSE } from "./apiResponseCodes";
import { DATABASE_CODE_ENUM, DATABASE_RESPONSE } from "./databaseResponseCodes";

// tags responses
export function tagsAPIResponse<T>({
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
        // find tag(s) related to post (post id)
        case DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_TAG_FIND_BY_POST_ID_SUCCESS,
            result,
          });
          break;
        // find post(s) related to tag(s) with provide name
        case DATABASE_CODE_ENUM.DB_TAG_FIND_POST_BY_TAG_NAME_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_TAG_FIND_POST_BY_TAG_NAME_SUCCESS,
            result,
          });
          break;
        // update tag removing linked post
        case DATABASE_CODE_ENUM.DB_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_SUCCESS,
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
        // find tag(s) related to post (post id)
        case DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_TAG_FIND_BY_POST_ID_ERROR,
            result,
          });
          break;
        // find post(s) related to tag(s) with provide name
        case DATABASE_CODE_ENUM.DB_TAG_FIND_POST_BY_TAG_NAME_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_TAG_FIND_POST_BY_TAG_NAME_ERROR,
            result,
          });
          break;
        // update tag removing linked post
        case DATABASE_CODE_ENUM.DB_TAG_UPDATE_BY_TAG_ID_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_ERROR,
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
        // find tag(s) related to post (post id)
        case DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_TAG_FIND_BY_POST_ID_QUERY_ERROR,
            result,
          });
          break;
        // find post(s) related to tag(s) with provide name
        case DATABASE_CODE_ENUM.DB_TAG_FIND_POST_BY_TAG_NAME_QUERY_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_TAG_FIND_POST_BY_TAG_NAME_QUERY_ERROR,
            result,
          });
          break;
        // update tag removing linked post
        case DATABASE_CODE_ENUM.DB_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_QUERY_ERROR:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_QUERY_ERROR,
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
      code: API_RESPONSE_CODE_ENUM.API_TAG_UNKNOWN_ERROR,
      result,
    });
  }

  return apiResponse;
}
