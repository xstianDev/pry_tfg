import { ChatSessionType } from '@/types';
import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface ChatSessionDocument extends Document {
    name: string,
    type: ChatSessionType
    users: string[],
    lastActivity: Date
    // userId: ObjectId,
    // userId: ObjectId,
}

const chatSessionSchema = new Schema<ChatSessionDocument>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    lastActivity: { type: Date, default: Date.now },
}, { versionKey: false });

chatSessionSchema.pre('save', async function (next) {
    const session = this as ChatSessionDocument;    
    console.log(session);

    next();
});

const ChatSession = mongoose.model<ChatSessionDocument>('Session', chatSessionSchema);

export default ChatSession;