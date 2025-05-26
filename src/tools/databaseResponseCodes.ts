export type DATABASE_RESPONSE<T> = {
  success: boolean;
  message: string;
  result: T | null;
  responseCode: DATABASE_CODE_ENUM;
};

export type DATABASE_RESPONSES_DETAILS = Record<DATABASE_CODE_ENUM, string>;

export enum DATABASE_CODE_ENUM {
  // 6xxx Database Query success

  // USER SUCCESS (6000 - 6099)
  DB_USERS_TOTAL_COUNT_SUCCESS = 6000,
  DB_USER_CREATE_SUCCESS = 6001,
  DB_USER_FIND_BY_NAME_SUCCESS = 6002,
  DB_USER_FIND_PASSWORD_BY_USER_ID_SUCCESS = 6003,
  DB_USER_UPDATE_NAME_SUCCESS = 6004,
  DB_USER_UPDATE_PASSWORD_SUCCESS = 6005,
  DB_USER_DELETE_SUCCESS = 6006,

  // POST SUCCESS (6100 - 6199)
  DB_POST_CREATE_SUCCESS = 6100,
  DB_POST_FIND_ALL_SUCCESS = 6101,
  DB_POST_FIND_BY_POST_ID_SUCCESS = 6102,
  DB_POST_FIND_BY_TYPE_LIMIT_SUCCESS = 6103,
  DB_POST_FIND_LATEST_SUCCESS = 6104,
  DB_POST_FIND_BY_USER_ID_SUCCESS = 6105,
  DB_POST_COUNT_BY_TYPE_SUCCESS = 6106,
  DB_POST_COUNT_ALL_SUCCESS = 6107,
  DB_POST_COUNT_BY_USER_ID_SUCCESS = 6108,
  DB_POST_DELETE_BY_ID_SUCCESS = 6109,

  // IPO CARDS SUCCESS (6200 - 6299)
  DB_IPO_CARDS_CREATE_SUCCESS = 6200,
  DB_IPO_CARDS_FIND_BY_IPO_ID_SUCCESS = 6201,
  DB_IPO_CARDS_FIND_BY_IPO_NAME_SUCCESS = 6202,
  DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_SUCCESS = 6203,
  DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_SUCCESS = 6204,
  DB_IPO_CARDS_UPDATE_SUCCESS = 6205,
  DB_IPO_CARDS_DELETE_BY_IPO_ID_SUCCESS = 6206,
  DB_IPO_CARDS_FIND_ALL_SUCCESS = 6207,
  DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_SUCCESS = 6208,
  DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_SUCCESS = 6209,

  // TAG SUCCESS (6300 - 6399)
  DB_TAG_CREATE_SUCCESS = 6300,
  DB_TAG_FIND_BY_TAG_NAME_SUCCESS = 6301,
  DB_TAG_UPDATE_ADD_POST_BY_TAG_ID_SUCCESS = 6302,
  DB_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_SUCCESS = 6303,
  DB_TAG_FIND_BY_POST_ID_SUCCESS = 6304,
  DB_TAG_FIND_POST_BY_TAG_NAME_SUCCESS = 6305,
  DB_TAG_DELETE_BY_TAG_ID_SUCCESS = 6306,

  // 8xxx Database Query Error

  // USER ERRORS (8000 - 8099)
  DB_USERS_TOTAL_COUNT_ERROR = 8000,
  DB_USER_CREATE_ERROR = 8001,
  DB_USER_FIND_BY_NAME_ERROR = 8002,
  DB_USER_FIND_PASSWORD_BY_USER_ID_ERROR = 8003,
  DB_USER_UPDATE_NAME_ERROR = 8004,
  DB_USER_UPDATE_PASSWORD_ERROR = 8005,
  DB_USER_DELETE_ERROR = 8006,

