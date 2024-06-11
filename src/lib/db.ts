// Atlas
import mongoose from 'mongoose';

import { ATLAS_URI } from '@/utils/config';
import logger from './logger';
import { NextFunction, Request, Response } from 'express';

export const connect = async (req: Request) => {
    return mongoose.connect(ATLAS_URI)
        .then(() => {
            logger.warn(`Conectado ${req.method} ${req.originalUrl}`);
        })
        .catch(err => logger.error(err));
};
    
export const disconnect = async (req: Request) => {
    return mongoose.disconnect()
        .then(() => {
            logger.warn(`Desconectado ${req.method} ${req.originalUrl}`);
        })
        .catch(err => logger.error(err));
};

export const useDB = async (req: Request, res: Response, next: NextFunction) => {
    await connect(req);
        
    next();

    res.on('finish', async () => {
        await disconnect(req);
    });
};