import { Router } from "express";
const {
  postUserLecture,
  getUserLecture,
} = require("../controller/user_lecture_controller");

const router = Router();

router.post("/", postUserLecture);
router.get("/", getUserLecture);

module.exports = router;
