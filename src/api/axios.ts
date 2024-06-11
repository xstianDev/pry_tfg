
import axios from 'axios';
import { API_AUTH, API_CHAT, API_ERROR, API_UPLOAD } from '@/constants/apiRoutes';

const origin = 'https://localhost:3001';

const axiosConfig = {
    baseURL: origin,
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
};

export default axios.create(axiosConfig);

export const apiAuth = axios.create({ ...axiosConfig, baseURL: origin + API_AUTH });
export const apiChat = axios.create({ ...axiosConfig, baseURL: origin + API_CHAT });
export const apiError = axios.create({ ...axiosConfig, baseURL: origin + API_ERROR });
export const apiUpload = axios.create({ ...axiosConfig, baseURL: origin + API_UPLOAD });