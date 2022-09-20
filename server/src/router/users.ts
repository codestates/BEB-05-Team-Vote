import { Router } from 'express';

const router = Router();
const { user_login } = require('../controller/login_controller');
const { user_logout } = require('../controller/logout_controller');
const { userInfo } = require('../controller/userinfo_controller');

router.post('/login', user_login);
router.post('/logout', user_logout);
router.get('/userinfo', userInfo);

module.exports = router;
