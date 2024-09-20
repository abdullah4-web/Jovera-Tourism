'use client'
import React from 'react'
import './CheckAvailibility.css'
import { Container, Form, Row, Col } from 'react-bootstrap'
import destination from '../../Assets/homepageassets/destination.png'
import typeimage from '../../Assets/homepageassets/type.png'
import Image from 'next/image'
const CheckAvailibility = () => {
    return (
        <div>
            <Container>
                <Row className='checkavailbility_row' >

                    <Col xs={12} sm={12} md={12} lg={6} xxl={2} className='checkavailbility_col' >
                        <Form.Label>
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }} >
                                <Image src={destination} alt='destination' style={{ width: '18px', height: '18px' }} />
                                <span style={{ fontWeight: 'bold' }} >Where</span>  (Destination)
                            </div>
                        </Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Where (Destination)</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={6} xxl={2} className='checkavailbility_col'  >
                        <Form.Label>
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }} >
                                <Image src={typeimage} alt='typeimage' style={{ width: '18px', height: '18px' }} />
                                <span style={{ fontWeight: 'bold' }} >Type</span>  (Activity)
                            </div>
                        </Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Type (Activity)</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={6} xxl={2} className='checkavailbility_col'  >
                        <Form.Label>
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }} >
                                <Image src={typeimage} alt='typeimage' style={{ width: '18px', height: '18px' }} />
                                <span style={{ fontWeight: 'bold' }} >When</span>  (Date)
                            </div>
                        </Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>When (Date)</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={6} xxl={2} className='checkavailbility_col'  >
                        <Form.Label>
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }} >
                                <Image src={typeimage} alt='typeimage' style={{ width: '18px', height: '18px' }} />
                                <span style={{ fontWeight: 'bold' }} >Guests</span>  (0)
                            </div>
                        </Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Guests (0)</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={6} xxl={2} className='checkavailbility_col'  >
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                            <button className='availibilty_btn' >Check Availability</button>
                        </div>
                    </Col>

                </Row>

            </Container>
        </div>
    )
}

export default CheckAvailibility
