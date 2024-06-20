import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import logger from '@/lib/logger';

/**
 * Firma un token JWT.
 *
 * @param payload - Datos que se van a insertar en el token.
 * @param expireTime - (Opcional) Tiempo de caducidad. Por defecto, '7d'.
 * @returns El token JWT firmado.
 */
export const signToken = (payload: object, expireTime?: string | number) => {
    const PRIVATE_KEY = fs.readFileSync(path.resolve('certs/auth', 'auth_private.key'));

    return jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: expireTime || '7d',
        algorithm: 'RS256'
    });
};


/**
 * Verifica un token JWT.
 *
 * @param token - Token JWT encriptado.
 * @returns Payload del token.
 */
export const verifyToken = (token: string) => {
    const PUBLIC_KEY = fs.readFileSync(path.resolve('certs/auth', 'auth_public.key'));

    if (!token) return undefined;

    try {
        return jwt.verify(token, PUBLIC_KEY);
    } catch (err) {
        logger.error(err);
    }
}; 

/**
 * Crea bytes aleatorios y los convierte a.
 *
 * @param n - Número de caracteres generados.
 * @returns Cadena de caracteres aleatorios.
 */
export const createRandomBytes = (n: number) => crypto.randomBytes(n).toString('hex');