import { ReactNode, useEffect } from 'react';
import { apiAuth } from '@/api/axios';
import { useNavigate, useParams } from 'react-router-dom';

import { HOME } from '@/constants/pageRoutes';
import { VERIFY_EMAIL } from '@/constants/apiRoutes';
import { useModalContext } from '@/context/ModalContext';

const VerifyEmailHandler = (): ReactNode => {
    const { setModal } = useModalContext();
    const { token } = useParams();
    const navigate = useNavigate();

    console.log('entra')

    // TODO probar
    useEffect(() => {
        apiAuth.post(VERIFY_EMAIL, { token })
            .then(res => {
                console.log(res.status);

                if (res.status !== 200) return;

                setModal({
                    icon: 'info-circle',
                    text: 'Cuenta activada con éxito',
                    color: 'blue',
                });
    
                return navigate(HOME);
            })
            .catch(() => setModal({
                icon: 'exclamation-diamond',
                text: 'Error activando tu cuenta',
                color: 'red',
            }));

    }, []);

    return null;
};

export default VerifyEmailHandler;