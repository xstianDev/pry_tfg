import React from 'react';

import FooterCol from './FooterCol';
import footerCols from '@/assets/js/footerCols';

import { IFooterColumn } from '@/types';

const FooterCols = () => {
    return (
        <div className='footer-columns'>
            {footerCols.map((col: IFooterColumn, colIdx: number) => 
                <FooterCol key={`col_${colIdx}`} {...{ col, colIdx }} />
            )}
        </div>
    );
};

export default FooterCols;