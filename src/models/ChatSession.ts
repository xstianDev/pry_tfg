import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import { ChatSessionType } from '@/types';
import logger from '@/lib/logger';

export interface ChatSessionDocument extends Document {
    name: string | null;
    type: ChatSessionType;
    participants: ObjectId[];
    messages: ObjectId[];
    lastActivity: Date;
}

const EChatSession: ChatSessionType[] = ['chat', 'group'];

const chatSessionSchema = new Schema<ChatSessionDocument>({
    name: { type: String, required: false, default: null },
    type: { type: String, required: true, enum: EChatSession },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    lastActivity: { type: Date, default: new Date() },
}, { 
    versionKey: false,
    collection: 'chat_sessions'
});

chatSessionSchema.pre('save', async function (next) {
    const session = this as ChatSessionDocument;    
    logger.info(session);

    next();
});

const ChatSession = mongoose.model<ChatSessionDocument>('Session', chatSessionSchema);

export default ChatSession;