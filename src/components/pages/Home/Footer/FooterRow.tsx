import React from 'react';
import { Link } from 'react-router-dom';

import { Row } from '@/types';

interface FooterRowProps {
    colIdx: number;
    row: Row;
}

const FooterRow = ({ colIdx, row }: FooterRowProps) => {
    const { rowIdx, text, url } = row;
    return (
        <div className={`row row_${colIdx}_${rowIdx}`}>
            <Link to={url}>{text}</Link>
        </div>
    );
};

export default FooterRow;
