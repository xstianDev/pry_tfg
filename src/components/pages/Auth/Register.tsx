import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/api/axios';

import AuthField from './AuthField';
import Error from '@/components/shared/errors/Error';

import { HOME } from '@/constants/pageRoutes';
import { OK } from '@/constants/httpCodes';
import { API_AUTH } from '@/constants/apiRoutes';


const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [birthday, setBirthday] = useState('');
    
    const [gender, setGender] = useState('M');
    const [role, setRole] = useState('customer');
    const [address, setAddress] = useState({});
    
    const [error, setError] = useState('');

    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const info = {
            name: name,
            surname: surname,
            gender: gender,
            role: role,
            birthday: birthday,
            address: address
        };        

        await axios.post(API_AUTH, { email, password, passwordConfirm, info })
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
            <h1 className='auth-title'>Registro</h1>
            
            <AuthField 
                className='auth-name' 
                labelText='Nombre' 
                type='text' 
                placeholder={null}
                required={true}
                cb={setName}
                extra={null}
            />

            <AuthField 
                className='auth-surname' 
                labelText='Apellidos' 
                type='text' 
                placeholder={null}
                required={true}
                cb={setSurname}
                extra={null}
            />
            
            {/* <AuthField 
                className='auth-gender' 
                labelText='Género' 
                type='text'
                placeholder={null}
                required={true}
                cb={setGender}
                extra={null}
            />

            <AuthField 
                className='auth-gender' 
                labelText='Tipo de usuario' 
                type='text'
                placeholder={null}
                required={true}
                cb={setType}
                extra={null}
            /> */}
            
            <AuthField 
                className='auth-email' 
                labelText='Email' 
                type='email' 
                placeholder={null}
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
                extra={null}
            />
            
            <AuthField 
                className='auth-password-confirm' 
                labelText='Confirmar contraseña' 
                type='password' 
                placeholder={null}
                required={true}
                cb={setPasswordConfirm}
                extra={null}
            />

            <AuthField 
                className='auth-age' 
                labelText='Edad' 
                type='date'
                placeholder={null}
                required={true}
                cb={setBirthday}
                extra={null}
            />

            {error && <Error icon={'info-circle'} text={error} />}

            <button className='auth-button' type='submit'>Continuar</button>
        </form>     
    );
};

export default Register;