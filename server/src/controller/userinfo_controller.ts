import { Request, Response } from 'express';
const prisma = require('../db/index');

module.exports = {
  userInfo: (req: Request, res: Response) => {
    const user_id = Number(req.query.user_id as String);
    const userInfoHandler = async (user_id: Number) => {
      const userInfo = await prisma.User.findMany({
        where: {
          user_id: user_id,
        },
        select: {
          user_id: true,
          user_address: true,
          user_nickname: true,
          user_introduction: true,
        },
      });
      return userInfo;
    };
    userInfoHandler(user_id)
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

  userArticle: (req: Request, res: Response) => {
    const user_id = Number(req.query.user_id as String);
    const userArticleHandler = async (user_id: Number) => {
      const myUserReadArticle = await prisma.Article.findMany({
        where: {
          user_id: user_id,
        },
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
        },
      });
      return myUserReadArticle;
    };
    userArticleHandler(user_id)
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

  userComment: (req: Request, res: Response) => {
    const user_id = Number(req.query.user_id as String);
    const userCommentHandler = async (user_id: Number) => {
      const allComment = await prisma.Comment.findMany({
        where: {
          user_id: user_id,
        },
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          article_id: true,
          user_id: true,
          comment_content: true,
          created_at: true,
        },
      });
      return allComment;
    };
    userCommentHandler(user_id)
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

  userLecture: (req: Request, res: Response) => {
    const user_id = Number(req.query.user_id as String);
    const userLectureHandler = async (user_id: Number) => {
      const allComment = await prisma.Lecture.findMany({
        where: {
          user_id: user_id,
        },
        orderBy: {
          created_at: 'desc',
        },
        select: {
          lecture_id: true,
          lecture_image: true,
          lecture_title: true,
          lecture_price: true,
        },
      });
      return allComment;
    };
    userLectureHandler(user_id)
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

  userClass: (req: Request, res: Response) => {
    const user_id = Number(req.query.user_id as String);
    const userClassHandler = async (user_id: Number) => {
      const allClass = await prisma.UserLecture.findMany({
        where: {
          user_id: user_id,
        },
        orderBy: {
          created_at: 'desc',
        },
        select: {
          lecture: {
            select: {
              lecture_id: true,
              lecture_image: true,
              lecture_title: true,
              lecture_price: true,
            },
          },
        },
      });
      return allClass;
    };
    userClassHandler(user_id)
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
};
