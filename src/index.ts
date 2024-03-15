import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { stoplossConnect } from "./db/connection/connect_db";
import { postRouter, userRouter } from "./router";
import path from "path";

const PORT = process.env.PORT || 6969;
const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// static files (public html serving)
app.use("/", express.static(path.join(__dirname, "public")));
// All the API routes are added from here.
// Users API Routes
app.use("/api/users", userRouter);
// POST API Routes
app.use("/api/posts", postRouter);

/* This is a cron-job path for keeping the service active
 * always while using free web service instance from render.
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

// 404 routes
app.all("*", (_, res: express.Response) => {
  res.send("404 not found.");
  // Need to do more logic here
});

// connecting to db
stoplossConnect();

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}/`);
});
