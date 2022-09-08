import { Request, Response } from "express";
const prisma = require("../db/index");

module.exports = {
  postArticle: (req: Request, res: Response) => {
    const { user_address, article_content } = req.body;
    const postArticleHandler = async (
      user_address: String,
      article_content: String
    ) => {
      await prisma.Article.create({
        data: {
          user_address: user_address,
          article_content: article_content,
        },
      });
      const allArticle = await prisma.Article.findMany({});
      console.dir(allArticle, { depth: null });
    };
    postArticleHandler(user_address, article_content)
      .then(async () => {
        await prisma.$disconnect();
        res.status(201).send("post article success");
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).send("Server Error");
      });
  },
  readRecentArticle: (req: Request, res: Response) => {
    const readRecentArticleHandler = async () => {
      const allRecentArticle = await prisma.Article.findMany({
        orderBy: {
          created_at: "desc",
        },
      });
      console.dir(allRecentArticle, { depth: null });
      return allRecentArticle;
    };
    readRecentArticleHandler()
      .then(async (result) => {
        console.log(`result= ${result}`);
        await prisma.$disconnect();
        res.status(201).json(result);
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).send("Server Error");
      });
  },
  readLikeArticle: (req: Request, res: Response) => {
    const readLikeArticleHandler = async () => {
      const allLikeArticle = await prisma.Article.findMany({
        orderBy: [
          {
            like_count: "desc",
          },
          {
            created_at: "desc",
          },
        ],
      });
      console.dir(allLikeArticle, { depth: null });
      return allLikeArticle;
    };
    readLikeArticleHandler()
      .then(async (result) => {
        console.log(`result= ${result}`);
        await prisma.$disconnect();
        res.status(201).json(result);
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).send("Server Error");
      });
  },
  editArticle: (req: Request, res: Response) => {
    const { user_address, article_id, article_content } = req.body;
    const editArticleHandler = async (
      user_address: String,
      article_id: Number,
      article_content: String
    ) => {
      const result = await prisma.Article.findMany({
        where: {
          article_id: article_id,
        },
        select: {
          user_address: true,
        },
      });

      if (result[0].user_address === user_address) {
        await prisma.Article.update({
          where: {
            article_id: article_id,
          },
          data: { article_content: article_content },
        });
        const editedArticle = await prisma.Article.findUnique({
          where: {
            article_id: article_id,
          },
        });
        console.dir(editedArticle, { depth: null });

        await prisma.$disconnect();
        res.status(201).send("edit article success");
      } else {
        await prisma.$disconnect();
        res.status(403).send("you're not the author");
      }
    };
    editArticleHandler(user_address, article_id, article_content).catch(
      async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).send("Server Error");
      }
    );
  },
  deleteArticle: (req: Request, res: Response) => {
    const { user_address, article_id } = req.body;
    const deleteArticleHandler = async (
      user_address: String,
      article_id: Number
    ) => {
      const result = await prisma.Article.findMany({
        where: {
          article_id: article_id,
        },
        select: {
          user_address: true,
        },
      });

      if (result[0].user_address === user_address) {
        await prisma.Article.delete({
          where: {
            article_id: article_id,
          },
        });

        await prisma.$disconnect();
        res.status(201).send("delete article success");
      } else {
        await prisma.$disconnect();
        res.status(403).send("you're not the author");
      }
    };
    deleteArticleHandler(user_address, article_id).catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      res.status(500).send("Server Error");
    });
  },
};
