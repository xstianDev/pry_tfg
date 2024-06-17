import mongoose, { Document, Schema } from 'mongoose';
import { ImageType } from '@/types';
import logger from '@/lib/logger';

export interface ImageDocument extends Document {
    data: Buffer;
    type: ImageType;
}

const EImageType: ImageType[] = ['image/png', 'image/jpeg'];

const imageSchema = new Schema<ImageDocument>({
    data: { type: Buffer, required: true },
    type: { type: String, required: true, enum: EImageType },
}, { 
    versionKey: false,
    collection: 'images'
});

imageSchema.pre('save', async function (next) {
    const image = this as ImageDocument;
    logger.info(image);

    next();
});

const Image = mongoose.model<ImageDocument>('Image', imageSchema);

export default Image;