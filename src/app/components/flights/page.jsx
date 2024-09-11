'use client'
import React, { useState } from 'react';
import HomeNavbar from "../homeNavbar/HomeNavbar";
import './flightstyle.css';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import tabbybutton from '../../Assets/homepageassets/tabbybutton.png'
import FlightsBenefits from './FlightsBenefits';
import TrendingFlights from './TrendingFlights';
const Page = () => {
    const [tripType, setTripType] = useState('oneway');

    return (
        <div className='flight_container'>
            <HomeNavbar />
            <div className='content_container'>
                <h1 className='about_text'>Contact</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link href={'/'} className='about_link'>Home</Link>
                    <Link href={''} className='about_link'>Flights</Link>
                </div>
            </div>
            <div className='search_container'>
                <Container fluid >

                    <div className='trip_type_container'>
                        <button
                            className={`trip_type_button ${tripType === 'oneway' ? 'active' : ''}`}
                            onClick={() => setTripType('oneway')}
                        >
                            One Way
                        </button>
                        <button
                            className={`trip_type_button ${tripType === 'roundtrip' ? 'active' : ''}`}
                            onClick={() => setTripType('roundtrip')}
                        >
                            Round Trip
                        </button>
                        <button
                            className={`trip_type_button ${tripType === 'multicity' ? 'active' : ''}`}
                            onClick={() => setTripType('multicity')}
                        >
                            Multi-City
                        </button>
                    </div>

                    <div className='form_container'>
                        <div className='form_group'>
                            <label style={{ color: 'black' }} >From</label>
                            <input type='text' className='form_input' placeholder='Enter Departure' />
                        </div>
                        <div className='form_group'>
                            <label style={{ color: 'black' }}>To</label>
                            <input type='text' className='form_input' placeholder='Enter Destination' />
                        </div>
                        <div className='form_group'>
                            <label style={{ color: 'black' }}>Departure Date</label>
                            <input type='date' className='form_input' />
                        </div>
                        {tripType !== 'oneway' && (
                            <div className='form_group'>
                                <label style={{ color: 'black' }}>Return Date</label>
                                <input type='date' className='form_input' />
                            </div>
                        )}
                        <div className='form_group'>
                            <label style={{ color: 'black' }}>Travelers & Class</label>
                            <input type='text' className='form_input' placeholder='1 Adult, Economy' />
                        </div>
                        <div className='form_group checkbox_group'>
                            <label style={{ color: 'black' }}>Direct Flight</label>
                            <input type='checkbox' />
                        </div>
                        <div className='form_group checkbox_group'>
                            <label style={{ color: 'black' }}>Refundable</label>
                            <input type='checkbox' />
                        </div>
                        <div className='search_button_container'>
                            <button className='search_button'>Search Flights</button>
                        </div>
                    </div>
                    {/* Tabby Container */}
                    <div className='interest_free_tabby' >

                        <div className='interest_free_container' >
                            <h5 className='interest_free' >4 Instalments, Interest Free</h5>
                        </div>
                        <button className='tabby_btn' > Tabby </button>

                    </div>
                </Container>
            </div>

            <FlightsBenefits />
            {/* <TrendingFlights /> */}
        </div>
    );
};

export default Page;
