import {
  DATABASE_CODE_ENUM,
  DATABASE_RESPONSE,
  DBResponseMessage,
} from "./databaseResponseCodes";

type responseType = "success" | "error" | "queryGenericError";

function createDBSuccessResponse<T>({
  code,
  result,
}: {
  code: DATABASE_CODE_ENUM;
  result: T;
}): DATABASE_RESPONSE<T> {
  return {
    message: DBResponseMessage(code),
    success: true,
    responseCode: code,
    result,
  };
}

function createDBErrorResponse<T>({
  code,
  result,
}: {
  code: DATABASE_CODE_ENUM;
  result?: T;
}): DATABASE_RESPONSE<T> {
  return {
    message: DBResponseMessage(code),
    success: false,
    responseCode: code,
    result: result ?? null,
  };
}

function createDBQueryGenericErrorResponse<T>({
  code,
  result,
}: {
  code: DATABASE_CODE_ENUM;
  result: T;
}): DATABASE_RESPONSE<T> {
  return {
    message: DBResponseMessage(code),
    success: false,
    responseCode: code,
    result,
  };
}

function generateResponseTypeNFor(code: DATABASE_CODE_ENUM): responseType {
  let responseType: responseType | null = null;

  if (code >= 6000 && code <= 6999) {
    responseType = "success";
  } else if (code >= 8000 && code <= 8999) {
    responseType = "error";
  } else if (code >= 9000 && code <= 9999) {
    responseType = "queryGenericError";
  }

  return responseType;
}

export function createDBResponseFromCode<T>({
  code,
  result,
}: {
  code: DATABASE_CODE_ENUM;
  result?: T;
}): DATABASE_RESPONSE<T> {
  const responseType = generateResponseTypeNFor(code);

  let dbResponse: DATABASE_RESPONSE<T> | null = null;

  switch (responseType) {
    case "error":
      dbResponse = createDBErrorResponse({ code, result: result ?? null });
      break;
    case "queryGenericError":
      dbResponse = createDBQueryGenericErrorResponse({ code, result });
      break;
    case "success":
      dbResponse = createDBSuccessResponse({ code, result });
      break;
    default:
      console.log(`Error : Unknown DB_RESPONSE_CODE -> ${code}`);
  }
  return dbResponse;
}
