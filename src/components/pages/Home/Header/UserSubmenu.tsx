import { LOGIN, LOGOUT, REGISTER } from '@/constants/pageRoutes';
import { useAuthContext } from '@/context/AuthContext';
import React from 'react';
import { Link } from 'react-router-dom';

const UserSubmenu = () => {
    const { auth } = useAuthContext();

    return (
        <div className='user-submenu-wrapper'>
            <div className='user-submenu-container'>
                {auth.logged 
                    ? <>
                        <Link to={LOGOUT}>Cerrar sesión</Link>
                    </>
                    : <>
                        <Link to={LOGIN}>Iniciar sesión</Link>
                        <Link to={REGISTER}>Registro</Link>
                    </>
                }
            </div>
        </div>
    );
};

export default UserSubmenu;