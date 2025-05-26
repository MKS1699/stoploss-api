import {
  createErrorResponse,
  createGenericErrorResponse,
  createSuccessResponse,
  responseType,
} from "./apiResponse";
import { API_RESPONSE_CODE_ENUM, API_RESPONSE } from "./apiResponseCodes";
import { DATABASE_CODE_ENUM, DATABASE_RESPONSE } from "./databaseResponseCodes";

// users responses
export function usersAPIResponse<T>({
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
    case "success":
      switch (dbResponseCode) {
        // create user
        case DATABASE_CODE_ENUM.DB_USER_CREATE_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_USER_CREATE_SUCCESS,
            result,
          });
          break;
        // users total count success
        case DATABASE_CODE_ENUM.DB_USERS_TOTAL_COUNT_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_USER_TOTAL_COUNT_SUCCESS,
            result,
          });
          break;
        // update user name
        case DATABASE_CODE_ENUM.DB_USER_UPDATE_NAME_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_USER_UPDATE_NAME_SUCCESS,
            result,
          });
          break;
        // update user password
        case DATABASE_CODE_ENUM.DB_USER_UPDATE_PASSWORD_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_USER_UPDATE_PASSWORD_SUCCESS,
            result,
          });
          break;
        // delete user
        case DATABASE_CODE_ENUM.DB_USER_DELETE_SUCCESS:
          apiResponse = createSuccessResponse({
            code: API_RESPONSE_CODE_ENUM.API_USER_DELETE_SUCCESS,
            result,
          });
          break;
        default:
          console.log(`Unknown DB Response Code : ${dbResponseCode}`);
          break;
      }
      break;
    case "error":
      switch (dbResponseCode) {
        // create user
        case DATABASE_CODE_ENUM.DB_USER_CREATE_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_USER_CREATE_ERROR,
            result,
          });
          break;
        // users total count error
        case DATABASE_CODE_ENUM.DB_USERS_TOTAL_COUNT_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_USER_TOTAL_COUNT_ERROR,
            result,
          });
          break;
        // update user name
        case DATABASE_CODE_ENUM.DB_USER_UPDATE_NAME_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_USER_UPDATE_NAME_ERROR,
            result,
          });
          break;
        // update user password
        case DATABASE_CODE_ENUM.DB_USER_UPDATE_PASSWORD_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_USER_UPDATE_PASSWORD_ERROR,
            result,
          });
          break;
        // delete user
        case DATABASE_CODE_ENUM.DB_USER_DELETE_ERROR:
          apiResponse = createErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_USER_DELETE_ERROR,
            result,
          });
          break;
        default:
          console.log(`Unknown DB Response Code : ${dbResponseCode}`);
          break;
      }
      break;
    case "genericError":
      switch (dbResponseCode) {
        // update user name
        case DATABASE_CODE_ENUM.DB_USER_UPDATE_NAME_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_USER_UPDATE_NAME_QUERY_ERROR,
            result,
          });
          break;
        // update user password
        case DATABASE_CODE_ENUM.DB_USER_UPDATE_PASSWORD_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_USER_UPDATE_PASSWORD_QUERY_ERROR,
            result,
          });
          break;
        // delete user
        case DATABASE_CODE_ENUM.DB_USER_DELETE_QUERY_ERROR:
          apiResponse = createGenericErrorResponse({
            code: API_RESPONSE_CODE_ENUM.API_USER_DELETE_QUERY_ERROR,
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
      code: API_RESPONSE_CODE_ENUM.API_USER_UNKNOWN_ERROR,
      result,
    });
  }

  return apiResponse;
}
