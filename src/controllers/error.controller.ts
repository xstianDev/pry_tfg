import { NextFunction, Request, Response } from 'express';
import { logError } from '@/utils/log';
import { sendResponse } from '@/utils/responses';

/** Maneja el error que le manda sendError */
export const getErrorFromClient = async (req: Request, res: Response, next: NextFunction) => {
    logError(req.body.err);
    sendResponse(200);

    next();
};