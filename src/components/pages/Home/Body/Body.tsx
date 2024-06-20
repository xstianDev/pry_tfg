import '@css/Body.css';
import React from 'react';

// import Carousel from './Carousel';
import bodyCards from '@js/bodyCards';
import { ICard } from '@/types';
import Card from './Card';

const Body = () => (
    <main className='main-wrapper'>
        {/* <Carousel /> */}

        <div className='body-card-wrapper'>
            {bodyCards.map((card: ICard, idx: number) => 
                <Card key={`body_card_${idx}`} {...card} />
            )}
        </div>

    </main>
);

export default Body;
