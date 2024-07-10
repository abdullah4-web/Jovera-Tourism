import React from 'react'
import { Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import './homePageStyle.css';
import booking from '../Assets/homePageAssets/booking.png'
import learnmore from '../Assets/homePageAssets/learnmore.png'
const Booking = () => {
    return (
        <Row>
            <Col xs={12} md={6} >
                <div>
                    <Image src={booking} alt='booking' className='bookingImage mt-5' />
                </div>
            </Col>
            <Col xs={12} md={6} >
                <div>
                    <Image src={learnmore} alt='booking' className='bookingImage mt-5' />
                </div>
            </Col>
        </Row>
    )
}

export default Booking