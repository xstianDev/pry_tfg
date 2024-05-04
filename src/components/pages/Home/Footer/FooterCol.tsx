import React from 'react';

import FooterRow from './FooterRow';

import { Column, Row } from '@/types';

interface FooterColProps {
    col: Column
}

const FooterCol = ({ col }: FooterColProps) => {
    const { colIdx, title, rows } = col;

    return (
        <div className={`col col_${colIdx}`}>
            <div className='col_title'>{title}</div>
            {rows.map((row: Row, rowIdx: number) => {
                return (
                    <FooterRow 
                        key={`row_${colIdx}_${rowIdx}`}
                        colIdx={colIdx}
                        row={row}
                    />
                );
            })}
        </div>
    );
};

export default FooterCol;