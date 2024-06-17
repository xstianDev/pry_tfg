import express from 'express';
import { login, logout, register, verifyEmailToken, verifySession } from '@/controllers/auth.controller';

import { LOGIN, LOGOUT, REGISTER } from '@/constants/pageRoutes';
import { VERIFY_SESSION, VERIFY_EMAIL } from '@/constants/apiRoutes';
import { useDB } from '@/lib/db';

const router = express.Router();

// Routes
router.post(REGISTER, useDB, register);
router.post(LOGIN, useDB, login);
router.post(LOGOUT, useDB, logout);

router.post(VERIFY_EMAIL, useDB, verifyEmailToken);
router.post(VERIFY_SESSION, useDB, verifySession);

export default router;