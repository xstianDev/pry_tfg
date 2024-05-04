import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface MessageDocument extends Document {
    from: ObjectId,
    text: string,
    sent: Date,
    deleted: boolean,
}

const messageSchema = new Schema<MessageDocument>({
    from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    sent: { type: Date, default: new Date() },
    deleted: { type: Boolean, default: false },
}, { versionKey: false });

messageSchema.pre('save', async function (next) {
    const message = this as MessageDocument;    
    console.log(message);

    next();
});

const Message = mongoose.model<MessageDocument>('Message', messageSchema);

export default Message;