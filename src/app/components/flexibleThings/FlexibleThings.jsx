'use client'
import React, { useState, useEffect } from 'react'
import './FlexibleThings.css'
import Image from 'next/image'
import { Container, Row, Col } from 'react-bootstrap'
import flexiblethings from '../../Assets/homepageassets/flexiblethings.png'
import exploreicon from '../../Assets/homepageassets/exploreicon.png'
import flexiblethngsone from '../../Assets/homepageassets/flexiblethngsone.png'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import Link from 'next/link'
const FlexibleThings = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);
    return (
        <Container>
            <Row className='flexible_things_row' >
                <Col xs={12} sm={12} md={6} xxl={4}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image src={flexiblethings} alt='flexiblethings' className='flexibleThings_image' data-aos="fade-up"/>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={6} xxl={4} className='BookToday'>
                    <div className='BookToday' >
                        <p className='travel_text' data-aos="fade-up">Book Today and Travel</p>

                        <div className='reserve_text_container' >

                            <h4 className='keepthings_flexible' data-aos="fade-up">
                                Keep Things Flexible
                            </h4>

                            <p className='reserve_text' data-aos="fade-up">
                                Use Reserve Now & Pay Later to secure the activities you don’t want to miss without being locked in.
                            </p>
                        </div>

                        <div className='exploreNow_btn_container' data-aos="fade-up">
                            <Link href={'/components/packages'} className='exploreNow_btn  mt-4' style={{textDecoration:'none', color:'black'}} >Explore Now <Image src={exploreicon} alt='exploreicon' /></Link>
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={6} xxl={4}  >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image src={flexiblethngsone} alt='flexiblethngsone' className='flexibleThings_image_one'data-aos="fade-up" />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default FlexibleThings