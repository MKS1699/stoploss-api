// POSTS API Paths info
const POSTS_API = [
  {
    path: "/api/posts/get/id",
    requestType: "POST",
    name: "Get Post by Id",
    about: "Get a post from the db by its id.",
    responses: [
      {
        status: "401",
        message: "Post with id :` ${id}` doesn't exist.",
        operation: "true",
        result: "post - Object which is null",
      },
      {
        status: "200",
        message: "Post found.",
        operation: "true",
        result: "post - Object which contains post info.",
      },
      {
        status: "500",
        message: "Internal Server Error.",
        operation: "false",
        result: "error - Object containing error info.",
      },
    ],
    bodyArgs: [
      {
        name: "id",
        type: "string",
        about: "Id of the post.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
    ],
    middlewares: [],
  },
  {
    path: "/api/posts/get/type",
    requestType: "POST",
    name: "Get Posts by Type with limit",
    about:
      "Get posts of specific type with the limit on number of posts of the type, by default 10 is provided.",
    responses: [
      {
        status: "401",
        message: "Posts of type : `${postType}` does not exist.",
        operation: "true",
        result: "post - Object which is null",
      },
      {
        status: "200",
        message: "Posts found.",
        operation: "true",
        result: "posts - Object which is contains posts of `postType.`",
      },
      {
        status: "500",
        message: "Internal Server Error",
        operation: "false",
        result: "error - Object which is contains information on error.",
      },
    ],
    bodyArgs: [
      {
        name: "postType",
        type: "string",
        about: "Type of the posts which will be fetched from the db.",
        values: [
          "ipo",
          "news",
          "tutorial",
          "blog",
          "sponsored_post",
          "company_profile",
        ],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "limit",
        type: "number",
        about: "The number of posts that will be fetched by default it is 10.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
    ],
    middlewares: [],
  },
  {
    path: "/api/posts/get/type/pagination",
    requestType: "POST",
    name: "Get posts in pagination format.",
    about:
      "This path can be used to get posts of specific type in pagination format like from newest post to oldest post with limit, in batches.",
    responses: [
      {
        status: "200",
        message: "Post Found.",
        operation: "true",
        result: "result - Object containing posts.",
      },
      {
        status: "401",
        message: "Please provide postType of the posts to get. 'postType' ",
        operation: "",
        result: "",
      },
      {
        status: "401",
        message:
          "Please provide postUpdatedOfLastElement date of the last posts to get. 'postUpdatedOfLastElement'",
        operation: "",
        result: "",
      },
      {
        status: "500",
        message: "Internal Server Error",
        operation: "",
        result: "error - Object containing error information.",
      },
    ],
    bodyArgs: [
      {
        name: "postUpdateOfLastElement",
        type: "Date",
        about:
          "postUpdated - which is of type date of the last element(post) of the already fetched batch.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "postType",
        type: "string",
        about: "Type of the posts which will be fetched from the db.",
        values: [
          "ipo",
          "news",
          "tutorial",
          "blog",
          "sponsored_post",
          "company_profile",
        ],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "limit",
        type: "number",
        about: "The number of posts that will be fetched by default it is 10.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
    ],
    middlewares: [],
  },
  {
    path: "/api/get/latest",
    name: "Get latest posts.",
    about:
      "This path will fetch the latest posts in the db irrespective of the postType.",
    requestType: "GET",
    responses: [
      {
        status: "200",
        message: "Latest Posts",
        operation: "",
        result: "result - Object containing latest posts.",
      },
      {
        status: "500",
        message: "Internal Server Error",
        operation: "",
        result: "error - Object containing error information.",
      },
    ],
    bodyArgs: [
      {
        name: "",
        type: "",
        about: "",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
    ],
    middlewares: [],
  },
  {
    path: "/api/posts/get/user",
    requestType: "POST",
    name: "Get posts created by user.",
    about:
      "This path gets the posts created by the user from the db, this path can also be used for the pagination type.",
    responses: [
      {
        status: "200",
        message: "Post found",
        operation: "true",
        result: "result - Object containing posts.",
      },
      {
        status: "200",
        message: "There are no posts by the user `${userId}`.",
        operation: "",
        result: "",
      },
      {
        status: "500",
        message: "Error occurred while finding posts.",
        operation: "",
        result: "",
      },
      {
        status: "401",
        message: "UserId not provided",
        operation: "",
        result: "",
      },
      {
        status: "500",
        message: "Internal Server Error.",
        operation: "",
        result: "error - Object containing error related Information.",
      },
    ],
    bodyArgs: [
      {
        name: "userId",
        type: "string",
        about: "Id of the user by whose posts created are to be fetched.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "limit",
        type: "number",
        about:
          "The number of posts to be fetched in one go , by default the number is 10.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "fromLastPostDate",
        type: "Date",
        about:
          "postUpdated of the last element(post) of the previously fetched post. This argument is an optional argument.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
    ],
    middlewares: [],
  },
  {
    path: "/api/posts/count/type",
    requestType: "POST",
    name: "Get the number of posts in the db by postType.",
    about: "",
    responses: [
      {
        status: "200",
        message: "Posts Found",
        operation: "",
        result: "result - Object containing all info.",
      },
      {
        status: "424",
        message: "Please provide type of posts `postType`",
        operation: "",
        result: "",
      },
      {
        status: "500",
        message: "Internal Server Error",
        operation: "",
        result: "error - Object containing error related info.",
      },
    ],
    bodyArgs: [
      {
        name: "postType",
        type: "string",
        about: "Type of the posts which will be fetched from the db.",
        values: [
          "ipo",
          "news",
          "tutorial",
          "blog",
          "sponsored_post",
          "company_profile",
        ],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
    ],
    middlewares: [],
  },
  {
    path: "/api/posts/count/all",
    requestType: "GET",
    name: "Get number of all posts in the db.",
    about: "Get number of all posts in the db.",
    responses: [
      {
        status: "200",
        message: "Posts found",
        operation: "",
        result: "result - Object containing all info.",
      },
      {
        status: "500",
        message: "Internal Server Error.",
        operation: "",
        result: "error - Object containing information on error.",
      },
    ],
    bodyArgs: [
      {
        name: "",
        type: "",
        about: "",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
    ],
    middlewares: [],
  },
  {
    path: "/api/posts/count/user",
    requestType: "POST",
    name: "Get posts number by user.",
    about: "Get the number of posts in the db by user.",
    responses: [
      {
        status: "200",
        message: "",
        operation: "",
        result: "result - Object containing info.",
      },
      {
        status: "401",
        message: "Please provide id of the user `userId``.",
        operation: "",
        result: "",
      },
      {
        status: "500",
        message: "Internal Server Error",
        operation: "",
        result: "error - Object containing all Info.",
      },
    ],
    bodyArgs: [
      {
        name: "userId",
        type: "string",
        about: "Id of the user.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
    ],
    middlewares: [],
  },
  {
    path: "/api/posts/tags",
    requestType: "POST",
    name: "Get Tag Related to Post",
    about: "This path gets the tags which are related to the post.",
    responses: [
      {
        status: "200",
        message: "",
        operation: "",
        result: "result - Object containing information",
      },
      {
        status: "401",
        message: "Please provide `tag`.",
        operation: "",
        result: "",
      },
      {
        status: "500",
        message: "Internal Server Error.",
        operation: "",
        result: "error - Object containing information on error.",
      },
    ],
    bodyArgs: [
      {
        name: "tag",
        type: "string",
        about: "Tag which is related to the post.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
    ],
    middlewares: [],
  },
  {
    path: "/api/posts/createPost",
    requestType: "POST",
    name: "Create New Post",
    about: "This path lets the user create a new Post store in the db.",
    responses: [
      {
        status: "201",
        message: "",
        operation: "",
        result: "RESULT - Object containing info.",
      },
      {
        status: "500",
        message: "Internal Server Error",
        operation: "",
        result: "error - Object containing error related information.",
      },
    ],
    bodyArgs: [
      {
        name: "postTitle",
        type: "string",
        about: "Title of the post.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "postAuthors",
        type: "Array String",
        about: "Authors of the post.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "postType",
        type: "string",
        about: "Type of the post  which is being created.",
        values: [
          "ipo",
          "news",
          "tutorial",
          "blog",
          "sponsored_post",
          "company_profile",
        ],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "postCreated",
        type: "string | Date",
        about:
          "Date of the post created. It is automatically created by the app.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "postUpdated",
        type: "string | Date",
        about:
          "Date of the post updated. It is automatically created by the app.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "postImage",
        type: "Object",
        about:
          "This object contains links to the image which will be used as main image for the post.",
        values: [],
        subArgs: [
          {
            name: "links",
            type: "Object",
            about: "This contain all the links of the image.",
            subArgs: [
              {
                name: "original",
                type: "string",
                about: "Link to the image from the imgBB.",
              },
              {
                name: "medium",
                type: "string",
                about: "Link to the image from the imgBB.",
              },
              {
                name: "thumbnail",
                type: "string",
                about: "Link to the image from the imgBB.",
              },
            ],
          },
          {
            name: "caption",
            type: "string",
            about: "Caption for the image.",
          },
        ],
      },
      {
        name: "hasImage",
        type: "boolean",
        about: "Tells whether the post has image or not.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "postTags",
        type: "Array String",
        about: "Tags related to the post.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "postDescription",
        type: "string",
        about: "Description of the post.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "postInfo",
        type: "this will be depreciated.",
        about: "",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "createdBy",
        type: "Object",
        about:
          "This will contain information of the user who is creating the post.",
        values: [],
        subArgs: [
          {
            name: "name",
            type: "string",
            about: "Name of the user. This is automatically added by the app.",
          },
          {
            name: "id",
            type: "string",
            about:
              "Id of the user who is creating. This is automatically added by the app.",
          },
        ],
      },
      {
        name: "postExternalLinks",
        type: "Array String",
        about: "External Links for the post.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
      {
        name: "postParagraph",
        type: "Array Objects",
        about:
          "This will be an array of objects where each object will be a paragraph of the post. The para object structure is defined in the sub arguments section.",
        values: [],
        subArgs: [
          {
            name: "paraHeading",
            type: "string",
            about: "Heading of the para.",
          },
          {
            name: "paraSubHeading",
            type: "string",
            about: "Sub heading of the para.",
          },
          {
            name: "paraBody",
            type: "string",
            about: "Body of the para.",
          },
          {
            name: "hasImages",
            type: "boolean",
            about: "This key tells whether the para has images or not.",
          },
          {
            name: "hasTable",
            type: "boolean",
            about:
              "This key tells whether the body has any graphical table or not.",
          },
          {
            name: "paraTable",
            type: "Array of Array of Strings | String[][] | [['string', 'string', 'string'],['string', 'string', 'string'],['string', 'string', 'string']]",
            about: "This is table data for currently only bar graphs.",
          },
          {
            name: "paraImages",
            type: "Object",
            about:
              "This contain Links and caption of the image which is uploaded at imgBB.",
            subArgs: [
              {
                name: "links",
                type: "Object",
                about: "This contain all the links of the image.",
                subArgs: [
                  {
                    name: "original",
                    type: "string",
                    about: "Link to the image from the imgBB.",
                  },
                  {
                    name: "medium",
                    type: "string",
                    about: "Link to the image from the imgBB.",
                  },
                  {
                    name: "thumbnail",
                    type: "string",
                    about: "Link to the image from the imgBB.",
                  },
                ],
              },
              {
                name: "caption",
                type: "string",
                about: "Caption for the image.",
              },
            ],
          },
        ],
      },
      {
        name: "",
        type: "",
        about: "",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
    ],
    middlewares: ["verifyToken"],
  },
  {
    path: "/api/posts/delete",
    requestType: "DELETE",
    name: "Delete a post.",
    about: "This path lets you delete a post by postId.",
    responses: [
      {
        status: "201",
        message: "Post deleted successfully.",
        operation: "",
        result: "",
      },
      {
        status: "401",
        message: "Please provide postId of the post to delete.",
        operation: "",
        result: "",
      },
      {
        status: "403",
        message: "Post with postId does not exist on db.",
        operation: "",
        result: "",
      },
      {
        status: "500",
        message: "Internal Server Error",
        operation: "",
        result: "error - Object containing information related to error.",
      },
    ],
    bodyArgs: [
      {
        name: "postId",
        type: "string",
        about: "Id of the post.",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
    ],
    middlewares: [],
  },
  {
    path: "",
    requestType: "",
    name: "",
    about: "",
    responses: [
      {
        status: "",
        message: "",
        operation: "",
        result: "",
      },
    ],
    bodyArgs: [
      {
        name: "",
        type: "",
        about: "",
        values: [],
        subArgs: [
          {
            name: "",
            type: "",
            about: "",
          },
        ],
      },
    ],
    middlewares: [],
  },
];

export default POSTS_API;
