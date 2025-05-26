import {
  API_RESPONSE_CODE_ENUM,
  API_RESPONSE,
  APIResponseMessage,
} from "./apiResponseCodes";
import { DATABASE_CODE_ENUM, DATABASE_RESPONSE } from "./databaseResponseCodes";
import { usersAPIResponse } from "./usersAPIResponse";
import { iposAPIResponse } from "./iposAPIResponse";
import { postsAPIResponse } from "./postsAPIResponse";
import { tagsAPIResponse } from "./tagsAPIResponse";

export type responseType = "success" | "error" | "genericError";
export type responseFor = "posts" | "users" | "tags" | "ipos";

// creating error response function
export function createErrorResponse({
  code,
  result,
}: {
  code: API_RESPONSE_CODE_ENUM;
  result: any;
}): API_RESPONSE<any> {
  return {
    message: APIResponseMessage(code),
    responseCode: code,
    result,
    success: false,
  };
}

// creating success response function
export function createSuccessResponse({
  code,
  result,
}: {
  code: API_RESPONSE_CODE_ENUM;
  result: any;
}): API_RESPONSE<any> {
  return {
    message: APIResponseMessage(code),
    responseCode: code,
    result,
    success: true,
  };
}

// creating error response for generic codes function
export function createGenericErrorResponse({
  code,
  result,
}: {
  code: API_RESPONSE_CODE_ENUM;
  result: any;
}): API_RESPONSE<any> {
  return {
    message: APIResponseMessage(code),
    responseCode: code,
    result,
    success: false,
  };
}

// creating responseType & responseFor based on db codes function
function generateResponseTypeNFor(responseCode: DATABASE_CODE_ENUM): {
  responseType: responseType;
  responseFor: responseFor;
} {
  let responseFor: responseFor | null = null;
  let responseType: responseType | null = null;

  if (responseCode >= 6000 && responseCode <= 6999) {
    responseType = "success";
    if (responseCode >= 6000 && responseCode <= 6099) {
      responseFor = "users";
    } else if (responseCode >= 6100 && responseCode <= 6199) {
      responseFor = "posts";
    } else if (responseCode >= 6200 && responseCode <= 6299) {
      responseFor = "ipos";
    } else if (responseCode >= 6300 && responseCode <= 6399) {
      responseFor = "tags";
    }
  } else if (responseCode >= 8000 && responseCode <= 8999) {
    responseType = "error";
    if (responseCode >= 8000 && responseCode <= 8099) {
      responseFor = "users";
    } else if (responseCode >= 8100 && responseCode <= 8199) {
      responseFor = "posts";
    } else if (responseCode >= 8200 && responseCode <= 8299) {
      responseFor = "ipos";
    } else if (responseCode >= 8300 && responseCode <= 8399) {
      responseFor = "tags";
    }
  } else if (responseCode >= 9000 && responseCode <= 9999) {
    responseType = "genericError";
    if (responseCode >= 9000 && responseCode <= 9099) {
      responseFor = "users";
    } else if (responseCode >= 9100 && responseCode <= 9199) {
      responseFor = "posts";
    } else if (responseCode >= 9200 && responseCode <= 9299) {
      responseFor = "ipos";
    } else if (responseCode >= 9300 && responseCode <= 9399) {
      responseFor = "tags";
    }
  }

  return {
    responseFor,
    responseType,
  };
}

// default internal server error function
export function createInternalServerErrorResponse<T>(
  error: T
): API_RESPONSE<T> {
  const apiResponse: API_RESPONSE<T> = {
    message: APIResponseMessage(
      API_RESPONSE_CODE_ENUM.API_INTERNAL_SERVER_ERROR
    ),
    responseCode: API_RESPONSE_CODE_ENUM.API_INTERNAL_SERVER_ERROR,
    result: error,
    success: false,
  };
  return apiResponse;
}

// API RESPONSE MESSAGE BASED ON DB RESPONSE CODES function
export function mapAPIResponseToDBResponse<T>({
  dbResponse,
  customResult,
}: {
  dbResponse: DATABASE_RESPONSE<T>;
  customResult?: API_RESPONSE<any>["result"];
}): API_RESPONSE<T> {
  const responseCode = dbResponse.responseCode;

  const { responseFor, responseType } = generateResponseTypeNFor(responseCode);

  let responseResult: API_RESPONSE<any> | null = null;

  switch (responseFor) {
    case "users":
      responseResult = usersAPIResponse({
        responseType,
        dbResponse,
        customResult,
      });
      break;
    case "posts":
      responseResult = postsAPIResponse({
        responseType,
        dbResponse,
        customResult,
      });
      break;
    case "ipos":
      responseResult = iposAPIResponse({
        responseType,
        dbResponse,
        customResult,
      });
      break;
    case "tags":
      responseResult = tagsAPIResponse({
        responseType,
        dbResponse,
        customResult,
      });
      break;
    default:
      console.log(`Error in DB Response Code (unknown code) : ${responseCode}`);
      break;
  }

  if (!responseResult) {
    responseResult = createGenericErrorResponse({
      code: API_RESPONSE_CODE_ENUM.API_UNKNOWN_DB_RESPONSE_CODE_ERROR,
      result: dbResponse.result,
    });
  }
  return responseResult;
}

// api response without db code function
export function createAPIResponse<T>({
  result,
  code,
  success,
}: {
  result?: T;
  code: API_RESPONSE_CODE_ENUM;
  success: boolean;
}): API_RESPONSE<T> {
  const apiResponse: API_RESPONSE<T> = {
    message: APIResponseMessage(code),
    responseCode: code,
    result: result,
    success,
  };

  return apiResponse;
}
