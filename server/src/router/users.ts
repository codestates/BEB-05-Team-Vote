import { Router } from "express";

const router = Router();
const { user_login } = require("../controller/login_controller");
const { user_logout } = require("../controller/logout_controller");
const {
    userInfo,
    userArticle,
    userComment,
    userLecture,
} = require("../controller/userinfo_controller")

router.post("/login", user_login);
router.post("/logout", user_logout);
router.post("/user/userinfo", userInfo);
router.post("/user/userarticle", userArticle);
router.post("/user/usercomment", userComment);
router.post("/user/userlecture", userLecture);

module.exports = router;


