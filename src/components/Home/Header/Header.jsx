import React, { useState, useEffect } from 'react';

import MenuAccesibilidad from './MenuAccesibilidad';
import Navbar from './Navbar';

import '/src/styles/Header.css';


const Header = () => {
    const [headerClass, setHeaderClass] = useState('header-wrapper');

    // TODO: cambiar 28 por la altura de MenuAccesibilidad
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setHeaderClass((window.scrollY !== 0) 
                ? 'header-wrapper header-sticky' 
                : 'header-wrapper');
        });
    }, []);

    return (
        <header className={headerClass}>
            <MenuAccesibilidad />
            <Navbar />
        </header>
    )
}

export default Header;
