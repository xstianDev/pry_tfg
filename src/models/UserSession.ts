import mongoose, { Document, Schema } from 'mongoose';
import logger from '@/lib/logger';

export interface UserSessionDocument extends Document {
    lastActivity: Date;
    active: boolean;
}

// TODO adaptar código al nuevo Schema
const userSessionSchema = new Schema<UserSessionDocument>({
    lastActivity: { type: Date, default: new Date() },
    active: { type: Boolean, required: true, default: true },
}, {
    versionKey: false,
    collection: 'user_sessions'
});

userSessionSchema.pre('save', async function (next) {
    const session = this as UserSessionDocument;
    logger.info(session);

    next();
});

const UserSession = mongoose.model<UserSessionDocument>('UserSession', userSessionSchema);

export default UserSession;