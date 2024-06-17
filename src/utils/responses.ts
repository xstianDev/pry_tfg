import { Response } from 'express';
import { signToken } from './token';
import { serverContext } from './ServerContext';

export const setCookie = (name: string, payload: object, expiresIn?: string | number) => {
    const res: Response | null = serverContext.getResponse();
    
    return res.cookie(name, signToken(payload, expiresIn), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
};

export const sendResponse = (status: number, json?: object) => {
    const res: Response | null = serverContext.getResponse();

    return (json)
        ? res.status(status).json(json)
        : res.sendStatus(status);
};