import React from 'react';

import { AuthOption, Login, OAuth, Register } from '.';
import { LOGIN, REGISTER } from '@/constants/pageRoutes';

import '@css/Auth.css';

interface AuthProps {
    isRegister: boolean
}

const Auth = ({ isRegister }: AuthProps) => {
    const authOptionProps = (isRegister) ? {
        paragraph: '¿Ya tienes cuenta?',
        url: LOGIN,
        text: 'Inicia sesión',
    } : {
        paragraph: '¿Eres nuevo en Bloom?',
        url: REGISTER,
        text: 'Crea tu cuenta',
    };

    return (
        <div className='auth-wrapper'>
            <div className='auth-container container'>
                {/* Auth */}
                {isRegister ? <Register /> : <Login />}

                {/* Separation */}
                <div className='auth-separation'>
                    <div className='separation'></div>
                    <div className='separator'>o</div>
                    <div className='separation'></div>
                </div>

                {/* OAuth */}
                <OAuth />

                <AuthOption {...authOptionProps} />
            </div>
        </div>
    );
};

export default Auth;