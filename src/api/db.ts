// Config
import dotenv from 'dotenv';
const env = dotenv.config().parsed;
const ATLAS_URI = env.ATLAS_URI;

// Atlas
import mongoose from 'mongoose';

export const connect = async () => {
    return mongoose.connect(ATLAS_URI)
        // .then(() => console.log('Conectado'))
        .catch(err => console.log(err));
};
    
export const disconnect = async () => {
    return mongoose.disconnect()
        // .then(() => console.log('Desconectado'))
        .catch(err => console.log(err));
};
