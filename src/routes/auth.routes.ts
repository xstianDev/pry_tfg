import express from 'express';
import { login, register, verifyMailToken } from '@/controllers/auth.controller';
import { LOGIN, REGISTER, VERIFY_TOKEN } from '@/constants/pageRoutes';

const router = express.Router();

router.post(LOGIN, login);
router.post(REGISTER, register);
router.post(VERIFY_TOKEN, verifyMailToken);

export default router;