// Config
import dotenv from 'dotenv';
const env = dotenv.config().parsed;

const PROTOCOL = env.PROTOCOL || 'https';
const HOST = env.HOST || 'localhost';
const WSS_PORT = env.WSS_PORT || 4001;
const serverName = `${PROTOCOL}://${HOST}:${WSS_PORT}`;

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


const PRIVATE_KEY = fs.readFileSync(path.resolve('certs/socket', 'socket_private.key'));
const CERTIFICATE = fs.readFileSync(path.resolve('certs/socket', 'socket_cert.crt'));
const PASSPHRASE = env.PASSPHRASE;
const credentials = {
    key: PRIVATE_KEY,
    cert: CERTIFICATE,
    passphrase: PASSPHRASE,
};

const server = (PROTOCOL === 'http') 
    ? http.createServer(app)
    : https.createServer(credentials, app);

const io = new Server(server, {
    cors: {
        origin: [serverName],
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

export { app, io, server };