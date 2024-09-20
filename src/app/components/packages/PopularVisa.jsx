'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Card, Row, Col } from 'react-bootstrap';
import Slider from "react-slick";
import './packagesStyle.css';

const PopularVisa = () => {
    // Fetch the visa data from Redux store
    const fetcVisa = useSelector(state => state.userLogin.visa);
    const token = useSelector(state => state.userLogin.user?.token);

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1024, // screens smaller than 1024px
                settings: {
                    slidesToShow: 2,
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
        <div>
            <h5 className='popular_visa_text'>Popular Visa Destinations</h5>
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div className="popular_visa_container">
                            {/* Slider component */}
                            <Slider {...settings}>
                                {fetcVisa?.map((visa) => (
                                    <div key={visa._id} className="slider_item">
                                        <div className='visa_card_conatiner'>

                                            <h5 className='popular_visa_text_inside' >{visa.country}</h5>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PopularVisa;
