// Config
const env = require('dotenv').config().parsed;
const APP_PORT = env.APP_PORT;

// Express
import express, { Request, Response } from 'express';
const app = express();

// PostgreSQL
const pgp = require('pg-promise')();
const PORT = env.PSQL_PORT; 
const USER = env.USER;
const PASS = env.PASS;
const HOST = env.HOST;
const DB_NAME = env.DB_NAME;
const db = pgp(`postgres://${USER}:${PASS}@${HOST}:${PORT}/${DB_NAME}`);

// Error codes
const OK = 200;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

// TODO:
app.get('/', (req: Request, res: Response) => {
    
    console.log('Request: ', req);
    console.log('Method: ', req.method);
    console.log('URL: ', req.url);
    console.log('Headers: ', req.headers);
    
    console.log('Response: ', res);
    db.one("SELECT * FROM usuarios");
});
