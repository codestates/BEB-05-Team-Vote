import { Request, Response } from "express";
const prisma = require("../db/index");

module.exports = {
  postLike: (req: Request, res: Response) => {
    const { user_address, article_id } = req.body;
    const postLikeHandler = async (
      user_address: String,
      article_id: Number
    ) => {
      const result = await prisma.Like.findMany({
        where: {
          article_id: article_id,
        },
        select: {
          id: true,
          user_address: true,
          article_id: true,
        },
      });
      let isLikedId;
      let isLiked = false;
      const findIsLiked = () => {
        for (let i = 0; i < result.length; i++) {
          if (result[i].user_address === user_address) {
            isLiked = true;
            isLikedId = result[i].id;
            break;
          } else {
            continue;
          }
        }
      };
      findIsLiked();

      if (isLiked) {
        await prisma.Like.delete({
          where: {
            id: isLikedId,
          },
        });

        await prisma.Article.update({
          where: { article_id: article_id },
          data: { like_count: { increment: -1 } },
        });

        await prisma.$disconnect();
        res.status(201).send("delete like success");
        return;
      } else {
        await prisma.Like.create({
          data: {
            user_address: user_address,
            article_id: article_id,
          },
        });

        await prisma.Article.update({
          where: { article_id: article_id },
          data: { like_count: { increment: 1 } },
        });

        await prisma.$disconnect();
        res.status(201).send("post like success");
      }
    };
    postLikeHandler(user_address, article_id).catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      res.status(500).send("Server Error");
    });
  },
};
