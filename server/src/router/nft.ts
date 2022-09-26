import { Router } from 'express';
const { exchangeNFT } = require('../controller/nft_controller');

const router = Router();

router.post('/', exchangeNFT);

module.exports = router;
