import { InternalAxiosRequestConfig } from 'axios';
import { ObjectId } from 'mongoose';
import { UserRole } from '.';

declare namespace Express {
    interface Request {
        userId: ObjectId;
        userRole: UserRole;
    }
}


declare module 'express-session' {
    interface SessionData {
        csrfToken?: string;
    }
}