import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { apiAuth } from '@/api/axios';

import AuthField from './AuthField';
import Error from '@/components/shared/errors/Error';

import { FORGOT, HOME, LOGIN } from '@/constants/pageRoutes';
import { useAuthContext } from '@/context/AuthContext';
import { sendError } from '@/api/error';
import { useModalContext } from '@/context/ModalContext';


const Auth = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { setAuth } = useAuthContext();
    const { setModal } = useModalContext();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await apiAuth.post(LOGIN, { email, password })
            .then(res => {
                if (res.status !== 200) return;
                
                setModal({
                    icon: 'check2-circle',
                    text: 'Bienvenido',
                    color: 'green',
                });

                setAuth({
                    logged: true,
                    role: res.data.role
                });
                
                return navigate(HOME);
            })
            .catch(err => {
                sendError(err);
                setError(err.response.data.error || 'Error desconocido');
            });
    };

    return (
        <form className='auth-form' method='POST' onSubmit={handleSubmit} noValidate>
            <h1 className='auth-title'>Inicia sesión</h1>
            
            <AuthField required
                className='auth-email' 
                labelText='Email' 
                type='email' 
                placeholder='pepe@gmail.com'
                cb={setEmail}
            />

            <AuthField required
                className='auth-password' 
                labelText='Contraseña' 
                type='password' 
                cb={setPassword} 
                extra={{
                    tag:
                        <span className='auth-forgot-pass'>
                            <Link to={FORGOT} className='auth-link' tabIndex={-1}>¿Olvidaste tu contraseña?</Link>
                        </span>,
                }}
            />

            {error && <Error icon={'info-circle'} content={error} />}

            <input className='auth-button' type='submit' value="Continuar" />
        </form>
    );
};

export default Auth;