// Config
import dotenv from 'dotenv';
const env = dotenv.config().parsed;
const HOST = env.HOST;
const HTTPS_PORT = env.HTTPS_PORT;
const SENDER_MAIL = env.SENDER_MAIL;
const SENDER_PASS = env.SENDER_PASS;

import { API_AUTH } from '@/constants/apiRoutes';

import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: SENDER_MAIL,
        pass: SENDER_PASS
    }
});


// TODO el token debe caducar (generar uno nuevo cada vez)
export const sendVerifyUserMail = async (name: string, email: string, token: string) => {
    return transporter.sendMail({
        from: SENDER_MAIL,
        to: email,
        subject: 'Verifica tu cuenta',
        html: `
            <p>
                <span>${name}, ¡bienvenid@ a Bloom!</span><br>
                <span>Verifica tu correo pulsando en el siguiente <a href=https://${HOST}:${HTTPS_PORT}/${API_AUTH}/verify/${token}>enlace</a>.</span><br>
                <br>
                <span>¿Por qué hacemos esto?</span><br> 
                <span>Nos preocupa tu seguridad y para prevenir que un tercero use tu cuenta para registrarse en Bloom tenemos 
                que asegurarnos de que eres tú el que la usa.</span>
            </p>
        `
    })
        .catch((err) => console.log(err));
};