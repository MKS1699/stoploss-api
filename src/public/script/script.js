import PATHS from "./paths.js";
import IPO_API from "./ipoApi.js";
import USERS_API from "./userApi.js";
import POSTS_API from "./postApi.js";
import MIDDLEWARES from "./middlewares.js";

console.log(PATHS, MIDDLEWARES, IPO_API, USERS_API, POSTS_API);

// API paths object
// [
//   {
//     path: "",
//     requestType: "",
//     name: "",
//     about: "",
//     responses: [
//       {
//         status: "",
//         message: "",
//         operation: "",
//         result: "",
//       },
//     ],
//     bodyArgs: [
//       {
//         name: "",
//         type: "",
//         about: "",
//         values: [],
//         subArgs: [
//           {
//             name: "",
//             type: "",
//             about: "",
//           },
//         ],
//       },
//     ],
//     middlewares: [],
//   },
// ];
