'use client'
import React from 'react'
import './CustomSupport.css'
import { Container, Row, Col, Form } from 'react-bootstrap'
import one from '../../Assets/homepageassets/one.jpg'
import two from '../../Assets/homepageassets/two.jpg'
import three from '../../Assets/homepageassets/three.jpg'
import four from '../../Assets/homepageassets/four.jpg'
import five from '../../Assets/homepageassets/five.jpg'
import Image from 'next/image'
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
    return (
        <Container fluid >
            <Row  >
                <Col xs={12} sm={12} md={6} lg={6} style={{ backgroundColor: '#F6F8FB', padding: '50px 20px' }}>
                    <div>
                        <h5 className='signup_text' >Sign Up for Our Newsletter</h5>
                        <p className='signup_des' >Save up to 50% on tours and trips. Get instant access to lower prices.</p>
                    </div>

                    <div className='input_fields_container' >

                        <Form.Control
                            type="email"
                            id="inputPassword5"
                            placeholder='Enter your email address'
                            className='form_control_input'
                        />
                        <button className='Subscribe_btn' >Subscribe</button>
                    </div>
                </Col>

                <Col xs={12} sm={12} md={6} lg={6} style={{ backgroundColor: '#EDF1F4', padding: '50px 20px' }}>
                    <div>
                        <h5 className='signup_text' >24/7 Customer Support</h5>
                        <p className='signup_des' >Contact us now to have all of your tour-related question answered.</p>
                    </div>

                    <div className='custom_support_container'>
                        {
                            imageArray.map((img, index) => {
                                return (
                                    <div key={index}>
                                        <Image src={img.imageUrl} alt='image_url' className='travel_image' />
                                    </div>
                                )
                            })
                        }

                        <div>
                            <button className='Subscribe_btn'>Chat Now</button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default CustomSupport