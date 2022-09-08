import { Request, Response } from "express";
const prisma = require("../db/index");

module.exports = {
  postUserLecture: (req: Request, res: Response) => {
    const { user_address, lecture_title } = req.body;
    const postUserLectureHandler = async (
      user_address: String,
      lecture_title: String
    ) => {
      const checkUserLecture = await prisma.UserLecture.findMany({
        where: {
          user_address: user_address,
          lecture_title: lecture_title,
        },
      });
      if (checkUserLecture[0] === undefined) {
        await prisma.UserLecture.create({
          data: {
            user_address: user_address,
            lecture_title: lecture_title,
          },
        });

        await prisma.$disconnect();
        res.status(201).send("post userlecture success");
      } else {
        await prisma.$disconnect();
        res.status(403).send("userlecture already exists");
      }
    };
    postUserLectureHandler(user_address, lecture_title).catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      res.status(500).send("Server Error");
    });
  },

  getUserLecture: (req: Request, res: Response) => {
    const user_address: String = req.query.user_address as String;
    const lecture_title: String = req.query.lecture_title as String;

    const getUserLectureHandler = async (
      user_address: String,
      lecture_title: String
    ) => {
      const result = await prisma.UserLecture.findMany({
        where: {
          user_address: user_address,
          lecture_title: lecture_title,
        },
      });
      await prisma.$disconnect();
      res.status(201).json(result);
    };
    getUserLectureHandler(user_address, lecture_title).catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      res.status(500).send("Server Error");
    });
  },
};
