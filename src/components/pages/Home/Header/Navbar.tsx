import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { NavbarButton } from '.';

import navbarButtons from '@/assets/js/navbarButtons';

import logo from '@img/logo.jpg';
import anon from '@img/cabesa_gafa.png';
import user from '@img/cabesa_flor.png';

import { LOGIN } from '@/constants/pageRoutes';
import { Btn } from '@/types';

import '@css/Navbar.css';


const Navbar = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [showUserSubmenu, setShowUserSubmenu] = useState(false);

    useEffect(() => {
        const userSubmenu = document.querySelector('.navbar-user');

        userSubmenu.addEventListener('mouseover', () => {
            setShowUserSubmenu(true);
            // console.log('mouseover', userSubmenu);
        });
        userSubmenu.addEventListener('mouseout', () => {
            setShowUserSubmenu(false);
            // console.log('mouseout', userSubmenu);
        });
    });

    return (
        <>
            <div className='navbar-wrapper'>
                <div className='navbar-container'>
                    <div className='navbar-part navbar-part-left'>
                        <div className='navbar-logo'>
                            <img 
                                className='image' 
                                src={logo} 
                                alt='Logo' 
                            />
                        </div>
                        <nav className='navbar-links'>
                            {navbarButtons.map((btn: Btn, idx: number) =>
                                <NavbarButton 
                                    key={`navBtn_${idx}`}
                                    btn={btn}
                                />
                            )}
                        </nav>
                    </div>
                    <div className='navbar-part navbar-part-right'>
                        <div className='navbar-user'>
                            {/*  */}
                            <Link to={LOGIN} className='user-image'>
                                <img 
                                    className='image' 
                                    src={isLogged ? user : anon}
                                    alt='User' 
                                />
                            </Link>
                        </div>
                        {/* Submenu (?) */}
                    </div>
                </div>
            </div>
            {showUserSubmenu ? 
                <div className='navbar-user-submenu'>
                    <div className='user-submenu-top'>
                    
                    </div>
                    <div className='user-submenu-bottom'>
                    
                    </div>
                </div>
                : null
            }
        </>
    );
};

export default Navbar;
