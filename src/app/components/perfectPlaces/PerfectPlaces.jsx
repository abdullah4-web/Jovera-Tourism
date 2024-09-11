'use client'
import React from 'react'
import './PerfectPlaces.css'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import one from '../../Assets/homepageassets/one.jpg'
import two from '../../Assets/homepageassets/two.jpg'
import three from '../../Assets/homepageassets/three.jpg'
import four from '../../Assets/homepageassets/four.jpg'
import five from '../../Assets/homepageassets/five.jpg'
import map from '../../Assets/homepageassets/map.png'
import exploreicon from '../../Assets/homepageassets/exploreicon.png'
const PerfectPlaces = () => {
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
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={12} lg={6} xxl={4} className='travel_places_col_one'>
                        <div className='first_col_container' >
                            <p className='extreme_tours_text' >EXTREME TOURS</p>

                            <div>
                                <h1 className='PerfectTravel' >
                                    The Perfect Travel Place For You & Your Family
                                </h1>

                                <div className='travel_image_container mt-5'>
                                    {
                                        imageArray.map((img, index) => {
                                            return (
                                                <div key={index}>
                                                    <Image src={img.imageUrl} alt='image_url' className='travel_image' />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div>
                                <h5 className='happy_customers mt-4' > <span style={{ color: '#E4A70A', textDecorationLine: 'underline' }}>500k+</span>  Happy Customer</h5>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={12} lg={6} xxl={4} className='travel_places_col_two'>
                        <div>
                            <Image src={map} alt='map' className='map_image' />
                        </div>
                    </Col>
                    <Col xs={12} md={12} lg={6} xxl={4} className='travel_places_col_three'>
                        <div>
                            <h5 className='travel_text' >We believe that a vacation should be more than a hotel room, a flight and a rental car. It should be more than the sum of its parts.</h5>

                            <div className='travel_container_text_number mt-4' >
                                <div>
                                    <h1 className='number_text' >20</h1>
                                    <h5 className='years_text'>Years Experience</h5>
                                </div>

                                <div>
                                    <h1 className='number_text' >400</h1>
                                    <h5 className='years_text'>Destination Travel</h5>
                                </div>

                                <div>
                                    <h1 className='number_text' >50k+</h1>
                                    <h5 className='years_text'>Trusted by Customer</h5>
                                </div>
                            </div>

                            <div className='exploreNow_btn_container' >
                                <button className='exploreNow_btn  mt-4' >Explore Now <Image src={exploreicon} alt='exploreicon' /></button>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PerfectPlaces