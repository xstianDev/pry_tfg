import { NextFunction, Request, Response } from 'express';

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