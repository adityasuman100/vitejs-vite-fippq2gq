// File: Carousel.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Carousel.css'; // For styling

const Carousel = ({ items = [
    'https://img.freepik.com/free-vector/instagram-carousel-templates_52683-51656.jpg?semt=ais_hybrid',
    'https://img.freepik.com/free-vector/instagram-carousel-templates_23-2148778411.jpg?semt=ais_hybrid',
    'https://img.freepik.com/free-vector/instagram-carousel-templates_52683-51653.jpg?semt=ais_hybrid',
], autoSlide = true, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        'https://via.placeholder.com/800x400?text=Slide+1',
        'https://via.placeholder.com/800x400?text=Slide+2',
        'https://via.placeholder.com/800x400?text=Slide+3',
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        if (autoSlide) {
            const slideInterval = setInterval(nextSlide, interval);
            return () => clearInterval(slideInterval); // Cleanup on unmount
        }
    }, [currentIndex, autoSlide, interval]);

    return (
        <div className="carousel">
            <div className="carousel-inner">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === currentIndex ? 'active' : ''
                            }`}
                    >
                        <img src={item} alt={`Slide ${index}`} />
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button className="carousel-button prev" onClick={prevSlide}>
                &#10094;
            </button>
            <button className="carousel-button next" onClick={nextSlide}>
                &#10095;
            </button>

            {/* Indicators */}
            <div className="carousel-indicators">
                {items.map((_, index) => (
                    <span
                        key={index}
                        className={`indicator ${index === currentIndex ? 'active' : ''
                            }`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

Carousel.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    autoSlide: PropTypes.bool,
    interval: PropTypes.number,
};

export default Carousel;
