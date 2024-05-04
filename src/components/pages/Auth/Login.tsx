import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '@/api/axios';

import AuthField from './AuthField';
import Error from '@/components/shared/errors/Error';

import { OK } from '@/constants/httpCodes';
import { FORGOT, HOME } from '@/constants/pageRoutes';
import { API_AUTH } from '@/constants/apiRoutes';


const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO token para que el registro sea efectivo antes de la redirección. 
        await axios.post(API_AUTH, { email, password })
            .then(res => {
                if (res.status === OK) return navigate(HOME);
            })
            .catch(err => {
                if (typeof err.response.data === 'string') setError(err.response.data);
                if (!err.response.data || err.response.data === '') setError('Error desconocido');
            });
    };

    return (
        <form className='auth-form' method='POST' onSubmit={handleSubmit}>
            <h1 className='auth-title'>Inicia sesión</h1>
            
            <AuthField 
                className='auth-email' 
                labelText='Email' 
                type='email' 
                placeholder='pepe@gmail.com'
                required={true}
                cb={setEmail} 
                extra={null}
            />

            <AuthField 
                className='auth-password' 
                labelText='Contraseña' 
                type='password' 
                placeholder={null}
                required={true}
                cb={setPassword} 
                extra={{
                    tag: 
                        <span className='auth-forgot-pass'>
                            <Link to={FORGOT}>¿Olvidaste tu contraseña?</Link>
                        </span>,
                    bottom:
                        <div className='auth-password-requirements'>
                            <p>Una contraseña válida debe tener:</p>
                            <ul style={{ listStylePosition: 'inside' }}>
                                <li>Al menos 8 caracteres.</li> 
                                <li>Una letra mayúscula.</li>
                                <li>Un carácter especial (/, #, ...).</li> 
                            </ul>
                        </div>
                }}
            />

            {error && <Error icon={'info-circle'} text={error} />}

            <input className='auth-button' type='submit' value="Continuar" />
        </form>
    );
};

export default Auth;