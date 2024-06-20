import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import { MessageType } from '@/types';
import logger from '@/lib/logger';

export interface MessageDocument extends Document {
    chatId: ObjectId;
    senderId: ObjectId;
    receiverId: ObjectId;
    imageId: ObjectId;
    text: string;
    type: MessageType;
    sentAt: Date;
    updatedAt: Date;
    updated: boolean;
    deleted: boolean;
}

const EMessageType: MessageType[] = ['text', 'image/png', 'image/jpeg'];

const messageSchema = new Schema<MessageDocument>({
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    imageId: { type: Schema.Types.ObjectId, ref: 'Image', default: null },
    text: { type: String, default: null },
    type: { type: String, required: true, enum: EMessageType },
    sentAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: null },
    updated: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
}, { 
    versionKey: false,
    collection: 'messages'
});

messageSchema.pre('save', async function (next) {
    const message = this as MessageDocument;
    logger.info(message);

    next();
});

const Message = mongoose.model<MessageDocument>('Message', messageSchema);

export default Message;