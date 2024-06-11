import { apiError } from './axios';
import { SEND } from '@/constants/apiRoutes';

// TODO 
// XML Parsing Error: no root element found
// Location: https://localhost:3001/api/error/send
// Line Number 1, Column 1:
export const sendError = (err: Error) => {
    apiError.post(SEND, { err })
        .then(res => {})
        .catch(err => {});
};