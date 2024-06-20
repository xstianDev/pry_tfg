import { NextFunction, Request, Response } from 'express';

/**
 * Toma los valores de `req`, `res` y `next` antes de cada middleware.
 * Sirve para poder usar estos valores sin tener que pasarlos como
 * parámetro a las funciones que utilizan información de la petición
 * o escriben en la respuesta.
 */
class ServerContext {
    req: Request | null = null;
    res: Response | null = null;
    next: NextFunction | null = null;

    setContext(context: { req?: Request, res?: Response, next?: NextFunction }) {
        this.req = context.req || null;
        this.res = context.res || null;
        this.next = context.next || null;
    }
    
    getContext() {
        return {
            req: this.req,
            res: this.res,
            next: this.next
        };
    }
    
    getRequest(): Request { return this.req; }
    getResponse(): Response { return this.res; }
    getNext(): NextFunction { return this.next; }
}


export const serverContext = new ServerContext();

export const getServerContext = () => serverContext.getContext();

export const setServerContext = (obj: {
    req?: Request, 
    res?: Response, 
    next?: NextFunction
}) => {
    serverContext.setContext(obj);
};