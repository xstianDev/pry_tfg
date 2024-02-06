import { React, useState } from 'react';
import PropTypes from "prop-types";

import AuthField from './AuthField';
import OAuth from './OAuth';

import "/src/styles/Auth.css";


const Auth = (props) => {
    const {register} = props;
    const title = (register) ? "Registro" : "Iniciar sesión";
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [age, setAge] = useState('');
    // const [] = useState('');
    
    console.log(register);

    // En caso de que el submit se vuelva más complejo 
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='auth-wrapper'>
            <div className='auth-container'>
                {/* Auth */}
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h1 className='auth-title'>{ title }</h1>
                    
                    {/* TODO: sugerencias de correo (@gmail, @hotmail...) */}
                    <AuthField className="auth-email" labelText="Email" type='email' fn={setEmail} />
                    <AuthField className="auth-password" labelText="Contraseña" type='password' fn={setPassword} />
                    {!register &&
                        <span className='auth-forgot-pass'>
                            <a href="forgot">¿Olvidaste tu contraseña?</a>
                        </span>
                    }
                    {register && 
                        <div className='auth-field auth-password'>
                        <label>Confirmar contraseña</label>
                        <input 
                            type='password'
                            onChange={e => setPassword(e.target.value)} 
                        />
                    </div>
                    }
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
    register: PropTypes.bool.isRequired
};

export default Auth;