import { Router } from 'express';

const {
  postLecture,
  readAllLecture,
  readLectureDetail,
  readLimitLecture,
  deleteLecture,
} = require('../controller/lecture_controller');

const router = Router();

router.post('/', postLecture);
router.get('/', readAllLecture);
router.get('/detail', readLectureDetail);
router.get('/limit', readLimitLecture);
router.delete('/', deleteLecture);

module.exports = router;
