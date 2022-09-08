import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const articleRouter = require("./router/article");
const commentRouter = require("./router/comment");
const likeRouter = require("./router/like");
const lectureRouter = require("./router/lecture");
const userLectureRouter = require("./router/user_lecture");

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/article", articleRouter);
app.use("/comment", commentRouter);
app.use("/like", likeRouter);
app.use("/lecture", lectureRouter);
app.use("/userlecture", userLectureRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Havruta DAO");
});

app.listen(PORT, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT}🛡️
  ################################################
`);
});
