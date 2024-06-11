import express from 'express';
import { getHTML, checkCSRF, logReqURL, createServerContext } from '@/controllers/global.controller';

const router = express.Router();

// Routes
router.use('*', logReqURL);
router.use('*', createServerContext);
router.post('*', checkCSRF);
router.get('*', getHTML);

export default router;