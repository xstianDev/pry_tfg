import { NextFunction, Request, Response } from 'express';
import { logError } from '@/utils/log';

export const getErrorFromClient = async (req: Request, res: Response, next: NextFunction) => {
    logError(req.body.err);
    res.end();

    next();
};