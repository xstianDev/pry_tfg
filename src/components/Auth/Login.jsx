import { React, useState } from 'react';

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // En caso de que el submit se vuelva más complejo 
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='auth-wrapper'>
            <div className='auth-container'>
                {/* Auth */}
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h1 className='auth-title'>Iniciar sesión</h1>
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
                    <span className='auth-forgot-pass'>
                        <span>¿No tienes cuenta?&nbsp;</span><a href="forgot">Crea una</a>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;