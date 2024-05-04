import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const signToken = (payload: string | object, expireTime: string) => {
    const PRIVATE_KEY = fs.readFileSync(path.resolve('certs/auth', 'auth_private.key'));

    return jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: expireTime,
        algorithm: 'RS256'
    });
};

export const verifyToken = (token: string) => {
    const PUBLIC_KEY = fs.readFileSync(path.resolve('certs/auth', 'auth_public.key'));

    try {
        return jwt.verify(token, PUBLIC_KEY);
    } catch (err) {
        console.log(err);
    }
}; 

export const createUUID = () => crypto.randomUUID();

export const createRandomBytes = (n: number) => crypto.randomBytes(n).toString('hex');