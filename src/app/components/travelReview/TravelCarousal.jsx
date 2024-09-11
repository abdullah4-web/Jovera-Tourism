'use client'
import React, { useState } from "react";
import Slider from "react-slick";
import './TravelReview.css';
import { IoIosStarOutline } from "react-icons/io";

const TravelCarousal = () => {
    const [selectedStars, setSelectedStars] = useState(
        new Array(4).fill(new Array(5).fill(false))
    );

    const toggleStar = (slideIndex, starIndex) => {
        const newSelectedStars = selectedStars.map((slide, i) =>
            i === slideIndex
                ? slide.map((selected, j) =>
                    j === starIndex ? !selected : selected
                )
                : slide
        );
        setSelectedStars(newSelectedStars);
    };

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024, // screens smaller than 1024px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768, // screens smaller than 768px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            },
            {
                breakpoint: 480, // screens smaller than 480px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };

    return (
        <div className="slider_container">
            <Slider {...settings}>
                {selectedStars.map((slide, slideIndex) => (
                    <div className="slider_text_container" key={slideIndex}>
                        <h3 className="slider_text">
                            Absolutely wonderful! Just the right amount of time spent snorkeling and one of the most beautiful beaches I have ever seen. Customer service was professional. Highly recommend.
                        </h3>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="mt-4" >
                            {slide.map((isSelected, starIndex) => (
                                <IoIosStarOutline
                                    key={starIndex}
                                    onClick={() => toggleStar(slideIndex, starIndex)}
                                    style={{ color: isSelected ? "#e4a70a" : "black", cursor: "pointer", fontSize: '24px' }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default TravelCarousal;
