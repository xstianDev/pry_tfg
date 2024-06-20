import { UserDocument } from '@/models/User';
import { ObjectId } from 'mongoose';
import { UserRole } from '.';

declare global {
    namespace Express {
        interface Request {
            user: UserDocument;
            userId: ObjectId;
            userRole: UserRole;
        }
    }
}


declare module 'express-session' {
    interface SessionData {
        csrfToken?: string;
    }
}