import React from 'react'
import './FlexibleThings.css'
import Image from 'next/image'
import { Container, Row, Col } from 'react-bootstrap'
import flexiblethings from '../../Assets/homepageassets/flexiblethings.png'
import exploreicon from '../../Assets/homepageassets/exploreicon.png'
import flexiblethngsone from '../../Assets/homepageassets/flexiblethngsone.png'
const FlexibleThings = () => {
    return (
        <Container>
            <Row className='flexible_things_row' >
                <Col xs={12} sm={12} md={6} xxl={4}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image src={flexiblethings} alt='flexiblethings' className='flexibleThings_image' />
                    </div>
                </Col>
                <Col xs={12} sm={12} md={6} xxl={4} className='BookToday'>
                    <div className='BookToday' >
                        <p className='travel_text' >Book Today and Travel</p>

                        <div className='reserve_text_container' >

                            <h4 className='keepthings_flexible' >
                                Keep Things Flexible
                            </h4>

                            <p className='reserve_text' >
                                Use Reserve Now & Pay Later to secure the activities you don’t want to miss without being locked in.
                            </p>
                        </div>

                        <div className='exploreNow_btn_container' >
                            <button className='exploreNow_btn  mt-4' >Explore Now <Image src={exploreicon} alt='exploreicon' /></button>
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={6} xxl={4}  >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image src={flexiblethngsone} alt='flexiblethngsone' className='flexibleThings_image_one' />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default FlexibleThings