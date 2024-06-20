import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import { ChatType } from '@/types';
import logger from '@/lib/logger';

export interface ChatDocument extends Document {
    name: string;
    type: ChatType;
    participants: ObjectId[];
    messages: ObjectId[];
}

const EChat: ChatType[] = ['chat', 'group'];

const chatSchema = new Schema<ChatDocument>({
    name: { type: String, required: false, default: null },
    type: { type: String, required: true, enum: EChat },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message', default: [] }],
}, { 
    versionKey: false,
    collection: 'chats'
});

chatSchema.pre('save', async function (next) {
    const session = this as ChatDocument;
    logger.info(session);

    next();
});

const Chat = mongoose.model<ChatDocument>('Chat', chatSchema);

export default Chat;