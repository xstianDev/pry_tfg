import dotenv from 'dotenv';
const env = dotenv.config().parsed;

export const NODE_ENV = env.NODE_ENV;

export const PASSPHRASE = env.PASSPHRASE;

export const HOST = env.HOST || 'localhost';
export const HTTP_PROTOCOL = env.HTTP_PROTOCOL || 'https';
export const WS_PROTOCOL = env.WS_PROTOCOL || 'wss';
export const HTTPS_PORT = env.HTTPS_PORT || 3001;
export const WSS_PORT = env.WSS_PORT || 4001;

export const SENDER_MAIL = env.SENDER_MAIL;
export const SENDER_PASS = env.SENDER_PASS;

export const ATLAS_URI = env.ATLAS_URI;

export const httpsOrigin = `${HTTP_PROTOCOL}://${HOST}:${HTTPS_PORT}`;
// export const wssOrigin = `${HTTP_PROTOCOL}://${HOST}:${WSS_PORT}`;
export const wssOrigin = `${WS_PROTOCOL}://${HOST}:${WSS_PORT}`;