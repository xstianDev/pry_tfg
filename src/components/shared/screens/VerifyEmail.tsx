import React, { useEffect } from 'react';
import axios from '@/api/axios';
import { useNavigate, useParams } from 'react-router';

import { HOME, VERIFY_TOKEN } from '@/constants/pageRoutes';
import { OK } from '@/constants/httpCodes';

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.post(VERIFY_TOKEN, { token })
            .then(res => {
                if (res.status === OK) return navigate(HOME);
            })
            .catch(() => console.log('Error activando tu cuenta token'));        
    });

    return (<></>);
};

export default VerifyEmail;