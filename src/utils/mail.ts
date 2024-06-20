// Config
import { SENDER_MAIL, SENDER_PASS, httpsOrigin } from './config';

import nodemailer from 'nodemailer';

import { API_AUTH } from '@/constants/apiRoutes';
import logger from '@/lib/logger';
import { signToken } from './token';
import { UserDocument } from '@/models/User';

const url = `${httpsOrigin}${API_AUTH}`;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: SENDER_MAIL,
        pass: SENDER_PASS
    }
});


/**
 * Genera el token que se va a mandar al correo.
 * 
 * @param user - Documento con la información del usuario.
 * @returns Token firmado
 */
export const signEmailToken = (user: UserDocument) => {
    const payload = { userId: user._id, userRole: user.role };
    return signToken(payload, '2d');
};

/**
 * Manda un email de verificación de cuenta.
 * 
 * @param user - Documento con la información del usuario.
 * @returns Promesa de tipo SMTP Transport
 */
export const sendVerifyUserEmail = async (user: UserDocument) => {
    const token = signEmailToken(user);
    const name = `${user.info.name} ${user.info.surname}`;

    return transporter.sendMail({
        from: SENDER_MAIL,
        to: user.email,
        subject: 'Verifica tu cuenta',
        html: `
            <p>
                <span>${name}, ¡bienvenid@ a Bloom!</span><br>
                <span>Verifica tu correo pulsando en el siguiente <a href=${url}/verify/email/${token}>enlace</a>.</span><br>
                <br>
                <span>¿Por qué hacemos esto?</span><br> 
                <span>Nos preocupa tu seguridad y para prevenir que un tercero use tu cuenta para registrarse en Bloom tenemos 
                que asegurarnos de que eres tú el que la usa.</span><br>
                <br>
                <span>Tu token de acceso tiene una duración de 2 días. ¿Se ha caducado tu token? Haz click <a href=${url}/verify/email/resend-verification/${token}>aquí</a>.</span>
            </p>
        `
    }).catch(err => { logger.error(err); });
};