import { Router } from 'express';
const {
  postArticle,
  readRecentArticle,
  readLikeArticle,
  readSelectedArticle,
  editArticle,
  deleteArticle,
} = require('../controller/article_controller');

const router = Router();

router.post('/', postArticle);
router.get('/recent', readRecentArticle);
router.get('/like', readLikeArticle);
router.get('/select', readSelectedArticle);
router.put('/', editArticle);
router.delete('/', deleteArticle);

module.exports = router;
