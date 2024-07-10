"use client"
import React, { useState, useEffect } from 'react';
import homePagebg from '../Assets/homePageAssets/homePagebg.png';
import { Container, Row, Col } from 'react-bootstrap';
import HomePageNav from './homePageNav'
import locations from '../Assets/homePageAssets/locations.png'
import checkout from '../Assets/homePageAssets/checkout.png'
import checkin from '../Assets/homePageAssets/checkin.png'
import personlogo from '../Assets/homePageAssets/personlogo.png'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import Link from 'next/link';
import './homePageStyle.css';
import Booking from './Booking';
import Destination from './Destination';
import Recommended from './Recommended';
import TipsGuuides from './TipsGuuides';
import Footer from './Footer';

const Page = () => {
    return (
        <>
            <div className='homePageContainer' style={{ backgroundImage: `url(${homePagebg})` }}>
                <HomePageNav />
                <div>
                    <h1 className='journeybegin' >Let the journey begin</h1>
                    <h1 className='adventure' >Discover your next adventure.</h1>
                </div>
            </div>

            <Container>
                <div className='bookingContainer mt-4' >
                    <div className='locationParent'>
                        <Image src={locations} alt='locations' />
                        <div>
                            <h1 className='locationtext' >Location</h1>
                            <InputGroup size="sm" className="">
                                <Form.Control
                                    placeholder='Where are you going'
                                    style={{ borderRadius: '20px', marginTop: '-10px', border: 'none' }}
                                />
                            </InputGroup>
                        </div>
                    </div>

                    <div className='locationParent'>
                        <Image src={checkin} alt='checkin' />
                        <div>
                            <h1 className='locationtext' >Check in</h1>
                            <InputGroup size="sm" className="">
                                <Form.Control
                                    placeholder='Where are you going'
                                    style={{ borderRadius: '20px', marginTop: '-10px', border: 'none' }}
                                    type='Date'
                                />
                            </InputGroup>
                        </div>
                    </div>

                    <div className='locationParent'>
                        <Image src={checkout} alt='checkout' />
                        <div>
                            <h1 className='locationtext' >Check out</h1>
                            <InputGroup size="sm" className="">
                                <Form.Control
                                    placeholder='Where are you going'
                                    style={{ borderRadius: '20px', marginTop: '-10px', border: 'none' }}
                                    type='Date'
                                />
                            </InputGroup>
                        </div>
                    </div>

                    <div className='locationParent'>
                        <Image src={personlogo} alt='personlogo' />
                        <div>
                            <h1 className='locationtext' >Guests</h1>
                            <p className='locationtextpra' >1 guest, 1 room</p>
                        </div>
                    </div>

                    <Link href={'/'} className='searchbtncontainer' >Search</Link>
                </div>

                <Booking />

                <Destination />
            </Container>

            <Recommended />
            <TipsGuuides />
            <Footer />
        </>
    );
};

export default Page;



