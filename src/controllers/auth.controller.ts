import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '@/models/User';

import { connect, disconnect } from '@/api/db';
import { sendVerifyUserMail } from '@/api/mail';
import { signToken, verifyToken } from '@/api/token';

import { NOT_FOUND, OK, UNAUTHORIZED } from '@/constants/httpCodes';
import { HOME } from '@/constants/pageRoutes';

// TODO checkeo para que la contraseña cumpla características

export const register = async (req: Request, res: Response) => {
    const { email, password, passwordConfirm, info } = req.body;

    await connect();

    await User.findOne({ email: email })
        .then(async (user) => {
            if (user) {
                res.status(UNAUTHORIZED).json('El email no es válido');
                return;
            }

            if (password !== passwordConfirm) {
                res.status(UNAUTHORIZED).json('Las contraseñas no coinciden');
                return;
            }

            const hashedPassword = bcrypt.hashSync(password, 10);
            await User.create({ email: email, password: hashedPassword, info: info })
                .then(async (res) => {
                    const payload = { userId: res._id, userRole: res.info.role };
                    const emailToken = signToken(payload, '2d');

                    const fullName = `${res.info.name}  ${res.info.surname}`;
                    sendVerifyUserMail(fullName, res.email, emailToken)
                        .catch(err => console.log(err));
                })
                .catch(err => {
                    console.log(err);
                    res.status(UNAUTHORIZED).json('Algo ha ido mal al registrarte');
                    return;
                });

            res.sendStatus(OK);
        })
        .catch(err => {
            console.log('ERR:', req.method, req.originalUrl);
            console.log(err);
            res.status(NOT_FOUND).json('Error conectando con el servidor');
        });

    await disconnect();
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    await connect();

    await User.findOne({ email: email })
        .then(async (user) => {
            if (!user || !bcrypt.compareSync(password, user.password)) {
                res.status(UNAUTHORIZED).json('Tu email o contraseña no son correctos');
                return;
            }

            if (bcrypt.compareSync(password, user.password)) {
                const payload = { userId: user.id, userRole: user.info.role };
            } else {
                res.status(UNAUTHORIZED).json('Hay un error con tu usuario');
                return;
            }

            if (user.active === false) {
                res.status(UNAUTHORIZED).json('Tu cuenta está inactiva');
                return;
            }
            
            if (user.logged === false) {
                user.logged = true;
                await user.save()
                    .catch(err => console.log(err));
            }

            res.sendStatus(OK);
        })
        .catch(err => {
            console.log('ERR:', req.method, req.originalUrl);
            res.sendStatus(NOT_FOUND);
        });

    await disconnect();
};

export const verifyMailToken = async (req: Request, res: Response) => {
    const { token } = req.body;

    const { userId, userRole } = verifyToken(token) as jwt.JwtPayload;

    await connect();

    await User.findOne({ _id: userId })
        .then(async (user) => {
            if (!user) {
                res.sendStatus(NOT_FOUND);
                return;
            }

            if (user.active === false) {
                user.active = true;
                res.location(HOME);
                res.sendStatus(OK);
                await user.save()
                    .catch(err => console.log(err));
            }

        })
        .catch(err => {
            console.log('ERR:', req.method, req.originalUrl);
            console.log(err);
            res.sendStatus(NOT_FOUND);
        });

    await disconnect();
};

// TODO mandar token nuevo cuando caduca
// app.post('/resend-verification/:token', async (req, res) => {
//     const { token } = req.body;

//     const { userId, userRole } = verifyToken(token) as jwt.JwtPayload;

//     await connect();

//     await User.findOne({ _id: userId })
//         .then(async (user) => {
//             if (!user) {
//                 res.sendStatus(NOT_FOUND);
//                 return;
//             }

//             if (user.active === false) {
//                 user.active = true;
//                 res.location(HOME);
//                 res.sendStatus(OK);
//                 await user.save()
//                     .catch(err => console.log(err));
//             }

//         })
//         .catch(err => {
//             console.log('ERR:', req.method, req.originalUrl);
//             console.log(err);
//         });

//     await disconnect();
// });