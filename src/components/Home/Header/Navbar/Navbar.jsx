import React, { useState } from 'react';

import NavbarButton from './NavbarButton';
import navbarButtons from '/src/data/navbarButtons.js';

import logo from '/public/images/logo.jpg';
import anon from '/public/images/cabesa_gafa.png';
import user from '/public/images/cabesa_flor.png';

import '/src/styles/Navbar.css';


const Navbar = () => {
    const [isLogged, setIsLogged] = useState(false);

    return (
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
                        <img 
                            className="image" 
                            src={isLogged
                                ? anon
                                : user
                            } 
                            href='/' 
                            alt="User" 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;