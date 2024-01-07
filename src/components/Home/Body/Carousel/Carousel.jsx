import React, { useEffect, useRef, useState } from 'react'
import carousel from '/src/data/carousel.js';

export const Carousel = () => {
    const listRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        const listNode = listRef.current;
        const imgNode = listNode.querySelectorAll("carousel")[currentIndex];

        if (imgNode) {
            imgNode.scrollIntoView({
                behavior: "smooth"
            });
        }

    }, [currentIndex]);


    const scrollToImage = (direction) => {
        if (direction === 'prev') {
            setCurrentIndex(curr => {
                const isFirstSlide = currentIndex === 0;
                return isFirstSlide ? 0 : curr - 1;
            })
        } else {
            const isLastSlide = currentIndex === carousel.length - 1;
            if (!isLastSlide) {
                setCurrentIndex(curr => curr + 1);
            }
        }
    }

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }

    return (
        <div className="carousel-container">
            <div className="slider-container">
                <div className='leftArrow' onClick={() => scrollToImage('prev')}>&#10092;</div>
                <div className='rightArrow' onClick={() => scrollToImage('next')}>&#10093;</div>
                <div className="container-images">
                    <ul ref={listRef}>
                        {carousel.map((item) => {
                            return (
                                <li key={item.id}>
                                    <img src={item.img} width={400} height={300} />
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="dots-container">
                    {carousel.map((_, idx) => (
						<div key={idx}
							className={`dot-container-item ${idx === currentIndex ? "active" : ""}`}
							onClick={() => goToSlide(idx)}>
							&#9865;
						</div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Carousel;
