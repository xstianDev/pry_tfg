import { JwtPayload } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

import ssr from '@/server/ssr';
import vite from '@/lib/vite';

import { Request, Response, NextFunction } from 'express';

import { OK, UNAUTHORIZED } from '@/constants/httpCodes';
import { createRandomBytes, signToken, verifyToken } from '@/utils/token';
import { logURL } from '@/utils/log';
import { sendResponse, setCookie } from '@/utils/responses';
import { serverContext } from '@/utils/ServerContext';


export const logReqURL = async (req: Request, res: Response, next: NextFunction) => {
    logURL(req);
    next();
};

export const createServerContext = (req: Request, res: Response, next?: NextFunction) => {    
    serverContext.setContext({ req, res, next });
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

            const csrfToken = signToken({ payload: createRandomBytes(16) });

            req.session.csrfToken = csrfToken;

            setCookie('csrfToken', { csrfToken });
            res.status(OK).set({ 'Content-Type': 'text/html' }).end(html);

            next();
        })
        .catch(err => {
            vite.ssrFixStacktrace(err);
            next(err);
        });
};

export const checkCSRF = async (req: Request, res: Response, next: NextFunction) => {
    logURL({ ...req, originalUrl: `${req.originalUrl} + checkCSRF` } as Request);

    const sessionPayload = (verifyToken(req.session.csrfToken) as JwtPayload)?.payload;
    const verifiedCookie = (verifyToken(req.cookies.csrfToken) as JwtPayload);
    const cookiePayload = verifiedCookie
        ? (verifyToken(verifiedCookie.csrfToken) as JwtPayload)?.payload
        : undefined;

    if (
        sessionPayload !== cookiePayload
        || !sessionPayload 
        || !cookiePayload
    ) {
        return sendResponse(UNAUTHORIZED, { error: 'Error con los tokens de sesión' });
    }

    next();
};