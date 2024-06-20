// Config
import { HTTPS_PORT, PASSPHRASE, HTTP_PROTOCOL, httpsOrigin, wssOrigin } from '@/utils/config';

// Node
import fs from 'fs';
import path from 'path';

// Express
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

// http - https
import http from 'http';
import https from 'https';

const PRIVATE_KEY = fs.readFileSync(path.resolve('certs/server', 'server_private.key'));
const CERTIFICATE = fs.readFileSync(path.resolve('certs/server', 'server_cert.crt'));
const credentials = {
    key: PRIVATE_KEY,
    cert: CERTIFICATE,
    passphrase: PASSPHRASE,
};

// Vite
import vite from '@/lib/vite';

// apis
import { createRandomBytes } from '@/utils/token';

// routes
import globalRoutes from '@/routes/global.routes';
import authRoutes from '@/routes/auth.routes';
import chatRoutes from '@/routes/chat.routes';
import errorRoutes from '@/routes/error.routes';
import uploadRoutes from '@/routes/upload.routes';

// constants
import { API_AUTH, API_CHAT, API_ERROR, API_UPLOAD } from '@/constants/apiRoutes';


// #########################
// # Middlewares y Seguridad
// #########################

app.use(vite.middlewares);
app.use('/assets', express.static(path.resolve('dist', 'client', 'assets')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    name: 'X-SessionID',
    secret: createRandomBytes(64),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        sameSite: 'strict',
    }
}));

app.use(cors({ origin: [httpsOrigin, wssOrigin], credentials: true }));
app.disable('x-powered-by');


// #########################
// # Manejo de rutas
// #########################

app.use('*', globalRoutes);
app.use(API_AUTH, authRoutes);
app.use(API_CHAT, chatRoutes);
app.use(API_ERROR, errorRoutes);
app.use(API_UPLOAD, uploadRoutes);


// #########################
// # Server listen
// #########################

const server = (HTTP_PROTOCOL === 'http') 
    ? http.createServer(app)
    : https.createServer(credentials, app);

server.listen(HTTPS_PORT, () => console.log(`HTTPS server running: ${httpsOrigin}`));