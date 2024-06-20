import { ReactNode, useEffect } from 'react';
import { apiAuth } from '@/api/axios';
import { useNavigate } from 'react-router-dom';

import { HOME, LOGOUT } from '@/constants/pageRoutes';
import { sendError } from '@/api/error';
import { useModalContext } from '@/context/ModalContext';

const LogoutHandler = (): ReactNode => {
    const { setModal } = useModalContext();
    const navigate = useNavigate();

    useEffect(() => {
        apiAuth.post(LOGOUT)
            .then(res => {
                if (res.status !== 200) return;

                setModal({
                    icon: 'info-circle',
                    text: 'Sesión cerrada',
                    color: 'green',
                });
    
                return navigate(HOME);
            })
            .catch((err) => {
                sendError(err);
                setModal({
                    icon: 'exclamation-diamond',
                    text: 'Error cerrando tu sesión',
                    color: 'red',
                });
            });
    }, []);

    return null;
};

export default LogoutHandler;