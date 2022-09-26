import { Router } from 'express';
const { exchangeNFT, findNFT } = require('../controller/nft_controller');

const router = Router();

router.post('/', exchangeNFT);
router.get('/', findNFT);

module.exports = router;
