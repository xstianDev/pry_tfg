import React, { useState, useEffect } from 'react';

import NavbarButton from './NavbarButton';

import navbarButtons from '/src/data/navbarButtons.js';

import logo from '/public/images/logo.jpg';
import anon from '/public/images/cabesa_gafa.png';
import user from '/public/images/cabesa_flor.png';

import '/src/styles/Navbar.css';


const Navbar = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [showUserSubmenu, setShowUserSubmenu] = useState(false);

    useEffect(() => {
        const userSubmenu = document.querySelector('.navbar-user');

        userSubmenu.addEventListener('mouseover', () => {
            setShowUserSubmenu(true);
            // console.log("mouseover", userSubmenu);
        });
        userSubmenu.addEventListener('mouseout', () => {
            setShowUserSubmenu(false);
            // console.log("mouseout", userSubmenu);
        });
    });

    return (
        <>
        <div className='navbar-wrapper'>
            <div className='navbar-container'>
                <div className='navbar-part navbar-part-left'>
                    <div className='navbar-logo'>
                        <img 
                            className="image" 
                            src={logo} 
                            href='/' 
                            alt="Logo" 
                        />
                    </div>
                    <nav className='navbar-links'>
                        {navbarButtons.map((btn, idx) =>
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
                        <a href="login">
                            <img 
                                className="image" 
                                src={isLogged
                                    ? user
                                    : anon
                                } 
                                href='/' 
                                alt="User" 
                            />
                        </a>
                    </div>
                    {/* Submenu (?) */}
                </div>
            </div>
        </div>
        {showUserSubmenu 
            ? 
                <div className='navbar-user-submenu'>
                    <div className='user-submenu-top'>
                    
                    </div>
                    <div className='user-submenu-bottom'>
                    
                    </div>
                </div>
            : 
                null
        }
        </>
    );
};

export default Navbar;
