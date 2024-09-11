'use client'
import React, { useState } from 'react'
import Slider from "react-slick";
import bgone from '../../Assets/homepageassets/homeone.png'
import bgtwo from '../../Assets/homepageassets/hometwo.png'
import bgthree from '../../Assets/homepageassets/homethree.png'
import cardimgeone from '../../Assets/homepageassets/cardimgeone.png'
import cardimgetwo from '../../Assets/homepageassets/cardimgetwo.png'
import cardimgethree from '../../Assets/homepageassets/cardimgethree.png'
import { Card } from 'react-bootstrap'
import Image from 'next/image';
import './HomeHeaderSection.css'
import HomeHeaderSectionforMobile from './HomeHeaderSectionforMobile';

const HomeHeaderSection = () => {
    const [currentBackground, setCurrentBackground] = useState(bgone);
    const [currentDescription, setCurrentDescription] = useState("DESIGN YOUR JOURNEY YOURSELF AND DISCOVER ADVENTURE.");


    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 6000,
        autoplaySpeed: 6000,
        cssEase: "linear",
        beforeChange: (oldIndex, newIndex) => {
            setCurrentBackground(backgroundImagesData[newIndex].bgImageURL);
            setCurrentDescription(backgroundImagesData[newIndex].des);
        },
    };

    const backgroundImagesData = [
        {
            id: 0,
            bgImageURL: bgone,
            cardImage: cardimgeone,
            des: 'DESIGN YOUR JOURNEY YOURSELF AND DISCOVER ADVENTURE.'
        },
        {
            id: 1,
            bgImageURL: bgtwo,
            cardImage: cardimgetwo,
            des: 'Get a UAE visa within 24 hours.'
        },
        {
            id: 2,
            bgImageURL: bgthree,
            cardImage: cardimgethree,
            des: 'Best offers for airline tickets.'
        },
    ]

    return (
        <div className='HomeHeaderSection_container'>

            {/* For Desktop */}
            <div className='head_desktop_section' >

            <div className="content_overlay">
                <div className="overlay_text_container">
                    <h2 className="overlay_text">
                        {currentDescription}
                    </h2>

                    <button className='explore_btn' >Explore Now</button>
                </div>

                <div className="slider_main_container">
                    <Slider {...settings} className="slider_container_hero_section">
                        {backgroundImagesData.map((data) => (
                            <Card className="card_container" key={data.id}>
                                <Image
                                    src={data.cardImage}
                                    alt="cardImage"
                                    className="card_container_image"
                                />
                            </Card>
                        ))}
                    </Slider>
                </div>
            </div>

            <div className='background_image_container'>
                <Image
                    src={currentBackground}
                    alt='Background'
                    layout='fill'
                    objectFit='cover'
                    quality={100}
                    className='background_image'
                />
            </div>
            </div>

            {/* For Mobile */}
            <div className='head_mobile_section'>
                <HomeHeaderSectionforMobile />
            </div>

        </div>
    )
}

export default HomeHeaderSection
