import React from 'react'
import './TravelReview.css'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import reviewimage from '../../Assets/homepageassets/reviewimage.png'
import reviewimagetwo from '../../Assets/homepageassets/reviewimagetwo.png'
import TravelCarousal from './TravelCarousal'
const TravelReviews = () => {
    return (
        <Container fluid className='travel_review_container' >
            <div className='booking_process_text' >
                <p className='chooseexperience' >Real Travelers Reviews</p>
                <h5 className='topdestination' >What Our Travelers Say About the Trip</h5>
            </div>
            <Row className='mt-4' >
                <Col xs={12} sm={12} md={12} lg={2} >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image src={reviewimage} alt='reviewimage' className='travel_review_image_class' />
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={8} >
                    <div className='mt-5' >
                        <TravelCarousal />
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={2} >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image src={reviewimagetwo} alt='reviewimagetwo' className='travel_review_image_class' />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default TravelReviews