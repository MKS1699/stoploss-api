import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { stoplossConnect } from "./db/connection/connect_db";
import { postRouter, userRouter, ipoRouter } from "./router";
import path from "path";
import bodyParser from "body-parser";
import { API_RESPONSE_CODE_ENUM } from "./tools/apiResponseCodes";
import { createAPIResponse } from "./tools/apiResponse";

// this is for testing purpose only
// import {
//   // NSE,
//   eqInstruments,
//   // fuInstruments,
//   indexInstruments,
//   // intraInstruments,
//   // mtfInstruments,
//   // opInstruments,
//   // other,
// } from "./tools/sharemarket_instruments";

const PORT = process.env.PORT || 6969;
const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// static files (public html serving)
// app.use("/", express.static(path.join(__dirname, "public")));

// All the API routes are added from here.
// Users API Routes
app.use("/api/users", userRouter);
// POST API Routes
app.use("/api/posts", postRouter);

// ipo routes
app.use("/api/ipo/", ipoRouter);

/* This is a cron-job path for keeping the service active
 * always while using free web service instance from render.com
 */
app.get("/cronjob", (_, res: express.Response) => {
  try {
    res
      .status(200)
      .json({ operation: "success", message: "Operation Successful" });
  } catch (error) {
    res.status(500).json({
      operation: "error",
      message: "Unable to perform cronjob . Server Error",
      error,
    });
  }
});

// this is for testing purpose only
app.get("/nse", (_, res: express.Response) => {
  // eqInstruments,
  // fuInstruments,
  // indexInstruments,
  // intraInstruments,
  // mtfInstruments,
  // opInstruments,
  // other,
  res.status(200).json("working");
});

// 404 routes
app.all("*", (req: express.Request, res: express.Response) => {
  const requestedPath = req.originalUrl;
  const requestMethod = req.method;

  const apiResult = {
    info: "This is an invalid request path. Please request at a valid path",
    requestedPath,
    requestMethod,
    timestamp: new Date().toISOString(),
  };

  const apiResponse = createAPIResponse({
    code: API_RESPONSE_CODE_ENUM.API_INVALID_REQUEST_ERROR,
    success: false,
    result: apiResult,
  });

  return res.status(404).json(apiResponse);
});

// connecting to db
stoplossConnect(); // stopped this currently

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}/`);
});
