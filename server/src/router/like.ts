import { Router } from "express";
const { postLike } = require("../controller/like_controller");

const router = Router();

router.post("/", postLike);

module.exports = router;
