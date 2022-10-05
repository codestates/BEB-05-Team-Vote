import { Request, Response, NextFunction } from 'express';
const prisma = require('../db/index');

module.exports = {
  postArticle: (req: Request, res: Response) => {
    const { user_id, article_content } = req.body;
    const postArticleHandler = async (user_id: Number, article_content: String) => {
      await prisma.Article.create({
        data: {
          user_id: user_id,
          article_content: article_content,
        },
      });
    };
    postArticleHandler(user_id, article_content)
      .then(async () => {
        await prisma.$disconnect();
        res.status(201).send('post article success');
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).send('Server Error');
      });
  },
  readRecentArticle: (req: Request, res: Response) => {
    const readRecentArticleHandler = async () => {
      const allRecentArticle = await prisma.Article.findMany({
        orderBy: {
          created_at: 'desc',
        },
        select: {
          article_id: true,
          user_id: true,
          article_content: true,
          comment_count: true,
          like_count: true,
          created_at: true,
          user: {
            select: {
              user_nickname: true,
            },
          },
        },
      });
      return allRecentArticle;
    };
    readRecentArticleHandler()
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
  readLikeArticle: (req: Request, res: Response) => {
    const readLikeArticleHandler = async () => {
      const allLikeArticle = await prisma.Article.findMany({
        orderBy: [
          {
            like_count: 'desc',
          },
          {
            created_at: 'desc',
          },
        ],
        select: {
          article_id: true,
          user_id: true,
          article_content: true,
          comment_count: true,
          like_count: true,
          created_at: true,
          user: {
            select: {
              user_nickname: true,
            },
          },
        },
      });
      return allLikeArticle;
    };
    readLikeArticleHandler()
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
  readSelectedArticle: (req: Request, res: Response) => {
    const article_id: Number = Number(req.query.article_id as String);

    const readSelectedArticleHandler = async (article_id: Number) => {
      const result = await prisma.Article.findMany({
        where: {
          article_id: article_id,
        },
        select: {
          article_id: true,
          user_id: true,
          article_content: true,
          comment_count: true,
          like_count: true,
          created_at: true,
          user: {
            select: {
              user_nickname: true,
            },
          },
          comments: {
            orderBy: {
              created_at: 'desc',
            },
            select: {
              id: true,
              comment_content: true,
              created_at: true,
              user: {
                select: {
                  user_id: true,
                  user_nickname: true,
                },
              },
            },
          },
        },
      });
      await prisma.$disconnect();
      res.status(201).json(result);
    };
    readSelectedArticleHandler(article_id).catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      res.status(500).send('Server Error');
    });
  },
  editArticle: (req: Request, res: Response) => {
    const { user_id, article_id, article_content } = req.body;
    const editArticleHandler = async (
      user_id: Number,
      article_id: Number,
      article_content: String
    ) => {
      const result = await prisma.Article.findMany({
        where: {
          article_id: article_id,
        },
        select: {
          user_id: true,
        },
      });

      if (result[0].user_id === user_id) {
        await prisma.Article.update({
          where: {
            article_id: article_id,
          },
          data: { article_content: article_content },
        });

        await prisma.$disconnect();
        res.status(201).send('edit article success');
      } else {
        await prisma.$disconnect();
        res.status(403).send("you're not the author");
      }
    };
    editArticleHandler(user_id, article_id, article_content).catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      res.status(500).send('Server Error');
    });
  },
  deleteArticle: (req: Request, res: Response) => {
    const { user_id, article_id } = req.body;
    const deleteArticleHandler = async (user_id: Number, article_id: Number) => {
      const result = await prisma.Article.findMany({
        where: {
          article_id: article_id,
        },
        select: {
          user_id: true,
        },
      });

      if (result[0].user_id === user_id) {
        await prisma.Like.deleteMany({
          where: {
            article_id: article_id,
          },
        });

        await prisma.Comment.deleteMany({
          where: {
            article_id: article_id,
          },
        });

        await prisma.Article.delete({
          where: {
            article_id: article_id,
          },
        });
        await prisma.$disconnect();
        res.status(201).send('delete article success');
      } else {
        await prisma.$disconnect();
        res.status(403).send("you're not the author");
      }
    };
    deleteArticleHandler(user_id, article_id).catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      res.status(500).send('Server Error');
    });
  },
};
