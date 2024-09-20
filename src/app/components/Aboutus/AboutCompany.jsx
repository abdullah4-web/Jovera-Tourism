'use client'
import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import './aboutStyle.css'
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const AboutCompany = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    return (
        <Container className='company_detail_container'>
            <div className='about_company_container'>
                <h5 className='about_company_text' data-aos="fade-up">About the company</h5>
                <p className='founded_text' data-aos="fade-up">
                    Founded in 2018 in the UAE, Jovera Tourism has quickly become a leader in travel and tourism. Known for innovation, we offer personalized services including travel planning, tours, and destination management. We prioritize integrity and client satisfaction, building strong partnerships and guiding clients with expertise. Dedicated to achieving travel goals, our journey is defined by growth, innovation, and excellence in the UAE’s tourism sector. You.
                </p>
            </div>
            <Row className='mt-4'>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <div className='founded_text_container'>
                        <h5 data-aos="fade-up" className='missionvision'>Our Mission</h5>
                        <p className='founded_text' data-aos="fade-up">
                            At Jovera Tourism, our mission is to redefine travel through innovation, personalized service, and unwavering integrity. Since 2013, we&apos;ve aimed to exceed client expectations with comprehensive, tailored travel solutions. Guided by our passion for exploration and deep industry knowledge, we forge lasting partnerships based on trust and satisfaction, setting new standards in the UAE&apos;s travel sector to inspire joyful and confident exploration worldwide.
                        </p>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <div className='founded_text_container_two'>
                        <h5 data-aos="fade-up" className='missionvision'>Our Vision</h5>
                        <p className='founded_text' data-aos="fade-up">
                            At Jovera Tourism, our vision is to set new standards in global travel through innovation, excellence, and client satisfaction. With integrity and a passion for exploration, we inspire confidence in travelers, creating memorable experiences that foster lasting connections. Our goal is to ensure every journey with Jovera Tourism is a seamless adventure filled with discovery and delight.
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutCompany;