  // POST ERRORS (8100 - 8199)
  DB_POST_CREATE_ERROR = 8100,
  DB_POST_FIND_ALL_ERROR = 8101,
  DB_POST_FIND_BY_POST_ID_ERROR = 8102,
  DB_POST_FIND_BY_TYPE_LIMIT_ERROR = 8103,
  DB_POST_FIND_LATEST_ERROR = 8104,
  DB_POST_FIND_BY_USER_ID_ERROR = 8105,
  DB_POST_COUNT_BY_TYPE_ERROR = 8106,
  DB_POST_COUNT_ALL_ERROR = 8107,
  DB_POST_COUNT_BY_USER_ID_ERROR = 8108,
  DB_POST_DELETE_BY_ID_ERROR = 8109,

  // IPO CARDS ERRORS (8200 - 8299)
  DB_IPO_CARDS_CREATE_ERROR = 8200,
  DB_IPO_CARDS_FIND_BY_IPO_ID_ERROR = 8201,
  DB_IPO_CARDS_FIND_BY_IPO_NAME_ERROR = 8202,
  DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_ERROR = 8203,
  DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_ERROR = 8204,
  DB_IPO_CARDS_UPDATE_ERROR = 8205,
  DB_IPO_CARDS_DELETE_BY_IPO_ID_ERROR = 8206,
  DB_IPO_CARDS_FIND_ALL_ERROR = 8207,
  DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_ERROR = 8208,
  DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_DUPLICATE_ERROR = 8209,
  DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_ERROR = 8210,
  DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_MISSING_ERROR = 8211,

  // TAG ERRORS (8300 - 8399)
  DB_TAG_CREATE_ERROR = 8300,
  DB_TAG_FIND_BY_TAG_NAME_ERROR = 8301,
  DB_TAG_UPDATE_BY_TAG_ID_ERROR = 8302,
  DB_TAG_FIND_BY_POST_ID_ERROR = 8303,
  DB_TAG_FIND_POST_BY_TAG_NAME_ERROR = 8304,
  DB_TAG_DELETE_BY_TAG_ID_ERROR = 8305,

  // 9xxx Database Query Generic Errors

  // USER QUERY ERRORS (9000 - 9099)
  DB_USER_FIND_BY_NAME_QUERY_ERROR = 9000,
  DB_USER_FIND_PASSWORD_BY_USER_ID_QUERY_ERROR = 9001,
  DB_USER_UPDATE_NAME_QUERY_ERROR = 9002,
  DB_USER_UPDATE_PASSWORD_QUERY_ERROR = 9003,
  DB_USER_DELETE_QUERY_ERROR = 9004,

  // POST QUERY ERRORS (9100 - 9199)
  DB_POST_FIND_ALL_QUERY_ERROR = 9100,
  DB_POST_FIND_BY_POST_ID_QUERY_ERROR = 9101,
  DB_POST_FIND_BY_TYPE_LIMIT_QUERY_ERROR = 9102,
  DB_POST_FIND_LATEST_QUERY_ERROR = 9103,
  DB_POST_FIND_BY_USER_ID_QUERY_ERROR = 9104,
  DB_POST_COUNT_BY_TYPE_QUERY_ERROR = 9105,
  DB_POST_COUNT_ALL_QUERY_ERROR = 9106,
  DB_POST_COUNT_BY_USER_ID_QUERY_ERROR = 9107,
  DB_POST_DELETE_BY_ID_QUERY_ERROR = 9108,

  // IPO CARDS QUERY ERRORS (9200 - 9299)
  DB_IPO_CARDS_FIND_BY_IPO_ID_QUERY_ERROR = 9200,
  DB_IPO_CARDS_FIND_BY_IPO_NAME_QUERY_ERROR = 9201,
  DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_QUERY_ERROR = 9202,
  DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_QUERY_ERROR = 9203,
  DB_IPO_CARDS_UPDATE_QUERY_ERROR = 9204,
  DB_IPO_CARDS_DELETE_BY_IPO_ID_QUERY_ERROR = 9205,
  DB_IPO_CARDS_FIND_ALL_QUERY_ERROR = 9206,
  DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_QUERY_ERROR = 9207,
  DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_QUERY_ERROR = 9208,

