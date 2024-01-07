import React from 'react';

import footerCols from '/src/data/footerCols.js';
import logo from '/public/images/logo.jpg';

import '/src/styles/Footer.css';

const Footer = () => {
    return (
        <footer className='footer-wrapper'>
            <div className='footer-content'>
                {footerCols.map((col, colIdx) => {
                    console.log(col);
                    <div 
                        className={`col col_${colIdx}`}
                        key={`col_${colIdx}`}
                    >
                        <div>{ col.title }</div>
                        {col.rows.map((row, rowIdx) => {
                            <div 
                                className={`row row_${rowIdx}`}
                                key={`col_${colIdx} row_${rowIdx}`}
                            >
                                { row.title }
                            </div>
                        })}
                    </div>
                })}
            </div>
            <div className='footer-bottom'>
                <div className='copy-year'>
                    &copy; {new Date().getFullYear()}
                </div>
                <div className=''>
                    <img 
                        className="image" 
                        src={logo} 
                        href='/' 
                        alt="Logo" 
                    />
                </div>
            </div>
        </footer>
    )
}

export default Footer;