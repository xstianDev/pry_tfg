import React from 'react';
import PropTypes from "prop-types";

import FooterRow from './FooterRow';


const FooterCol = ({col}) => {
    const {colIdx, title, rows} = col;

    return (
        <div className={`col col_${colIdx}`}>
            <div className='col_title'>{ title }</div>
            {rows.map((row, rowIdx) => {
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

FooterCol.propTypes = {
    col: PropTypes.shape({
        colIdx: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired, 
        rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired
};

FooterCol.defaultProp = {
    col: {
        colIdx: 0,
        title: '', 
        rows: [],
    }
};

export default FooterCol;