  // TAG QUERY ERRORS (9300 - 9399)
  DB_TAG_FIND_BY_TAG_NAME_QUERY_ERROR = 9300,
  DB_TAG_UPDATE_ADD_POST_BY_TAG_ID_QUERY_ERROR = 9301,
  DB_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_QUERY_ERROR = 9302,
  DB_TAG_FIND_BY_POST_ID_QUERY_ERROR = 9303,
  DB_TAG_FIND_POST_BY_TAG_NAME_QUERY_ERROR = 9304,
  DB_TAG_DELETE_BY_TAG_ID_QUERY_ERROR = 9305,
}

export const DATABASE_RESPONSES_DETAILS: DATABASE_RESPONSES_DETAILS = {
  // users related codes

  // success

  [DATABASE_CODE_ENUM.DB_USERS_TOTAL_COUNT_SUCCESS]:
    "Success while counting the number of users in the database.",
  [DATABASE_CODE_ENUM.DB_USER_CREATE_SUCCESS]:
    "Success while creating the user in the database.",
  [DATABASE_CODE_ENUM.DB_USER_DELETE_SUCCESS]:
    "Success while deleting the user from the database.",
  [DATABASE_CODE_ENUM.DB_USER_FIND_BY_NAME_SUCCESS]:
    "Success finding user with provided user name from the database.",
  [DATABASE_CODE_ENUM.DB_USER_FIND_PASSWORD_BY_USER_ID_SUCCESS]:
    "Success finding password of the user with provided user id from the database.",
  [DATABASE_CODE_ENUM.DB_USER_UPDATE_NAME_SUCCESS]:
    "Success updating user name of the user with provided user id in the database.",
  [DATABASE_CODE_ENUM.DB_USER_UPDATE_PASSWORD_SUCCESS]:
    "Success updating user password of the user with provided user id in the database.",

  // error

  [DATABASE_CODE_ENUM.DB_USERS_TOTAL_COUNT_ERROR]:
    "Error while counting the number of users in the database.",
  [DATABASE_CODE_ENUM.DB_USER_CREATE_ERROR]:
    "Error while creating the user in the database.",
  [DATABASE_CODE_ENUM.DB_USER_DELETE_ERROR]:
    "No such user exists for deletion in the database.",
  [DATABASE_CODE_ENUM.DB_USER_FIND_BY_NAME_ERROR]:
    "No user exists in the database with provided user name.",
  [DATABASE_CODE_ENUM.DB_USER_FIND_PASSWORD_BY_USER_ID_ERROR]:
    "No user exists with provided user id in the database.",
  [DATABASE_CODE_ENUM.DB_USER_UPDATE_NAME_ERROR]:
    "No user exists with provided user id in the database.",
  [DATABASE_CODE_ENUM.DB_USER_UPDATE_PASSWORD_ERROR]:
    "No user exists with provided user id in the database.",

  // query error

  [DATABASE_CODE_ENUM.DB_USER_DELETE_QUERY_ERROR]:
    "Error while deleting the user from the database.",
  [DATABASE_CODE_ENUM.DB_USER_FIND_BY_NAME_QUERY_ERROR]:
    "Error while finding the user from the database.",
  [DATABASE_CODE_ENUM.DB_USER_FIND_PASSWORD_BY_USER_ID_QUERY_ERROR]:
    "Error while finding password for the user with provided user id from the database.",
  [DATABASE_CODE_ENUM.DB_USER_UPDATE_NAME_QUERY_ERROR]:
    "Error while updating user name with provided user id in the database.",
  [DATABASE_CODE_ENUM.DB_USER_UPDATE_PASSWORD_QUERY_ERROR]:
    "Error while updating user password with provided user id in the database.",

  // posts related codes

  // success

  [DATABASE_CODE_ENUM.DB_POST_CREATE_SUCCESS]:
    "Success while creating post in the database.",
  [DATABASE_CODE_ENUM.DB_POST_FIND_ALL_SUCCESS]:
    "Success in finding all posts from the database.",
  [DATABASE_CODE_ENUM.DB_POST_COUNT_ALL_SUCCESS]:
    "Success in counting all the posts in the database.",
  [DATABASE_CODE_ENUM.DB_POST_FIND_LATEST_SUCCESS]:
    "Success in finding latest posts from the database.",
  [DATABASE_CODE_ENUM.DB_POST_DELETE_BY_ID_SUCCESS]:
    "Success in deleting post with provided post id from the database.",
  [DATABASE_CODE_ENUM.DB_POST_COUNT_BY_TYPE_SUCCESS]:
    "Success in counting posts by provided post type from the database.",
  [DATABASE_CODE_ENUM.DB_POST_COUNT_BY_USER_ID_SUCCESS]:
    "Success in counting posts by provided user id from the database.",
  [DATABASE_CODE_ENUM.DB_POST_FIND_BY_POST_ID_SUCCESS]:
    "Success in finding post with provided post id from the database.",
  [DATABASE_CODE_ENUM.DB_POST_FIND_BY_USER_ID_SUCCESS]:
    "Success in finding post with provided user id from the database.",
  [DATABASE_CODE_ENUM.DB_POST_FIND_BY_TYPE_LIMIT_SUCCESS]:
    "Success in finding post with provided post type from the database.",

  // error

  [DATABASE_CODE_ENUM.DB_POST_CREATE_ERROR]:
    "Error while creating post in the database.",
  [DATABASE_CODE_ENUM.DB_POST_FIND_ALL_ERROR]:
    "Error finding post(s) as no post(s) exist(s) in the database.",
  [DATABASE_CODE_ENUM.DB_POST_COUNT_ALL_ERROR]:
    "Error counting post(s) as no post(s) exist(s) in the database.",
  [DATABASE_CODE_ENUM.DB_POST_FIND_LATEST_ERROR]:
    "Error in finding latest post(s) as no post(s) exist(s) in the database.",
  [DATABASE_CODE_ENUM.DB_POST_DELETE_BY_ID_ERROR]:
    "Error deleting post as no post exist with provided post id in the database.",
  [DATABASE_CODE_ENUM.DB_POST_COUNT_BY_TYPE_ERROR]:
    "Error counting post(s) with provided post type as no post(s) exist(s) in the database.",
  [DATABASE_CODE_ENUM.DB_POST_FIND_BY_POST_ID_ERROR]:
    "Error in finding post with provided post id from the database as no post exist in the database.",
  [DATABASE_CODE_ENUM.DB_POST_FIND_BY_USER_ID_ERROR]:
    "Error in finding post with provided user id from the database as no post exist in the database.",
  [DATABASE_CODE_ENUM.DB_POST_COUNT_BY_USER_ID_ERROR]:
    "Error counting post(s) with provided user id as no post(s) exist(s) in the database.",
  [DATABASE_CODE_ENUM.DB_POST_FIND_BY_TYPE_LIMIT_ERROR]:
    "Error in finding post(s) with provided post type from the database as no post(s) exist(s) in the database.",

  // query error

  [DATABASE_CODE_ENUM.DB_POST_FIND_ALL_QUERY_ERROR]:
    "Error while finding all posts from the database.",
  [DATABASE_CODE_ENUM.DB_POST_COUNT_ALL_QUERY_ERROR]:
    "Error while counting all posts from the database.",
  [DATABASE_CODE_ENUM.DB_POST_FIND_LATEST_QUERY_ERROR]:
    "Error while finding latest posts from the database.",
  [DATABASE_CODE_ENUM.DB_POST_DELETE_BY_ID_QUERY_ERROR]:
    "Error while deleting post with provided post id from the database.",
  [DATABASE_CODE_ENUM.DB_POST_COUNT_BY_TYPE_QUERY_ERROR]:
    "Error while counting posts with provided post type from the database.",
  [DATABASE_CODE_ENUM.DB_POST_FIND_BY_POST_ID_QUERY_ERROR]:
    "Error while finding post with provided post id from the database.",
  [DATABASE_CODE_ENUM.DB_POST_FIND_BY_USER_ID_QUERY_ERROR]:
    "Error while finding post(s) with provided user id from the database.",
  [DATABASE_CODE_ENUM.DB_POST_COUNT_BY_USER_ID_QUERY_ERROR]:
    "Error while counting post(s) with provided user id from the database.",
  [DATABASE_CODE_ENUM.DB_POST_FIND_BY_TYPE_LIMIT_QUERY_ERROR]:
    "Error while finding post(s) with provided post type from the database.",

  // ipo cards related codes

  // success

  [DATABASE_CODE_ENUM.DB_IPO_CARDS_CREATE_SUCCESS]:
    "Success in creating ipo card in the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_SUCCESS]:
    "Success in updating ipo card in the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_ALL_SUCCESS]:
    "Success in finding all ipo cards from the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_ID_SUCCESS]:
    "Success in finding ipo card with provided ipo card id from the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_DELETE_BY_IPO_ID_SUCCESS]:
    "Success in deleting ipo card with provided ipo card id from the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_NAME_SUCCESS]:
    "Success in finding ipo cards with provided ipo card name from the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_SUCCESS]:
    "Success in finding ipo cards with provided user id from the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_SUCCESS]:
    "Success in finding ipo cards with provided user name from the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_SUCCESS]:
    "Success in updating post id to ipo card in the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_SUCCESS]:
    "Success in removing post id to ipo card in the database.",

  // error

  [DATABASE_CODE_ENUM.DB_IPO_CARDS_CREATE_ERROR]:
    "Error in creating ipo card in the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_ERROR]:
    "Error in updating ipo card in the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_ALL_ERROR]:
    "Error in finding all ipo cards as no ipo cards exists in the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_ID_ERROR]:
    "Error in finding ipo card with provided ipo card id as no ipo cards exists in the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_DELETE_BY_IPO_ID_ERROR]:
    "Error in deleting ipo card with provided ipo card id as no ipo card exist in the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_NAME_ERROR]:
    "Error in finding ipo cards with provided ipo card name as no ipo cards exists in the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_ERROR]:
    "Error in finding ipo cards with provided user id as no ipo cards in the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_ERROR]:
    "Error in finding ipo cards with provided user name as no ipo cards in the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_ERROR]:
    "Error in adding post id to ipo card with provided ipo id as no ipo card exists in the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_DUPLICATE_ERROR]:
    "Error in adding post id to ipo card with provided post id as it is already in the ipo card in the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_ERROR]:
    "Error in removing post id to ipo card with provided ipo id as no ipo card exists in the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_MISSING_ERROR]:
    "Error in removing post id to ipo card with provided post id as it is no present in the ipo card in the database.",

  // query error

  [DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_QUERY_ERROR]:
    "Error while updating ipo card in the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_ALL_QUERY_ERROR]:
    "Error while finding all ipo cards from the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_ID_QUERY_ERROR]:
    "Error while finding ipo card with provided ipo card id from the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_DELETE_BY_IPO_ID_QUERY_ERROR]:
    "Error while deleting ipo card with provided ipo card id from the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_IPO_NAME_QUERY_ERROR]:
    "Error while finding ipo cards with provided ipo card name from the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_ID_CREATED_QUERY_ERROR]:
    "Error while finding ipo cards with provided user id from the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_FIND_BY_USER_NAME_CREATED_QUERY_ERROR]:
    "Error while finding ipo cards with provided user name from the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_ADD_BY_IPO_ID_QUERY_ERROR]:
    "Error while finding ipo cards with provided ipo id from the database.",
  [DATABASE_CODE_ENUM.DB_IPO_CARDS_UPDATE_POST_ID_REMOVE_BY_IPO_ID_QUERY_ERROR]:
    "Error while finding ipo cards with provided ipo id from the database.",

  // TAG

  // success
  [DATABASE_CODE_ENUM.DB_TAG_CREATE_SUCCESS]:
    "Success while creating TAG with provided post id in the database.",
  [DATABASE_CODE_ENUM.DB_TAG_FIND_BY_TAG_NAME_SUCCESS]:
    "Success while finding TAG with provided tag from the database.",
  [DATABASE_CODE_ENUM.DB_TAG_UPDATE_ADD_POST_BY_TAG_ID_SUCCESS]:
    "Success while adding post id to tag with provided post id in the database.",
  [DATABASE_CODE_ENUM.DB_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_SUCCESS]:
    "Success while removing post id to tag with provided post id in the database.",
  [DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_SUCCESS]:
    "Success while finding tag(s) with provided post id from the database.",
  [DATABASE_CODE_ENUM.DB_TAG_FIND_POST_BY_TAG_NAME_SUCCESS]:
    "Success while finding post(s) with provided tag name from the database.",
  [DATABASE_CODE_ENUM.DB_TAG_DELETE_BY_TAG_ID_SUCCESS]:
    "Success while deleting tag with provided tag id from the database.",
  // error
  [DATABASE_CODE_ENUM.DB_TAG_CREATE_ERROR]:
    "Error while creating TAG with provided post id in the database.",
  [DATABASE_CODE_ENUM.DB_TAG_FIND_BY_TAG_NAME_ERROR]:
    "Error while finding TAG with provided tag as tag does not exists in the database.",
  [DATABASE_CODE_ENUM.DB_TAG_UPDATE_BY_TAG_ID_ERROR]:
    "Error while adding post id to tag with provided tag id as no tag exists in the database.",
  [DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_ERROR]:
    "Error while finding tag(s) with provided post id as tag(s) does not exists from the database.",
  [DATABASE_CODE_ENUM.DB_TAG_FIND_POST_BY_TAG_NAME_ERROR]:
    "Error while finding post(s) with provided tag name as either no post(s) or tag(s) exists in the database.",
  [DATABASE_CODE_ENUM.DB_TAG_DELETE_BY_TAG_ID_ERROR]:
    "Error while deleting tag with provided tag id as tag does not exits in the database.",

  // query error
  [DATABASE_CODE_ENUM.DB_TAG_FIND_BY_TAG_NAME_QUERY_ERROR]:
    "Error while finding TAG with provided tag from database.",
  [DATABASE_CODE_ENUM.DB_TAG_UPDATE_ADD_POST_BY_TAG_ID_QUERY_ERROR]:
    "Error while finding and adding post to tag with provided tag id (finding) and post id (adding) from the database",
  [DATABASE_CODE_ENUM.DB_TAG_UPDATE_REMOVE_POST_BY_TAG_ID_QUERY_ERROR]:
    "Error while finding and removing post to tag with provided tag id (finding) and post id (removing) from the database",
  [DATABASE_CODE_ENUM.DB_TAG_FIND_BY_POST_ID_QUERY_ERROR]:
    "Error while finding tag(s) with provided post id as tag(s) from the database.",
  [DATABASE_CODE_ENUM.DB_TAG_FIND_POST_BY_TAG_NAME_QUERY_ERROR]:
    "Error while finding post(s) with provided tag name from the database.",
  [DATABASE_CODE_ENUM.DB_TAG_DELETE_BY_TAG_ID_QUERY_ERROR]:
    "Error while deleting tag with provided tag id from the database.",
};

export function DBResponseMessage(db_resp_code: DATABASE_CODE_ENUM): string {
  return DATABASE_RESPONSES_DETAILS[db_resp_code];
}
