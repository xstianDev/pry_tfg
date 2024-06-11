import React from 'react';

import FooterRow from './FooterRow';

import { IFooterColumn, IFooterRow } from '@/types';

export interface FooterColProps {
    col: IFooterColumn
    colIdx: number
} 

const FooterCol = ({ col: { title, rows }, colIdx }: FooterColProps) => (
    <div className='col-container'>
        <div className={`col col_${colIdx}`}>
            <span className='col_title'>{title}</span>
            {rows.map((row: IFooterRow, rowIdx: number) => 
                <FooterRow 
                    key={`row_${colIdx}_${rowIdx}`}
                    {...{ row, colIdx, rowIdx }}
                />
            )}
        </div>
    </div>
);

export default FooterCol;