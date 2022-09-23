import { Router } from 'express';
const { batchFunction } = require('../controller/batch_controller');

const router = Router();

router.get('/', batchFunction);

module.exports = router;
