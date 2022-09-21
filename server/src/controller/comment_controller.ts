import { Request, Response } from 'express';
const prisma = require('../db/index');

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
      await prisma.User.update({
        where: {
          user_id: user_id,
        },
        data: {
          user_point: { increment: 3 },
        },
      });
      const allComment = await prisma.Comment.findMany({});
      console.dir(allComment, { depth: null });
    };
    postCommentHandler(user_id, article_id, comment_content)
      .then(async () => {
        await prisma.$disconnect();
        res.status(201).send('post comment success');
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).send('Server Error');
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
          created_at: 'desc',
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
        res.status(500).send('Server Error');
      });
  },
  deleteComment: (req: Request, res: Response) => {
    const { user_id, comment_id } = req.body;
    const deleteCommentHandler = async (
      user_id: Number,
      comment_id: Number
    ) => {
      const result = await prisma.Comment.findMany({
        where: {
          id: comment_id,
        },
        select: {
          id: true,
          user_id: true,
          article_id: true,
        },
      });

      if (result[0].user_id === user_id) {
        await prisma.Comment.delete({
          where: {
            id: comment_id,
          },
        });

        await prisma.Article.update({
          where: {
            article_id: result[0].article_id,
          },
          data: {
            comment_count: { increment: -1 },
          },
        });

        await prisma.$disconnect();
        res.status(201).send('delete comment success');
      } else {
        await prisma.$disconnect();
        res.status(403).send("you're not the author");
      }
    };
    deleteCommentHandler(user_id, comment_id).catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      res.status(500).send('Server Error');
    });
  },
};
