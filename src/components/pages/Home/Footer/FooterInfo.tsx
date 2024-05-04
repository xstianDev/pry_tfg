import React from 'react';

import FooterCol from './FooterCol';
import footerCols from '@/assets/js/footerCols';

import { Column } from '@/types';

const FooterCols = () => {
    return (
        <div className='footer-columns'>
            {footerCols.map((col: Column, colIdx: number) => {
                return (
                    <FooterCol 
                        key={`col_${colIdx}`}
                        col={col}
                    />
                );
            })}
        </div>
    );
};

export default FooterCols;