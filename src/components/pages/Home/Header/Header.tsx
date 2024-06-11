import '@css/Header.css';
import React from 'react';

import Accesibility from './Accesibility';
import Navbar from './Navbar';


const Header = () => (
    <header className='header-wrapper'>
        <Accesibility />
        <Navbar />
    </header>
);

export default Header;
