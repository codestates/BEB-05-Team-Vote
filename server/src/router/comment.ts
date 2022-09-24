import { Router } from 'express';
const {
  postComment,
  readComment,
  deleteComment,
} = require('../controller/comment_controller');

const router = Router();

router.post('/', postComment);
router.get('/', readComment);
router.delete('/', deleteComment);

module.exports = router;
