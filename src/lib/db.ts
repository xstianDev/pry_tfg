// Atlas
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { ATLAS_URI } from '@/utils/config';
import logger from './logger';

export const connect = async (req: Request) => {
    return mongoose.connect(ATLAS_URI)
        .then(() => {
            logger.warn(`${req.method} ${req.originalUrl} + Conectado`);
        })
        .catch(err => logger.error(err));
};
    
export const disconnect = async (req: Request) => {
    return mongoose.disconnect()
        .then(() => {
            logger.warn(`${req.method} ${req.originalUrl} + Desconectado`);
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