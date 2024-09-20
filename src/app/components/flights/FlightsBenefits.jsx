'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import './FlightsBenefits.css'
import bone from '../../Assets/homepageassets/bone.png'
import btwo from '../../Assets/homepageassets/btwo.png'
import bthree from '../../Assets/homepageassets/bthree.png'
const FlightsBenefits = () => {
    return (
        <Container>
            <div className='flight_benefits_container' >
                <h2 className='book_with_us_text' >Why Book With Us</h2>
                <p className='benefits_text' >Check out the benefits of being a Jovera Tourism</p>
            </div>
            <Row className='mt-5' >
                <Col xs={12} sm={12} md={6} lg={4} >
                    <div className='flight_destination' >
                        <Image src={bone} alt='bone' className='bone_image' />
                        <div>
                            <h5 className='flight_text' >Flights to Over 15000 Destinations</h5>
                            <p className='flight_p' >
                                Compare and choose from over thousands of flights, all in one place.
                            </p>
                        </div>
                    </div>
                </Col>

                <Col xs={12} sm={12} md={6} lg={4} >
                    <div className='flight_destination' >
                        <Image src={btwo} alt='btwo' className='bone_image' />
                        <div>
                            <h5 className='flight_text' >Flights to Over 15000 Destinations</h5>
                            <p className='flight_p' >
                                Compare and choose from over thousands of flights, all in one place.
                            </p>
                        </div>
                    </div>
                </Col>

                <Col xs={12} sm={12} md={6} lg={4} >
                    <div className='flight_destination' >
                        <Image src={bthree} alt='bthree' className='bone_image' />
                        <div>
                            <h5 className='flight_text' >Flights to Over 15000 Destinations</h5>
                            <p className='flight_p' >
                                Compare and choose from over thousands of flights, all in one place.
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default FlightsBenefits