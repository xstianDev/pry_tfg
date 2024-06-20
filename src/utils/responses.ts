import { Response } from 'express';
import { signToken } from './token';
import { serverContext } from './ServerContext';

/**
 * Encripta la información de una cookie.
 * 
 * @param name - Nombre de la cookie.
 * @param payload - Información que lleva la cookie.
 * @param expiresIn - (Opcional) Tiempo de caducidad.
 * @returns Respuesta con la cookie.
 */
export const setCookie = (name: string, payload: object, expiresIn?: string | number) => {
    const res: Response | null = serverContext.getResponse();
    
    return res.cookie(name, signToken(payload, expiresIn), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
};

/**
 * Devuelve una respuesta.
 * 
 * @param status - Código de estado.
 * @param json - (Opcional) Información adicional para la respuesta.
 * @returns Respuesta cerrada.
 */
export const sendResponse = (status: number, json?: object) => {
    const res: Response | null = serverContext.getResponse();

    return (json)
        ? res.status(status).json(json)
        : res.sendStatus(status);
};