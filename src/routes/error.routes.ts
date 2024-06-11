import express from 'express';
import { getErrorFromClient } from '@/controllers/error.controller';
import { SEND } from '@/constants/apiRoutes';

const router = express.Router();

router.post(SEND, getErrorFromClient);

export default router;