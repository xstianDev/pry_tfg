import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserInfo, UserRole } from '@/types';

export interface UserDocument extends Document {
    email: string;
    password: string;
    role: UserRole;
    signDate: Date;
    lastLogin: Date;
    profilePic: ObjectId;
    sessions: ObjectId[];
    info: UserInfo;
    active: boolean;
    banned: boolean;
}

// TODO adaptar código al nuevo Schema
const userSchema = new Schema<UserDocument>({
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true, default: 'user' },
    signDate: { type: Date, default: new Date() },
    lastLogin: { type: Date, default: null },
    profilePic: { type: Schema.Types.ObjectId, ref: 'Upload', default: null },
    sessions: [{ type: Schema.Types.ObjectId, ref: 'UserSession', default: null }],
    info: {
        name: { type: String, required: true, trim: true },
        surname: { type: String, required: true, trim: true },
        gender: { type: String, required: true, trim: true },
        birthday: { type: Date, required: true },
        address: {
            street: { type: String, trim: true, default: 'default' },
            city: { type: String, trim: true, default: 'default' },
            country: { type: String, trim: true, default: 'default' },
            zipCode: { type: String, trim: true, default: 'default' }
        },
    },
    active: { type: Boolean, default: false },
    banned: { type: Boolean, default: false }
}, {
    versionKey: false,
    collection: 'users'
});


// Antes de guardar el usuario en la base de datos, hasheamos la contraseña
userSchema.pre('save', async function (next) {
    const user = this as UserDocument;

    if (!user.isModified('password')) return next();
    
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;