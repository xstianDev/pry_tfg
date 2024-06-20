import React from 'react';

interface CardProps {
    img: string;
    text: string;
}

const Card = ({ img, text }: CardProps) => {
    return (
        <div className='card-container'>
            <img className='card-image' src={img} />
            <span className='card-text'>{text}</span>
        </div>
    );
};

export default Card;