import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 6969;

app.get("/", (_, res: express.Response) => {
  res.send("working Good");
});

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}/`);
});
