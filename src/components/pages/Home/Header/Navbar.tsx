import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import NavbarButton from './NavbarButton';
import UserSubmenu from './UserSubmenu';

import navbarButtons from '@/assets/js/navbarButtons';

import logo from '@img/logo.jpg';
import anon from '@img/user/anon.png';
import user from '@img/user/auth.png';

import { HOME, LOGIN } from '@/constants/pageRoutes';
import { INavbarButton } from '@/types';
import { useAuthContext } from '@/context/AuthContext';


const Navbar = () => {
    const [showUserSubmenu, setShowUserSubmenu] = useState<boolean>(false);
    const { auth } = useAuthContext();

    const handleMouseOver = () => {
        setShowUserSubmenu(true);
    };

    const handleMouseOut = () => {
        setShowUserSubmenu(false);
    };

    return (
        <div className='navbar-wrapper'>
            <div className='navbar-container'>
                <div className='navbar-part navbar-part-left'>
                    <div className='navbar-logo'>
                        <Link to={HOME} className='user-image'>
                            <img 
                                className='image' 
                                src={logo} 
                                alt='Logo' 
                            />
                        </Link>
                    </div>
                    <nav className='navbar-links'>
                        {navbarButtons.map((btn: INavbarButton, idx: number) =>
                            <NavbarButton key={`navBtn_${idx}`} {...{ btn, idx }} />
                        )}
                    </nav>
                </div>
                <div className='navbar-part navbar-part-right' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    <div className='navbar-user'>
                        {/*  */}
                        <Link to={auth.logged ? HOME : LOGIN} className='user-image'>
                            <img 
                                className='image' 
                                src={auth.logged ? user : anon}
                                alt='User' 
                            />
                        </Link>
                    </div>
                    {showUserSubmenu && <UserSubmenu />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
