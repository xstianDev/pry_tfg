// Config
import { PASSPHRASE, HTTP_PROTOCOL, WSS_PORT, wssOrigin } from '@/utils/config';

// Node
import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';

// Express
import express from 'express';
const app = express();

// Socket.io
import { Server } from 'socket.io';

// lib
import logger from '@/lib/logger';

const PRIVATE_KEY = fs.readFileSync(path.resolve('certs/socket', 'socket_private.key'));
const CERTIFICATE = fs.readFileSync(path.resolve('certs/socket', 'socket_cert.crt'));
const credentials = {
    key: PRIVATE_KEY,
    cert: CERTIFICATE,
    passphrase: PASSPHRASE,
};

const server = (HTTP_PROTOCOL === 'http') 
    ? http.createServer(app)
    : https.createServer(credentials, app);

export const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

interface UserSocketMap {
    [userId: string]: string;
}

const userSocketMap: UserSocketMap = {};

export const getReceiverSocketId = (receiverId: string) => {
    return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
    logger.info(`Usuario conectado: ${socket.id}`);

    const userId = socket.handshake.query.userId as string;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('send', (args) => {
        console.log('send', args);
    });

    socket.on('upload', (args) => {
        console.log('upload', args);
    });

    socket.on('disconnect', () => {
        logger.info(`Usuario desconectado: ${socket.id}`);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

server.listen(WSS_PORT, () => console.log(`Socket server running: ${wssOrigin}`));