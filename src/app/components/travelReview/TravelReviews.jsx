'use client'
import React, { useState, useEffect } from 'react'
import './TravelReview.css'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import reviewimage from '../../Assets/homepageassets/reviewimage.png'
import reviewimagetwo from '../../Assets/homepageassets/reviewimagetwo.png'
import TravelCarousal from './TravelCarousal'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
const TravelReviews = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);
    return (
        <Container fluid className='travel_review_container' >
            <div className='booking_process_text' >
                <p className='chooseexperience' data-aos="fade-up">Real Travelers Reviews</p>
                <h5 className='topdestination' data-aos="fade-up">What Our Travelers Say About the Trip</h5>
            </div>
            <Row className='mt-4' >
                <Col xs={12} sm={12} md={12} lg={2} >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image src={reviewimage} alt='reviewimage' className='travel_review_image_class'data-aos="fade-up" />
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={8} >
                    <div className='mt-5' >
                        <TravelCarousal />
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={2} >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image src={reviewimagetwo} alt='reviewimagetwo' className='travel_review_image_class' data-aos="fade-up"/>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default TravelReviews