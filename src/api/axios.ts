
import axios from 'axios';

export default axios.create({
    baseURL: 'https://localhost:3001',
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});