import React from 'react';

import FooterCol from './FooterCol';
import footerCols from '/src/data/footerCols.js';


const FooterCols = () => {
    return (
        <div className='footer-columns'>
            {footerCols.map((col, colIdx) => {
                return (
                    <FooterCol 
                        key={`col_${colIdx}`}
                        col={col}
                    />
                )
            })}
        </div>
    )
}

export default FooterCols;