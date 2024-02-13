import React from 'react';
import propTypes from 'prop-types';


const Error404 = (props) => {
    const {url} = props;

    return (
        <div className='error-container'>
            <div>
                <span>No hemos encontrado la URL {url}</span>
            </div>
        </div>
    );
};


Error404.propTypes = {
    url: propTypes.string.isRequired
};


Error404.defaultProps = {
    url: ''
};

export default Error404;
