import { Request, Response } from "express";
const prisma = require("../db/index");

module.exports = {
  postComment: (req: Request, res: Response) => {
    const { user_id, article_id, comment_content } = req.body;
    const postCommentHandler = async (
      user_id: Number,
      article_id: Number,
      comment_content: String
    ) => {
      await prisma.Comment.create({
        data: {
          user_id: user_id,
          article_id: article_id,
          comment_content: comment_content,
        },
      });

      await prisma.Article.update({
        where: { article_id: article_id },
        data: { comment_count: { increment: 1 } },
      });
      const allComment = await prisma.Comment.findMany({});
      console.dir(allComment, { depth: null });
    };
    postCommentHandler(user_id, article_id, comment_content)
      .then(async () => {
        await prisma.$disconnect();
        res.status(201).send("post comment success");
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).send("Server Error");
      });
  },
  readComment: (req: Request, res: Response) => {
    const article_id: String = req.query.article_id as String;
    const numArticleId = Number(article_id);
    const readCommentHandler = async (numArticleId: Number) => {
      const allComment = await prisma.Comment.findMany({
        where: {
          article_id: numArticleId,
        },
        orderBy: {
          created_at: "desc",
        },
        include: {
          user: true,
        },
      });
      console.dir(allComment, { depth: null });
      return allComment;
    };
    readCommentHandler(numArticleId)
      .then(async (result) => {
        await prisma.$disconnect();
        res.status(201).json(result);
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).send("Server Error");
      });
  },
};
