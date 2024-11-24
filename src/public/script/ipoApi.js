// IPO API Paths info
const IPO_API = [
  {
    path: "/api/ipo/create",
    method: "POST",
    name: "Create an IPO",
    about:
      "API Path for the creating a IPO in the DB. It takes an Object containing information on IPO. Code snippet of the IPO Object is also provided.",
    responses: [
      {
        status: "201",
        message: "New IPO created.",
        operation: "success",
        result: "Newly created IPO object from the DB query is provided.",
      },
      {
        status: "200",
        message: "Error creating New IPO.",
        operation: "success",
        result: "Error - Object containing information related to error.",
      },
      {
        status: "500",
        message: "Internal Server Error.",
        operation: "",
        result: "Error - Object containing information related to error.",
      },
    ],
    bodyArgs: [
      {
        name: "category",
        type: "string",
        about: "Category of the IPO which is one of the two values.",
        values: ["mainboard", "sme"],
      },
      {
        name: "dates",
        type: "Object",
        about: "Object containing various dates related to the objects.",
        subArgs: [
          {
            name: "listing",
            type: "string",
            about: "Listing date of the IPO.",
          },
          {
            name: "open",
            type: "string",
            about: "Opening date of the IPO.",
          },
          {
            name: "close",
            type: "string",
            about: "Closing date of the IPO.",
          },
        ],
      },
      {
        name: "logo",
        type: "Object",
        about: "Object containing links of the IPO Company.",
        subArgs: [
          {
            name: "original",
            type: "string",
            about:
              "Original image link provided from imgBB of the image uploaded at imgBB.",
          },
          {
            name: "thumbnail",
            type: "string",
            about:
              "Thumbnail image link provided from imgBB of the image uploaded at imgBB.",
          },
          {
            name: "medium",
            type: "string",
            about:
              "Medium image link provided from imgBB of the image uploaded at imgBB.",
          },
        ],
      },
      {
        name: "exPremium",
        type: "string",
        about: "Expected Premium of the IPO.",
      },
      {
        name: "linkedPostsId",
        type: "string Array",
        about:
          "Contains post Ids of various posts related to the IPO in the array format could be empty.",
      },
      {
        name: "lotSize",
        type: "string",
        about: "Lot Size of the IPO.",
      },
      {
        name: "name",
        type: "string",
        about: "Name of the IPO.",
      },
      {
        name: "offerPrice",
        type: "string",
        about: "Offer Price of the IPO.",
      },
      {
        name: "status",
        type: "string",
        about: "Status of the IPO. Takes one of the three listed values.",
        values: ["closed", "apply", "pre-apply"],
      },
      {
        name: "subscription",
        type: "string",
        about: "Subscription of the IPO",
      },
      {
        name: "allotmentLink",
        type: "string",
        about: "URL to registrar of the IPO.",
      },
      {
        name: "allotmentStatus",
        type: "boolean",
        about:
          "Telling about the allotment status of the IPO. True - IPO allotment is out. False - IPO allotment is not out.",
      },
      {
        name: "ipoPhase",
        type: "string",
        about:
          "Tells about the phase of the IPO.Takes only one of the three listed values.",
        values: ["upcoming", "current", "listed"],
      },
    ],
    middlewares: ["verifyToken"],
  },
  {
    path: "/api/ipo/get",
    method: "GET",
    name: "GetAll IPO",
    about: "Get all the IPO stored from the DB.",
    responses: [
      {
        status: "200",
        message: "All IPO fetched successfully.",
        operation: "success",
        result: "ALL_IPO - Object containing all IPO from the DB.",
      },
      {
        status: "202",
        message: "No IPO stored in the DB.",
        operation: "fail",
        result:
          "ALL_IPO - Object containing all IPO from the DB which will be `null`.",
      },
      {
        status: "404",
        message: "Error while getting all the IPO.",
        operation: "error",
        result:
          "Error - Object containing information related to error which is from the DB.",
      },
      {
        status: "500",
        message: "Internal Server Error",
        operation: "",
        result:
          "Error - Object containing information related to error which is from the server.",
      },
    ],
    bodyArgs: [],
    middlewares: [],
  },
  {
    path: "/api/ipo/get/id",
    method: "POST",
    name: "Get an IPO by id.",
    about: "Get an IPO by it id from the DB.",
    responses: [
      {
        status: "200",
        message: "IPO found.",
        operation: "success",
        result: "ipo - Object containing information of the ipo.",
      },
      {
        status: "202",
        message: "IPO with `${id}` does not exist.",
        operation: "fail",
        result: "ipo - Object which will be null",
      },
      {
        status: "400",
        message: "Error finding IPO by Id.",
        operation: "error",
        result: "Error - Object containing information on error from the db.",
      },
      {
        status: "500",
        message: "Internal Server Error.",
        operation: "",
        result:
          "Error - Object containing information on error from the server.",
      },
    ],
    bodyArgs: [
      {
        name: "id",
        type: "string",
        about:
          "Unique id which is created by the mongoDb for a object being stored in the DB.",
      },
    ],
    middlewares: [],
  },
  {
    path: "/api/ipo/get/name",
    method: "POST",
    name: "Get IPO by name.",
    about: "Get information of a IPO by its name which is stored in the db.",
    responses: [
      {
        status: "200",
        message: "IPO found.",
        operation: "success",
        result: "ipo - Object containing all the information of the ipo.",
      },
      {
        status: "202",
        message: "`IPO with ${name} does not exist.`",
        operation: "fail",
        result: "ipo - Object will be null",
      },
      {
        status: "400",
        message: "Error finding IPO by Name.",
        operation: "error",
        result: "Error - Object containing information on error from the db.",
      },
      {
        status: "500",
        message: "Internal Server Error.",
        operation: "",
        result:
          "Error - Object containing information on error from the server.",
      },
    ],
    bodyArgs: [
      {
        name: "name",
        type: "string",
        about: "Name of the IPO which is stored in the db.",
      },
    ],
    middlewares: [],
  },
  {
    path: "/api/ipo/update",
    method: "POST",
    about: "Update an IPO",
    about:
      "Update an IPO or one of its information based on is of the IPO which is already stored in the db.",
    responses: [
      {
        status: "201",
        message: "IPO found and updated.",
        operation: "success",
        result: "updatedIPO - Object of updated IPO.",
      },
      {
        status: "202",
        message: "IPO with `${id}` not found.",
        operation: "fail",
        result: "updatedIPO - Object will be null",
      },
      {
        status: "500",
        message: "Internal Server Error.",
        operation: "",
        result: "Error - Object which contains information on error.",
      },
    ],
    bodyArgs: [
      {
        name: "id",
        type: "string",
        about:
          "Id of the IPO which will be updated which is present in the db.",
      },
      {
        name: "ipoUpdate",
        type: "Object",
        about:
          "It is an Object with the same structure as of an IPO in creating one.",
      },
    ],
    middlewares: ["verifyToken"],
  },
  {
    path: "/api/ipo/update/add/postId",
    method: "POST",
    name: "Add Post Id to an IPO",
    about:
      "Update the `linkedPostsId` field of the IPO by adding one more post Id which is not present already in the field.",
    responses: [
      {
        status: "201",
        message: "Post Id added successfully to IPO.",
        operation: "success",
        result: "updatedIPO - Object IPO which is updated.",
      },
      {
        status: "202",
        message: "Post already linked with IPO.",
        operation: "duplicate",
        result: "IPO - Object IPO which is not updated as there is no need.",
      },
      {
        status: "200",
        message: "IPO with `${ipoId}` doesn't exist.",
        operation: "fail",
        result: "IPO - Object which is null.",
      },
      {
        status: "500",
        message: "Internal Server Error.",
        operation: "",
        result: "Error - Object containing error related information.",
      },
    ],
    bodyArgs: [
      {
        name: "ipoId",
        type: "string",
        about: "Id of the IPO which is in the db in `ipos` collection.",
      },
      {
        name: "postId",
        type: "string",
        about: "Id of the post which is in the db in `posts` collection.",
      },
    ],
    middlewares: ["verifyToken"],
  },
  {
    path: "/api/ipo/update/remove/postId",
    method: "DELETE",
    name: "Delete Post Id from IPO",
    about: "Delete a postId which is in the IPO Object.",
    responses: [
      {
        status: "201",
        message: "Post Id removed successfully from IPO.",
        operation: "success",
        result: "updatedIPO - Object IPO which is updated.",
      },
      {
        status: "202",
        message: "Post Id is not linked with IPO.",
        operation: "null",
        result: "IPO - Object IPO which is not updated as there is no need.",
      },
      {
        status: "200",
        message: "IPO with `${ipoId}` doesn't exist.",
        operation: "fail",
        result: "IPO - Object which is null.",
      },
      {
        status: "500",
        message: "Internal Server Error.",
        operation: "",
        result: "Error - Object containing error related information.",
      },
    ],
    bodyArgs: [
      {
        name: "ipoId",
        type: "string",
        about: "Id of the IPO which is in the db in `ipos` collection.",
      },
      {
        name: "postId",
        type: "string",
        about: "Id of the post which is in the db in `posts` collection.",
      },
    ],
    middlewares: ["verifyToken"],
  },
  {
    path: "/api/ipo/delete",
    method: "DELETE",
    name: "Delete an IPO",
    about: "Delete an IPO from db with the IPO Id.",
    responses: [
      {
        status: "200",
        message: "IPO deleted successfully.",
        operation: "success",
        result: "deletedIPO - Object which was deleted.",
      },
      {
        status: "202",
        message: "IPO does not exists with id : `${id}` .",
        operation: "fail",
        result: "deletedIPO - Object which is null.",
      },
      {
        status: "500",
        message: "Internal Server Error",
        operation: "",
        result: "Error - Object containing information on the error.",
      },
    ],
    bodyArgs: [
      {
        name: "id",
        type: "string",
        about: "Id of the IPO which is in db.",
      },
    ],
    middlewares: ["verifyToken"],
  },
];

export default IPO_API;
