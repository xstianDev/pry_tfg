import { Request } from 'express';
import { AxiosError, isAxiosError } from 'axios';

import logger from '@/lib/logger';
import { ServerError } from '@/errors';
import { INTERNAL_SERVER_ERROR } from '@/constants/httpCodes';

import { sendResponse } from './responses';
import { serverContext } from './ServerContext';


const getURL = (request?: Request) => {
    const req = (!request)
        ? serverContext.getRequest()
        : request;

    return `${req.method} ${req.originalUrl}`;
};

export const logURL = (req?: Request) => { logger.info(getURL(req)); };

export const logError = (err: AxiosError | ServerError | Error, req?: Request) => {
    logger.error(getURL(req));

    if (err instanceof AxiosError || isAxiosError(err)) {
        logger.error(err.message);
        logger.error(err.stack);
        return;
    }
        
    if (err instanceof ServerError) {
        logger.error(err.error);
        logger.error(err.stack);
        return;
    }

    if (err?.name === 'MongoNotConnectedError') {
        logger.error(err.stack);
        return;
    }

    logger.error('Error no controlado');
    logger.error(err);
    for (const [key, value] of Object.entries(err)) {
        logger.error(`${key}: ${value}`);
    }
};

export const logAndSendError = (err: AxiosError | ServerError | Error, req?: Request) => {
    logError(err, req);

    if (err instanceof ServerError) {
        const status = err.status || INTERNAL_SERVER_ERROR;
        const error = err.error || 'Error en la petición';

        sendResponse(status, { error });
    }
};