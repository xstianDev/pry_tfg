import { getConversationList, getMessages, sendMessage } from '@/controllers/chat.controller';
import { useDB } from '@/lib/db';
import express from 'express';

const router = express.Router();

router.get('/to/:id', useDB, getMessages);
router.post('/send/:id', useDB, sendMessage);
router.get('/conversations', useDB, getConversationList);


export default router;