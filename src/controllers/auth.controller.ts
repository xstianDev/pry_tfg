import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '@/models/User';
import UserSession from '@/models/UserSession';

import { sendVerifyUserMail } from '@/utils/mail';
import { verifyToken } from '@/utils/token';
import { logAndSendError, logError } from '@/utils/log';

import { NOT_FOUND, OK, UNAUTHORIZED } from '@/constants/httpCodes';
import { HOME } from '@/constants/pageRoutes';
import { reject } from '@/errors/ServerError';
import { setCookie, sendResponse } from '@/utils/responses';

// TODO checkeo para que la contraseña cumpla características
export const register = async (req: Request, res: Response) => {
    const { email, password, info } = req.body;

    await User.findOne({ email: email })
        .then(async (user) => {
            if (user)
                return reject(UNAUTHORIZED, 'Tu email no es válido');

            const hash = bcrypt.hashSync(password, 10);
            await User.create({ email: email, password: hash, info: info })
                .then(async (newUser) => {
                    sendVerifyUserMail(newUser).catch(err => logError(err));
                    sendResponse(OK);
                })
                .catch(err => logAndSendError(err));
        })
        .catch(err => logAndSendError(err));
};

// TODO
export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    await User.findOne({ email: email })
        .then(async (user) => {
            if (!user || !bcrypt.compareSync(password, user.password)) 
                return reject(UNAUTHORIZED, 'Tu email o contraseña no son correctos');

            if (!user.active)
                return reject(UNAUTHORIZED, 'Tu cuenta está inactiva');
            
            user.lastLogin = new Date();

            await user.save().catch(err => logError(err));

            const { _id, role } = user;
            await UserSession.create({ userId: _id, role })
                .then(userSession => {
                    setCookie('sessionToken', { userId: userSession._id, role });
                    sendResponse(OK, { role });
                })
                .catch(err => logAndSendError(err));
        })
        .catch(err => logAndSendError(err));
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    const { session } = req.body;
    const { sessionId } = verifyToken(session) as JwtPayload;

    await UserSession.findOne({ _id: sessionId })
        .then(async (session) => {
            if (!session) 
                return reject(UNAUTHORIZED, 'Fallo en la sesión');

            if (session.active)
                return reject(UNAUTHORIZED, 'Tu cuenta está inactiva');

            session.active = false;
            session.lastActivity = new Date();

            await session.save().catch(err => logError(err));

            sendResponse(OK, { role: 'anon' });
        })
        .catch(err => logAndSendError(err));
};

/**
 * Comprueba el token de sesión. Si no existe, lo envía.
 */
export const verifySession = async (req: Request, res: Response, next: NextFunction) => {
    const { sessionToken } = req.cookies;
    
    if (!sessionToken) {
        setCookie('sessionToken', { sessionId: null, role: 'anon' });
        return sendResponse(OK, { role: 'anon' });
    }
        
    const { sessionId, role } = verifyToken(sessionToken) as JwtPayload;
    
    if (!sessionId || role === 'anon')
        return sendResponse(OK, { role: 'anon' });
        
    await UserSession.findOne({ _id: sessionId })
        .then(async (session) => {
            if (!session)
                return reject(NOT_FOUND, 'La sesión no existe');

            if (!session.active)
                return reject(UNAUTHORIZED, 'La sesión no está activa o ha caducado');
            
            sendResponse(OK, { role });
        })
        .catch(err => logAndSendError(err));
};

export const verifyMailToken = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;
    const { userId } = verifyToken(token) as JwtPayload;

    await User.findOne({ _id: userId })
        .then(async (user) => {
            if (!user)
                return reject(NOT_FOUND, 'Usuario no encontrado');

            if (!user.active) {
                user.active = true;
                await user.save().catch(err => logError(err));
            }

            res.status(OK).location(HOME);
        })
        .catch(err => logAndSendError(err));
};

// TODO mandar token nuevo cuando caduca
export const resendVerifyMailToken = async (req: Request, res: Response) => {
    const token = req.query.token as string;
    const { userId } = verifyToken(token) as JwtPayload;

    await User.findOne({ _id: userId })
        .then(async (user) => {
            if (!user) return reject(UNAUTHORIZED, 'El usuario no es existe');

            sendVerifyUserMail(user).catch(err => logError(err));
            sendResponse(OK);
        })
        .catch(err => logAndSendError(err));
};
