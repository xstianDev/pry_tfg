import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import logger from '@/lib/logger';

export const signToken = (payload: object, expireTime?: string | number) => {
    const PRIVATE_KEY = fs.readFileSync(path.resolve('certs/auth', 'auth_private.key'));

    return jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: expireTime || '7d',
        algorithm: 'RS256'
    });
};

export const verifyToken = (token: string) => {
    const PUBLIC_KEY = fs.readFileSync(path.resolve('certs/auth', 'auth_public.key'));

    if (!token) return undefined;

    try {
        return jwt.verify(token, PUBLIC_KEY);
    } catch (err) {
        logger.error(err);
    }
}; 

export const createUUID = () => crypto.randomUUID();

export const createRandomBytes = (n: number) => crypto.randomBytes(n).toString('hex');