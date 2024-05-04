// Config
import dotenv from 'dotenv';
const env = dotenv.config().parsed;

const PROTOCOL = env.PROTOCOL || 'https';
const HOST = env.HOST || 'localhost';
const HTTPS_PORT = env.HTTPS_PORT || 3001;
const serverName = `${PROTOCOL}://${HOST}:${HTTPS_PORT}`;

// Node
import fs from 'fs';
import path from 'path';

// Express
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

// Vite
import vite from './vite';

// http - https
import http from 'http';
import https from 'https';

const PRIVATE_KEY = fs.readFileSync(path.resolve('certs/server', 'server_private.key'));
const CERTIFICATE = fs.readFileSync(path.resolve('certs/server', 'server_cert.crt'));
const credentials = {
    key: PRIVATE_KEY,
    cert: CERTIFICATE,
    passphrase: env.PASSPHRASE,
};

// apis
import { createRandomBytes } from '@/api/token';

// routes
import globalRoutes from '@/routes/global.routes';
import authRoutes from '@/routes/auth.routes';
import chatRoutes from '@/routes/chat.routes';

// constants
import { API_AUTH, API_CHAT } from '@/constants/apiRoutes';


// #########################
// # Middlewares y Seguridad
// #########################

app.use(vite.middlewares);
app.use('/assets', express.static(path.resolve('dist', 'client', 'assets')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    name: 'sessionId',
    secret: createRandomBytes(64),
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: true,
        sameSite: 'strict'
    }
}));

app.use(cors({ origin: serverName, credentials: true }));
app.disable('x-powered-by');


// #########################
// # Manejo de rutas
// #########################

app.use('*', globalRoutes);
app.use(API_AUTH, authRoutes);
app.use(API_CHAT, chatRoutes);


// #########################
// # Server listen
// #########################

const server = (PROTOCOL === 'http') 
    ? http.createServer(app)
    : https.createServer(credentials, app);

server.listen(HTTPS_PORT, () => console.log(`Server running: ${serverName}`));