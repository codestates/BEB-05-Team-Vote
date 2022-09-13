import { Request, Response } from "express";
const prisma = require("../db/index");

module.exports = {
  postUserLecture: (req: Request, res: Response) => {
    const { user_id, lecture_id } = req.body;
    const postUserLectureHandler = async (
      user_id: Number,
      lecture_id: Number
    ) => {
      const checkUserLecture = await prisma.UserLecture.findMany({
        where: {
          user_id: user_id,
          lecture_id: lecture_id,
        },
      });
      if (checkUserLecture[0] === undefined) {
        await prisma.UserLecture.create({
          data: {
            user_id: user_id,
            lecture_id: lecture_id,
          },
        });

        await prisma.$disconnect();
        res.status(201).send("post userlecture success");
      } else {
        await prisma.$disconnect();
        res.status(403).send("userlecture already exists");
      }
    };
    postUserLectureHandler(user_id, lecture_id).catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      res.status(500).send("Server Error");
    });
  },

  getUserLecture: (req: Request, res: Response) => {
    const user_id: String = req.query.user_id as String;
    const numUser_id = Number(user_id);
    const lecture_id: Number = Number(req.query.lecture_id as String);

    const getUserLectureHandler = async (
      numUser_id: Number,
      lecture_id: Number
    ) => {
      const result = await prisma.UserLecture.findMany({
        where: {
          user_id: numUser_id,
          lecture_id: lecture_id,
        },
      });
      await prisma.$disconnect();
      res.status(201).json(result);
    };
    getUserLectureHandler(numUser_id, lecture_id).catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      res.status(500).send("Server Error");
    });
  },
};
