import { Router } from "express";

const {
  postLecture,
  readAllLecture,
  readLectureDetail,
  readLimitLecture,
} = require("../controller/lecture_controller");

const router = Router();

router.post("/", postLecture);
router.get("/", readAllLecture);
router.get("/detail", readLectureDetail);
router.get("/limit", readLimitLecture);

module.exports = router;
