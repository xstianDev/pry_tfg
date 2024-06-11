import React from 'react';
import { Link } from 'react-router-dom';

import { IFooterRow } from '@/types';

export interface FooterRowProps {
    row: IFooterRow;
    colIdx: number;
    rowIdx: number;
}

const FooterRow = ({ row: { text, url }, colIdx, rowIdx }: FooterRowProps) => (
    <div className={`row row_${colIdx}_${rowIdx}`}>
        <Link to={url}>{text}</Link>
    </div>
);

export default FooterRow;
