import { Router } from "express";
const {
  postArticle,
  readRecentArticle,
  readLikeArticle,
  editArticle,
  deleteArticle,
} = require("../controller/article_controller");

const router = Router();

router.post("/", postArticle);
router.get("/recent", readRecentArticle);
router.get("/like", readLikeArticle);
router.put("/", editArticle);
router.delete("/", deleteArticle);

module.exports = router;
