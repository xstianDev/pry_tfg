import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiAuth } from '@/api/axios';

import AuthField from './AuthField';
import AuthFieldGroup from './AuthFieldGroup';
import Error from '@/components/shared/errors/Error';

import { HOME, REGISTER } from '@/constants/pageRoutes';
import { UserAddress, UserGender, UserRole } from '@/types';
import { sendError } from '@/api/error';
import { uploadFile } from '@/api/upload';
import { checkEmail, checkPassword } from '@/api/checks';


const Register = () => {
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    
    const [birthday, setBirthday] = useState<string>('');
    const [gender, setGender] = useState<UserGender>('M');
    const [role, setRole] = useState<UserRole>('user');

    const [address, setAddress] = useState<UserAddress>({});
    
    const [error, setError] = useState<string | ReactNode>('');

    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailChecks = checkEmail(email);
        if (emailChecks.length != 0) {
            return setError(emailChecks[0]);
        }

        if (password != confirm)
            return setError('Las contraseñas no coinciden');

        const passChecks = checkPassword(password);
        if (passChecks.length != 0) {
            return setError(
                <ul>
                    <p>Tu contraseña debe:</p>
                    {passChecks.map((err, idx) => <li key={idx}>{err}</li>)}
                </ul>
            );
        }

        const info = {
            name: name,
            surname: surname,
            gender: gender,
            role: role,
            birthday: birthday,
            address: address
        };        

        await apiAuth.post(REGISTER, { email, password, info })
            .then(res => {
                if (res.status === 200) return navigate(HOME);
            })
            .catch(err => {
                sendError(err);
                setError(err.response.data.error || 'Error desconocido');
            });
    };

    return (
        <form className='auth-form' method='POST' onSubmit={handleSubmit} noValidate>
            <h1 className='auth-title'>Registro</h1>
            
            <AuthFieldGroup>
                <AuthField required
                    className='auth-name' 
                    labelText='Nombre' 
                    type='text' 
                    cb={setName}
                />

                <AuthField required
                    className='auth-surname' 
                    labelText='Apellidos' 
                    type='text' 
                    cb={setSurname}
                />
            </AuthFieldGroup>
            
            <AuthField required
                className='auth-email' 
                labelText='Email' 
                type='text' 
                cb={setEmail}
            />

            <AuthField required
                className='auth-password' 
                labelText='Contraseña' 
                type='password' 
                cb={setPassword}
            />
            
            <AuthField required
                className='auth-password-confirm' 
                labelText='Confirmar contraseña' 
                type='password' 
                cb={setConfirm}
                extra={{
                    bottom:
                        <div className='auth-password-requirements'>
                            <p>Una contraseña válida debe tener:</p>
                            <ul>
                                <li>Al menos 8 caracteres.</li> 
                                <li>Letras mayúsculas y minúsculas.</li>
                                <li>Un carácter especial (/, #, ...).</li> 
                            </ul>
                        </div>
                }}
            />

            {/* <AuthFieldGroup>
                <AuthField required
                    className='auth-gender' 
                    labelText='Género' 
                    type='text'
                    cb={setGender}
                />

                <AuthField required
                    className='auth-gender' 
                    labelText='Tipo de usuario' 
                    type='text'
                    cb={setRole}
                />
            </AuthFieldGroup> */}

            <AuthField required
                className='auth-age' 
                labelText='Edad' 
                type='date'
                cb={setBirthday}
            /> 

            {/* // TODO Permitir ver el nombre del archivo antes de mandar */}
            <div className='auth-field'>
                <div className='auth-label-container'>
                    <label className='auth-label'>Foto de perfil</label>
                    <button style={{ padding: '8px', borderRadius: '8px', fontSize: '1em' }} onClick={() => uploadFile()}>Subir archivo</button>
                </div>
            </div>

            {error && <Error icon={'info-circle'} content={error} />}

            <button className='auth-button' type='submit'>Continuar</button>
        </form>
    );
};

// fovewop856@lapeds.com

export default Register;