import fs from 'fs';
import path from 'path';

import ssr from '@/server/ssr';
import vite from '@/server/vite';

import { Request, Response, NextFunction } from 'express';

import { OK, UNAUTHORIZED } from '@/constants/httpCodes';
import { createRandomBytes } from '@/api/token';


export const logReqURL = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.method, req.originalUrl);
    next();    
};

export const getHTML = async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    fs.promises.readFile(path.resolve('public', 'index.html'), 'utf-8')
        .then(async (template) => vite.transformIndexHtml(url, template))
        .then(template => {
            const appHtml = ssr(url);
            const html = template.replace(
                '<div id="root"></div>', 
                `<div id="root">${appHtml}</div>`
            );

            const csrfToken = createRandomBytes(16);
            
            req.session.csrfToken = csrfToken;
            
            res.cookie('csrfToken', csrfToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            res.status(OK).set({ 'Content-Type': 'text/html' }).end(html);
            next();
        })
        .catch(e => {
            if (e instanceof Error) {
                vite.ssrFixStacktrace(e);
                next(e);
            }
        });
};

export const checkCSRF = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.csrfToken !== req.cookies.csrfToken) {        
        res.status(UNAUTHORIZED).json('Error con los tokens de sesión');
        return;
    }

    next();
};