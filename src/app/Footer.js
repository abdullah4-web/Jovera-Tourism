import React from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import './homePageStyle.css';
import Link from 'next/link';
import sociallink from '../Assets/homePageAssets/sociallinkone.png'
import storytwo from '../Assets/homePageAssets/sociallinkfour.png'
import storythree from '../Assets/homePageAssets/sociallinkthree.png'
import sociallinkfour from '../Assets/homePageAssets/sociallinkfour.png'
const Footer = () => {
    return (
        <div className='footerContainer' >
            <Container>
                <Row className='footerRow' >

                    <Col xs={12} md={3} >
                        <div>
                            <h1 className='supportName' >Support</h1>
                            <Link href={'/'} style={{ textDecoration: 'none' }} > <h1 className='helpCnter' >Help Center</h1></Link>
                            <Link href={'/'} style={{ textDecoration: 'none' }} > <h1 className='helpCnter' >Our COVID-19 Response</h1></Link>
                            <Link href={'/'} style={{ textDecoration: 'none' }}> <h1 className='helpCnter' >Cancellation options</h1></Link>
                            <Link href={'/'} style={{ textDecoration: 'none' }}>  <h1 className='helpCnter' >Safety information</h1></Link>
                        </div>
                    </Col>


                    <Col xs={12} md={3} >
                        <div>
                            <h1 className='supportName' >Company</h1>
                            <Link href={'/'} style={{ textDecoration: 'none' }} ><h1 className='helpCnter' >About us</h1></Link>
                            <Link href={'/'} style={{ textDecoration: 'none' }} ><h1 className='helpCnter' >Community Blog</h1></Link>
                            <Link href={'/'} style={{ textDecoration: 'none' }} ><h1 className='helpCnter' >Careers</h1></Link>
                            <Link href={'/'} style={{ textDecoration: 'none' }} ><h1 className='helpCnter' >Privacy policy</h1></Link>
                            <Link href={'/'} style={{ textDecoration: 'none' }} ><h1 className='helpCnter' >Terms of service</h1></Link>
                        </div>
                    </Col>


                    <Col xs={12} md={3} >
                        <div>
                            <h1 className='supportName' >Contact</h1>
                            <Link href={'/'} style={{ textDecoration: 'none' }} ><h1 className='helpCnter' >Partnerships</h1></Link>
                            <Link href={'/'} style={{ textDecoration: 'none' }} ><h1 className='helpCnter' >FAQ</h1></Link>
                            <Link href={'/'} style={{ textDecoration: 'none' }} ><h1 className='helpCnter' >Get in touch</h1></Link>
                        </div>
                    </Col>

                    <Col xs={12} md={3} >
                        <h1 className='supportName' >Social</h1>
                        <div style={{ display: 'flex', gap: '5px' }} >
                            <Link href={'/'} style={{ textDecoration: 'none' }} > <Image src={sociallink} alt='sociallink' /></Link>
                            <Link href={'/'} style={{ textDecoration: 'none' }} > <Image src={storytwo} alt='sociallink' /></Link>
                            <Link href={'/'} style={{ textDecoration: 'none' }} > <Image src={storythree} alt='sociallink' /></Link>
                            <Link href={'/'} style={{ textDecoration: 'none' }} > <Image src={sociallinkfour} alt='sociallinkfour' /></Link>
                        </div>
                    </Col>
                    <hr />
                    <div>
                        <h1 className='coprightTraveler' >© Copyright Traveler</h1>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Footer









