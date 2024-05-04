import React from 'react';


const Error404 = () => {
    return (
        <div className='error-container'>
            <div>
                <span>No hemos encontrado la URL {window.location.href}</span>
            </div>
        </div>
    );
};

export default Error404;
