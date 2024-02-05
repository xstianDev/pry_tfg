import { React, useState } from 'react';
import PropTypes from "prop-types";

import AuthField from './AuthField';
import OAuth from './OAuth';

import "/src/styles/Auth.css";


const Auth = (props) => {
    const auth = props.auth;
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [] = useState('');

    console.log(auth);

    // En caso de que el submit se vuelva más complejo 
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='auth-wrapper'>
            <div className='auth-container'>
                {/* Auth */}
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h1 className='auth-title'>Registro</h1>
                    <div className='auth-field auth-email'>
                        <label>Email</label>
                        <input 
                            type='email' 
                            placeholder='Introduce tu email' 
                            onChange={e => setEmail(e.target.value)}
                            />
                    </div>
                    {/* TODO: sugerencias de correo (@gmail, @hotmail...) */}
                    <div className='auth-field auth-password'>
                        <label>Contraseña</label>
                        <input 
                            type='password' 
                            placeholder='Introduce tu contraseña'
                            onChange={e => setPassword(e.target.value)} 
                            />
                        <span className='auth-forgot-pass'>
                            <a href="forgot">¿Olvidaste tu contraseña?</a>
                        </span>
                    </div>
                    <button className='auth-button'>Continuar</button>
                </form>

                {/* Separation */}
                <div className='auth-separation'>
                    <div className='separation'></div>
                    <div className='separator'>o</div>
                    <div className='separation'></div>
                </div>

                {/* OAuth */}
                <OAuth />

            </div>
        </div>
    );
};

Auth.propTypes = {
    auth: PropTypes.string.isRequired
}

export default Auth;