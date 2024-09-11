'use client'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import './TopDestination.css'
import dubai from '../../Assets/homepageassets/dubai.png'
import abudhabi from '../../Assets/homepageassets/abudhabi.png'
import sharjah from '../../Assets/homepageassets/sharjah.png'
import ajman from '../../Assets/homepageassets/ajman.png'
import rasalulkhaima from '../../Assets/homepageassets/rasalulkhaima.png'

const TopDestination = () => {
    return (
        <Container>
            <p className='chooseexperience' >Choose your experience</p>
            <h5 className='topdestination' >Top Attractions Destinations</h5>
            <Row className='topdestination_row mt-5' >
                <Col xs={12} md={6} lg={6} xxl={2} >

                    <div className='images_destination'>
                        <Image src={dubai} alt='dubai' className='destination_image' />
                        <div className='overlay'></div>
                        <h5 className='destination_text_tour'>Dubai</h5>
                        <h5 className='destination_text'>5+ Tours</h5>
                    </div>
                </Col>
                <Col xs={12} md={6} lg={6} xxl={2} >
                    <div className='images_destination'>
                        <Image src={abudhabi} alt='abudhabi' className='destination_image' />
                        <div className='overlay'></div>
                        <h5 className='destination_text_tour' >Abu Dhabi</h5>
                        <h5 className='destination_text' >5+ Tours</h5>
                    </div>
                </Col>
                <Col xs={12} md={6} lg={6} xxl={2} >
                    <div className='images_destination'>
                        <Image src={sharjah} alt='sharjah' className='destination_image' />
                        <div className='overlay'></div>
                        <h5 className='destination_text_tour' >Sharjah</h5>
                        <h5 className='destination_text' >5+ Tours</h5>
                    </div>
                </Col>
                <Col xs={12} md={6} lg={6} xxl={2} >
                    <div className='images_destination'>
                        <Image src={ajman} alt='ajman' className='destination_image' />
                        <div className='overlay'></div>
                        <h5 className='destination_text_tour' >Ajman</h5>
                        <h5 className='destination_text' >5+ Tours</h5>
                    </div>
                </Col>
                <Col xs={12} md={6} lg={6} xxl={2} >
                    <div className='images_destination'>
                        <Image src={rasalulkhaima} alt='rasalulkhaima' className='destination_image' />
                        <div className='overlay'></div>
                        <h5 className='destination_text_tour' >Dubai</h5>
                        <h5 className='destination_text' >5+ Tours</h5>
                    </div>
                </Col>

                <div>
                    <h5 className='destintioncall' >Speak to our Destination Experts at Call <span style={{ color: '#E4A70A' }} >800-664000</span> </h5>
                </div>
            </Row>
        </Container>
    )
}

export default TopDestination