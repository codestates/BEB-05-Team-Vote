import { Router } from "express";

const {
  postLecture,
  readAllLecture,
  readLectureDetail,
} = require("../controller/lecture_controller");

const router = Router();

router.post("/", postLecture);
router.get("/", readAllLecture);
router.get("/detail", readLectureDetail);

module.exports = router;
