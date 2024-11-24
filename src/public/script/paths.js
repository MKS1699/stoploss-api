const PATHS = [
  {
    path: "/",
    name: "Home",
    about:
      "This is the main path for visiting the API Server website and read the API documentation.",
  },
  {
    path: "/api/posts",
    name: "POSTS API.",
    about:
      "API paths related to the POSTS. It is main indexing path for various API paths for performing CRUD operations on posts.",
  },
  {
    path: "/api/users",
    name: "USERS API.",
    about:
      "API paths related to the USERS. It is main indexing path for various API USERS for performing  various CRUD operations.",
  },
  {
    path: "/api/ipo",
    name: "IPO API.",
    about:
      "API paths related to the IPO. It is main indexing path for various API paths for performing CRUD operations on IPO.",
  },
  {
    path: "/cronjob",
    name: "Cronjob.",
    about:
      "This path is simple an cronjob for performing the tasks of keeping the free instance of this server online 24x7 on render.com .",
  },
];

export default PATHS;
