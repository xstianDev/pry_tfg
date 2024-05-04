import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
    email: string,
    password: string,
    signDate: Date,
    lastLogin: Date,
    info: {
        name: string,
        surname: string,
        gender: string,
        role: string,
        birthday: Date,
        address: {
            street: string,
            city: string,
            country: string,
            zipCode: string
        },
    },
    logged: boolean,
    active: boolean
    banned: boolean
}

const userSchema = new Schema<UserDocument>({
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    signDate: { type: Date, default: new Date() },
    lastLogin: { type: Date, default: null },
    info: {
        name: { type: String, required: true, trim: true },
        surname: { type: String, required: true, trim: true },
        gender: { type: String, required: true, trim: true },
        role: { type: String, required: true, trim: true },
        birthday: { type: Date, required: true },
        address: {
            street: { type: String, trim: true, default: 'default' },
            city: { type: String, trim: true, default: 'default' },
            country: { type: String, trim: true, default: 'default' },
            zipCode: { type: String, trim: true, default: 'default' }
        },
    },
    logged: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    banned: { type: Boolean, default: false }
}, { versionKey: false });


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