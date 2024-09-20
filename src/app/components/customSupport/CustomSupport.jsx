'use client'
import React, { useState, useEffect } from 'react'
import './CustomSupport.css'
import { Container, Row, Col, Form } from 'react-bootstrap'
import one from '../../Assets/homepageassets/one.jpg'
import two from '../../Assets/homepageassets/two.jpg'
import three from '../../Assets/homepageassets/three.jpg'
import four from '../../Assets/homepageassets/four.jpg'
import five from '../../Assets/homepageassets/five.jpg'
import Image from 'next/image'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
const CustomSupport = () => {
    const imageArray = [
        {
            id: 0,
            imageUrl: one
        },
        {
            id: 1,
            imageUrl: two
        },
        {
            id: 2,
            imageUrl: three
        },
        {
            id: 3,
            imageUrl: four
        },
        {
            id: 4,
            imageUrl: five
        },
    ]

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    const loginNavigate = () => {
        window.location.href = '/components/login';
    }
    return (
        <Container fluid >
            <Row  >
                <Col xs={12} sm={12} md={6} lg={6} style={{ backgroundColor: '#F6F8FB', padding: '50px 20px' }}>
                    <div>
                        <h5 className='signup_text' data-aos="fade-up">Sign Up for Our Newsletter</h5>
                        <p className='signup_des' data-aos="fade-up">Save up to 50% on tours and trips. Get instant access to lower prices.</p>
                    </div>

                    <div className='input_fields_container' >

                        <Form.Control
                            type="email"
                            id="inputPassword5"
                            placeholder='Enter your email address'
                            className='form_control_input'
                            data-aos="fade-up"
                        />
                        <button className='Subscribe_btn' data-aos="fade-up">Subscribe</button>
                    </div>
                </Col>

                <Col xs={12} sm={12} md={6} lg={6} style={{ backgroundColor: '#EDF1F4', padding: '50px 20px' }}>
                    <div>
                        <h5 className='signup_text' data-aos="fade-up">24/7 Customer Support</h5>
                        <p className='signup_des' data-aos="fade-up">Contact us now to have all of your tour-related question answered.</p>
                    </div>

                    <div className='custom_support_container'>
                        {
                            imageArray.map((img, index) => {
                                return (
                                    <div key={index}>
                                        <Image src={img.imageUrl} alt='image_url' className='travel_image' data-aos="fade-up"/>
                                    </div>
                                )
                            })
                        }

                        <div>
                            <button className='Subscribe_btn' onClick={loginNavigate} data-aos="fade-up">Login</button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default CustomSupport