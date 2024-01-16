import React from 'react';
import PropTypes from "prop-types";


const FooterRow = ({colIdx, row}) => {
    const {rowIdx, text, href} = row;

    return (
        <div 
            className={`row row_${colIdx}_${rowIdx}`}
        >
            <a href={href}>
                { text }
            </a>
        </div>
    )
}

FooterRow.propTypes = {
    colIdx: PropTypes.number.isRequired,
    row: PropTypes.shape({
        rowIdx: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired, 
        href: PropTypes.string.isRequired,
    })
}

FooterRow.defaultProp = {
    colIdx: 0,
    row: {
        rowIdx: 0,
        text: '', 
        href: '/',
    }
}

export default FooterRow
