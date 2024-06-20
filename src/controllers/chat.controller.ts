import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import Message from '@/models/Message';
import Chat from '@/models/Chat';

import { OK } from '@/constants/httpCodes.js';
import { getReceiverSocketId, io } from '@/server/socket';
import { sendResponse } from '@/utils/responses.js';
import { logAndSendError } from '@/utils/log.js';
import { verifyToken } from '@/utils/token';

/** Envía mensajes de un cliente y los guarda en BBDD */
export const sendMessage = async (req: Request, res: Response) => {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const { sessionToken } = req.cookies;

    const senderId = (verifyToken(sessionToken) as JwtPayload).userId;
    
    Chat.findOne({ participants: { $all: [senderId, receiverId] } })
        .then(chat => {
            if (!chat)
                return Chat.create({
                    participants: [senderId, receiverId]
                });

            return chat;
        })
        .then(chat => {
            const newMessage = new Message({
                senderId,
                receiverId,
                message
            });

            if (newMessage) chat.messages.push(newMessage._id as ObjectId);
        
            return Promise.all([chat.save(), newMessage.save()])
                .then(([savedChats, savedMessage]) => {
                    const receiverSocketId = getReceiverSocketId(receiverId);
                    if (receiverSocketId)
                        io.to(receiverSocketId).emit('newMessage', savedMessage);
        
                    sendResponse(OK, { savedMessage });
                });
        })
        .catch(err => logAndSendError(err));
};

/** Obtiene los mensajes de un cliente. */
export const getMessages = async (req: Request, res: Response) => {
    const { id: userToChatId } = req.params;
    const { sessionToken } = req.cookies;

    const senderId = (verifyToken(sessionToken) as JwtPayload).userId;

    await Chat.findOne({
        participants: { $all: [senderId, userToChatId] },
    }).populate('messages')
        .then(chat =>
            (!chat) ? sendResponse(200) : Promise<void>
        )
        .catch(err => logAndSendError(err));
};

/** Obtiene las conversaciones de un cliente. */
export const getConversationList = async (req: Request, res: Response) => {
    const { sessionToken } = req.cookies;
    const loggedInUserId = (verifyToken(sessionToken) as JwtPayload).userId;

    await Chat.find({ participants: { $in: [loggedInUserId] } })
        // .then(users => console.log("users", users))
        .then(users => sendResponse(OK, { users }))
        .catch(err => logAndSendError(err));
};