import React from 'react';

import footerCols from '/src/data/footerCols.js';
import footerSocials from '/src/data/footerSocials.js'

import logo from '/public/images/logo.jpg';

import '/src/styles/Footer.css';


const Footer = () => {
    return (
        <footer className='footer-wrapper'>
            <div className='footer-top'>
                {footerCols.map((col, colIdx) => {
                    return (
                        <div 
                            className={`col col_${colIdx}`}
                            key={`col_${colIdx}`}
                        >
                            <div className='col_title'>{ col.title }</div>
                            {col.rows.map((row, rowIdx) => {
                                return (
                                    <div 
                                        className={`row row_${colIdx}_${rowIdx}`}
                                        key={`row_${colIdx}_${rowIdx}`}
                                    >
                                        <a href={row.href}>
                                            { row.text }
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <div className='footer-bottom'>
                <div className='footer-bottom-left'>
                    <div className='footer-logo'>
                        <img 
                            className="image" 
                            src={logo} 
                            href='/' 
                            alt="Logo" 
                        />
                    </div>
                    <div className='footer-copy-year'>
                        &copy; {new Date().getFullYear()}
                    </div>
                </div>
                <div className='footer-bottom-right'>
                    <div className='footer-socials'>
                        {footerSocials.map((icon, idx) => {
                            return (
                                <div
                                    className={`social_icon social_${idx}`}
                                    key={`social_${idx}`}
                                >
                                    <a href={icon.href} title={icon.title}>
                                       <i className={icon.className}></i>
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;