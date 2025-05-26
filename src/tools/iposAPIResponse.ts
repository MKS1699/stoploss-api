import {
  createErrorResponse,
  createGenericErrorResponse,
  createSuccessResponse,
  responseType,
} from "./apiResponse";
import { API_RESPONSE_CODE_ENUM, API_RESPONSE } from "./apiResponseCodes";
import { DATABASE_CODE_ENUM, DATABASE_RESPONSE } from "./databaseResponseCodes";

// ipos responses
export function iposAPIResponse<T>({
  dbResponse,
  responseType,
  customResult,
}: {
  responseType: responseType;
  dbResponse: DATABASE_RESPONSE<T>;
  customResult?: API_RESPONSE<T>["result"];
}): API_RESPONSE<T> {
  const dbResponseCode: DATABASE_CODE_ENUM = dbResponse.responseCode;
  const dbResponseResult: DATABASE_RESPONSE<T>["result"] = dbResponse.result;

  let result = customResult ?? dbResponseResult; // result for api response
  let apiResponse: API_RESPONSE<T> | null = null; // api response result

  switch (responseType) {
    // success responses
    case "success":
      switch (dbResponseCode) {
        // total count success
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_CREATE_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_CREATE_SUCCESS,
            result,
          });
          break;
        // find all IPO
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_ALL_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_ALL_SUCCESS,
            result,
          });
          break;
        // find IPO by ipo id
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_ID_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_ID_SUCCESS,
            result,
          });
          break;
        // find IPO by ipo name
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_NAME_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_NAME_SUCCESS,
            result,
          });
          break;
        // find IPO by user id
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_USER_ID_CREATED_SUCCESS,
            result,
          });
          break;
        // find IPO by user name
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_USER_NAME_CREATED_SUCCESS,
            result,
          });
          break;
        // find IPO by ipo id and update
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_UPDATE_BY_IPO_ID_SUCCESS,
            result,
          });
          break;
        // find IPO by ipo id and add post id
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_UPDATE_POST_ID_ADD_BY_IPO_ID_SUCCESS,
            result,
          });
          break;
        // find IPO by ipo id and remove/delete post id
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_UPDATE_POST_ID_REMOVE_BY_IPO_ID_SUCCESS,
            result,
          });
          break;
        // delete
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_DELETE_BY_IPO_ID_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_DELETE_BY_IPO_ID_SUCCESS,
            result,
          });
          break;
        default:
          console.log(`Unknown DB Response Code : ${dbResponseCode}`);
          break;
      }
      break;
    // error responses
    case "error":
      switch (dbResponseCode) {
        // total count
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_CREATE_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_CREATE_ERROR,
            result,
          });
          break;
        // find all IPO
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_ALL_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_ALL_ERROR,
            result,
          });
          break;
        // find IPO by ipo id
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_ID_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_ID_ERROR,
            result,
          });
          break;
        // find IPO by ipo name
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_NAME_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_NAME_ERROR,
            result,
          });
          break;
        // find IPO by user id
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_USER_ID_CREATED_ERROR,
            result,
          });
          break;
        // find IPO by user name
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_USER_NAME_CREATED_ERROR,
            result,
          });
          break;
        // find IPO by ipo id and update
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_ID_ERROR,
            result,
          });
          break;
        // find IPO by ipo id and add post id (duplicate post id)
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_DUPLICATE_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_UPDATE_POST_ID_ADD_BY_IPO_ID_DUPLICATE_POST_ID_ERROR,
            result,
          });
          break;
        // find IPO by ipo id and add post id (no ipo)
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_ID_ERROR,
            result,
          });
          break;
        // find IPO by ipo id and remove/delete post id (no post id)
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_MISSING_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_UPDATE_POST_ID_REMOVE_BY_IPO_ID_NULL_POST_ID_ERROR,
            result,
          });
          break;
        // find IPO by ipo id and remove/delete post id (no ipo)
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_ID_ERROR,
            result,
          });
          break;
        // delete
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_DELETE_BY_IPO_ID_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_ID_ERROR,
            result,
          });
          break;
        default:
          console.log(`Unknown DB Response Code : ${dbResponseCode}`);
          break;
      }
      break;
    // genericError responses
    case "genericError":
      switch (dbResponseCode) {
        // find all IPO
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_ALL_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_ALL_QUERY_ERROR,
            result,
          });
          break;
        // find IPO by ipo id
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_ID_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_ID_QUERY_ERROR,
            result,
          });
          break;
        // find IPO by ipo name
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_NAME_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_NAME_QUERY_ERROR,
            result,
          });
          break;
        // find IPO by user id
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_USER_ID_CREATED_QUERY_ERROR,
            result,
          });
          break;
        // find IPO by user name
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_USER_NAME_CREATED_QUERY_ERROR,
            result,
          });
          break;
        // find IPO by ipo id and update
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_ID_QUERY_ERROR,
            result,
          });
          break;
        // find IPO by ipo id and add post id
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_ID_QUERY_ERROR,
            result,
          });
          break;
        // find IPO by ipo id and remove/delete post id
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_QUERY_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_FIND_IPO_BY_IPO_ID_QUERY_ERROR,
            result,
          });
          break;
        // delete
        case DATABASE_CODE_ENUM.DB_IPO_CARDS_DELETE_BY_IPO_ID_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_DELETE_BY_IPO_ID_QUERY_ERROR,
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
      code: API_RESPONSE_CODE_ENUM.API_IPO_CARD_UNKNOWN_ERROR,
      result,
    });
  }

  return apiResponse;
}
