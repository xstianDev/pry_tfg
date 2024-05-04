import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface UserSessionDocument extends Document {
    userId: ObjectId,
    token: string,
    lastActivity: Date
}

const userSessionSchema = new Schema<UserSessionDocument>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    lastActivity: { type: Date, default: Date.now },
}, { versionKey: false });

userSessionSchema.pre('save', async function (next) {
    const session = this as UserSessionDocument;    
    console.log(session);

    next();
});

const UserSession = mongoose.model<UserSessionDocument>('UserSession', userSessionSchema);

export default UserSession;