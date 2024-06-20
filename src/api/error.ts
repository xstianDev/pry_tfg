import { apiError } from './axios';
import { SEND } from '@/constants/apiRoutes';

/** Envía un error de cualquier tipo del cliente al servidor. */
export const sendError = (err: Error) => {
    apiError.post(SEND, { err })
        .then(res => null)
        .catch(err => null);
};