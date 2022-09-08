import { Router } from "express";
const {
  postComment,
  readComment,
} = require("../controller/comment_controller");

const router = Router();

router.post("/", postComment);
router.get("/", readComment);

module.exports = router;
