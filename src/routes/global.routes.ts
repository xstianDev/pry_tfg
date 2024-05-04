import express from 'express';
import { getHTML, checkCSRF, logReqURL } from '@/controllers/global.controller';

const router = express.Router();

router.use('*', logReqURL);
router.get('*', getHTML);
router.post('*', checkCSRF);

export default router;