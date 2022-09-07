import { Request, Response } from "express";
const prisma = require("../db/index");

module.exports = {
  postLecture: (req: Request, res: Response) => {
    const {
      user_address,
      lecture_title,
      lecture_summary,
      lecture_introduction,
      instructor_introduction,
      lecture_url,
      lecture_image,
      lecture_price,
    } = req.body;

    const postLectureHandler = async (
      user_address: String,
      lecture_title: String,
      lecture_summary: String,
      lecture_introduction: String,
      instructor_introduction: String,
      lecture_url: String,
      lecture_image: String,
      lecture_price: Number
    ) => {
      const result = await prisma.Lecture.findUnique({
        where: {
          lecture_title: lecture_title,
        },
      });

      if (result) {
        await prisma.$disconnect();
        res.status(403).send("lecture title exists");
      } else {
        await prisma.Lecture.create({
          data: {
            user_address: user_address,
            lecture_title: lecture_title,
            lecture_summary: lecture_summary,
            lecture_introduction: lecture_introduction,
            instructor_introduction: instructor_introduction,
            lecture_url: lecture_url,
            lecture_image: lecture_image,
            lecture_price: lecture_price,
          },
        });
        const allLecture = await prisma.Lecture.findMany({});
        console.dir(allLecture, { depth: null });

        await prisma.$disconnect();
        res.status(201).send("post Lecture success");
      }
    };

    postLectureHandler(
      user_address,
      lecture_title,
      lecture_summary,
      lecture_introduction,
      instructor_introduction,
      lecture_url,
      lecture_image,
      lecture_price
    ).catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      res.status(500).send("Server Error");
    });
  },

  readAllLecture: (req: Request, res: Response) => {
    const readAllLectureHandler = async () => {
      const allLecture = await prisma.Lecture.findMany({
        orderBy: {
          created_at: "desc",
        },
        select: {
          user_address: true,
          lecture_title: true,
          lecture_image: true,
          lecture_price: true,
        },
      });
      console.dir(allLecture, { depth: null });
      return allLecture;
    };
    readAllLectureHandler()
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

  readLectureDetail: (req: Request, res: Response) => {
    const user_address: String = req.query.user_address as String;
    const lecture_title: String = req.query.lecture_title as String;

    const readLectureDetailHandler = async (
      user_address: String,
      lecture_title: String
    ) => {
      const selectedLecture = await prisma.Lecture.findUnique({
        where: {
          lecture_title: lecture_title,
        },
      });
      console.dir(selectedLecture, { depth: null });
      return selectedLecture;
    };

    readLectureDetailHandler(user_address, lecture_title)
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

  readLimitLecture: (req: Request, res: Response) => {
    const limit: String = req.query.limit as String;
    const limitNum = Number(limit);

    const readLimitLectureHandler = async (limitNum: Number) => {
      const limitedLecture = await prisma.Lecture.findMany({
        orderBy: {
          created_at: "desc",
        },
        take: limitNum,
      });
      return limitedLecture;
    };
    readLimitLectureHandler(limitNum)
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
