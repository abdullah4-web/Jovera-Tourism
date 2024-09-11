import React from "react";
import Slider from "react-slick";
import './HomeHeaderSectionforMobile.css';
import bgone from '../../Assets/homepageassets/homeone.png';
import bgtwo from '../../Assets/homepageassets/hometwo.png';
import bgthree from '../../Assets/homepageassets/homethree.png';
import Image from "next/image";
const HomeHeaderSectionforMobile = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const backgroundImagesData = [
        {
            id: 0,
            imgSrc: bgone,
            des: 'DESIGN YOUR JOURNEY YOURSELF AND DISCOVER ADVENTURE.'
        },
        {
            id: 1,
            imgSrc: bgtwo,
            des: 'Get a UAE visa within 24 hours.'
        },
        {
            id: 2,
            imgSrc: bgthree,
            des: 'Best offers for airline tickets.'
        },
    ];

    return (
        <div className="slider_container_for_mobile">
            <Slider {...settings}>
                {backgroundImagesData.map((slide) => (
                    <div key={slide.id} className="slide">
                        <Image src={slide.imgSrc} alt={`Slide ${slide.id}`} className="slide_img" />
                        <div className="slide_content">
                            <p>{slide.des}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default HomeHeaderSectionforMobile;
