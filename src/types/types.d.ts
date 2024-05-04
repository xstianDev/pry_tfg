declare namespace Express {
    interface Request {
        userId: string;
        userRole: string | 'user';
    }
}


import { Session } from 'express-session';

declare module 'express-session' {
    interface SessionData {
        csrfToken?: string;
    }
}