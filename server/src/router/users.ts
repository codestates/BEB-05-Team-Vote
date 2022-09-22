import { Router } from 'express';

const router = Router();
const { user_login } = require('../controller/login_controller');
const { user_logout } = require('../controller/logout_controller');
const {
  userInfo,
  userArticle,
  userComment,
  userLecture,
} = require('../controller/userinfo_controller');

router.post('/login', user_login);
router.post('/logout', user_logout);
router.get('/userinfo', userInfo);
router.get('/userarticle', userArticle);
router.get('/usercomment', userComment);
router.get('/userlecture', userLecture);

module.exports = router;
