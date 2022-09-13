import { Request, Response } from "express";
const prisma = require("../db/index");

module.exports = {
  postLecture: (req: Request, res: Response) => {
    console.log(req.body);
    const {
      user_id,
      lecture_title,
      lecture_summary,
      lecture_introduction,
      instructor_introduction,
      lecture_url,
      lecture_image,
      lecture_price,
    } = req.body.course;

    const postLectureHandler = async (
      user_id: Number,
      lecture_title: String,
      lecture_summary: String,
      lecture_introduction: String,
      instructor_introduction: String,
      lecture_url: String,
      lecture_image: String,
      lecture_price: String
    ) => {
      await prisma.Lecture.create({
        data: {
          user_id: user_id,
          lecture_title: lecture_title,
          lecture_summary: lecture_summary,
          lecture_introduction: lecture_introduction,
          instructor_introduction: instructor_introduction,
          lecture_url: lecture_url,
          lecture_image: lecture_image,
          lecture_price: Number(lecture_price),
        },
      });
      const allLecture = await prisma.Lecture.findMany({});
      console.dir(allLecture, { depth: null });

      await prisma.$disconnect();
      res.status(201).send("post Lecture success");
    };

    postLectureHandler(
      user_id,
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
          lecture_id: true,
          lecture_title: true,
          lecture_image: true,
          lecture_price: true,
          user: true,
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
    const lecture_id: Number = Number(req.query.lecture_id as String);

    const readLectureDetailHandler = async (lecture_id: Number) => {
      const selectedLecture = await prisma.Lecture.findMany({
        where: {
          lecture_id: lecture_id,
        },
      });
      console.dir(selectedLecture, { depth: null });
      return selectedLecture;
    };

    readLectureDetailHandler(lecture_id)
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
        include: {
          user: true,
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
