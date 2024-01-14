import React from 'react';

import Carousel from './Carousel/Carousel';
import "/src/styles/Body.css"

const Body = () => {
    return (
        <main className='main-wrapper'>
            <Carousel />
            <Carousel />
        </main>
    )
}

export default Body;
