import '@css/Footer.css';
import React from 'react';

import FooterInfo from './FooterInfo';
import FooterSocials from './FooterSocials';

import logo from '@img/logo.jpg';


const Footer = () => (
    <footer className='footer-wrapper'>
        <div className='footer-top'>
            <FooterInfo />
        </div>
        <div className='footer-bottom'>
            <div className='footer-bottom-left'>
                <div className='footer-logo'>
                    <img 
                        className='image' 
                        src={logo} 
                        alt='Logo' 
                    />
                </div>
                <div className='footer-copy-year'>
                    &copy; {new Date().getFullYear()}
                </div>
            </div>
            <div className='footer-bottom-right'>
                <FooterSocials />
            </div>
        </div>
    </footer>
);

export default Footer;