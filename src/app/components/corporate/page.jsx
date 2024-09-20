'use client'
import React, { useState, useEffect } from 'react'
import HomeNavbar from "../homeNavbar/HomeNavbar";
import './corporatestyle.css'
import Link from 'next/link';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { TiTickOutline } from "react-icons/ti";
import corporateone from '../../Assets/homepageassets/corporateone.png'
import corporatetwo from '../../Assets/homepageassets/corporatetwo.png'
import corporatethree from '../../Assets/homepageassets/corporatethree.png'
import Corporatetravel from '../../Assets/homepageassets/Corporatetravel.png'
import Image from 'next/image';
import Plane from '../../Assets/homepageassets/Plane.png'
import Footer from '../footer/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
const Page = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);
    const servicesData = [
        {
            id: 0,
            icon: <TiTickOutline />,
            title: 'Airline Reservations and Ticketing',
        },
        {
            id: 1,
            icon: <TiTickOutline />,
            title: 'Hotel Accommodation'
        },
        {
            id: 2,
            icon: <TiTickOutline />,
            title: 'Holiday Packages'
        },
        {
            id: 3,
            icon: <TiTickOutline />,
            title: 'Leisure Travel'
        },
        {
            id: 4,
            icon: <TiTickOutline />,
            title: 'Inbound Tours (UAE, Egypt, Lebanon)'
        },
        {
            id: 5,
            icon: <TiTickOutline />,
            title: 'Travel Assistance'
        },
        {
            id: 6,
            icon: <TiTickOutline />,
            title: 'Visa Services (UAE)'
        },
        {
            id: 7,
            icon: <TiTickOutline />,
            title: 'Meetings, Incentives, Conventions and Exhibitions'
        },
    ]

    const corporateImages = [
        {
            id: 0,
            corporateImages: corporateone
        },
        {
            id: 0,
            corporateImages: corporatetwo
        },
        {
            id: 0,
            corporateImages: corporatethree
        },
    ]

    const destinationtxt = [
        {
            id: 0,
            planeImage: Plane,
            planetext: 'Flights To Abu Dhabi'
        },
        {
            id: 1,
            planeImage: Plane,
            planetext: 'Flights To Abu Dubai'
        },
        {
            id: 2,
            planeImage: Plane,
            planetext: 'Flights To Pakistan'
        },
        {
            id: 3,
            planeImage: Plane,
            planetext: 'Flights To Bangladesh'
        },
        {
            id: 4,
            planeImage: Plane,
            planetext: 'Flights To Egypt'
        },
        {
            id: 5,
            planeImage: Plane,
            planetext: 'Flights To London'
        },
        {
            id: 6,
            planeImage: Plane,
            planetext: 'Flights To Australia'
        },
        {
            id: 6,
            planeImage: Plane,
            planetext: 'Flights To Australia'
        },
    ]

    const airlinestxt = [
        {
            id: 0,
            planeImage: Plane,
            planetext: 'Fly Dubai'
        },
        {
            id: 1,
            planeImage: Plane,
            planetext: 'Emirates'
        },
        {
            id: 2,
            planeImage: Plane,
            planetext: 'Etihad Airways'
        },
        {
            id: 3,
            planeImage: Plane,
            planetext: 'British Airways'
        },
        {
            id: 4,
            planeImage: Plane,
            planetext: 'Singapore Airlines'
        },
        {
            id: 5,
            planeImage: Plane,
            planetext: 'Emirates'
        },
        {
            id: 6,
            planeImage: Plane,
            planetext: 'Emirates'
        },
        {
            id: 6,
            planeImage: Plane,
            planetext: 'Emirates'
        },
    ]
    return (
        <>
            <div className='corporate_container' >
                <HomeNavbar />
                <div className='content_container'>
                    <h1 className='about_text' data-aos="fade-up">Corporate</h1>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Link href={'/'} className='about_link' data-aos="fade-up">Home</Link>
                        <Link href={''} className='about_link' data-aos="fade-up">/ Corporate Assistance</Link>
                    </div>
                </div>
            </div>

            <div className='SimplifyingJovera_tourism_container' >
                <h4 className='enjoytraveltext mt-4' data-aos="fade-up">Enjoy Your Travel</h4>
                <h1 className='simplyfytext' data-aos="fade-up">Simplifying Your Journey with <span className='tourism_text' >Jovera Tourism</span> </h1>
                <p className='corporate_p_tag' data-aos="fade-up">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, architecto corrupti nihil obcaecati aliquam blanditiis omnis saepe vitae delectus, rerum explicabo, unde optio! Veniam minus perferendis, reprehenderit iste exercitationem quibusdam?
                </p>
            </div>

            <Container fluid >
                <div className='corporateImages_container'>
                    {
                        corporateImages.map((img, index) => {
                            return (
                                <div key={index} className='corporateImage_div' data-aos="fade-up">
                                    <Image src={img.corporateImages} alt='corporateImages' className='image_corporate' />
                                </div>
                            )
                        })
                    }
                </div>
            </Container>

            <Container>
                <h2 className='corporate_servies_text' data-aos="fade-up">Our Corporate Travel Management Services include</h2>
                <Row>
                    <Col xs={12} md={6} lg={6}>
                        <div className='corporate_servies_text_container'>

                            <div className='service_container' >
                                {servicesData.map((service) => (
                                    <div key={service.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        <div data-aos="fade-up" style={{ marginRight: '10px', fontSize: '20px', color: 'green' }}>{service.icon}</div>
                                        <div data-aos="fade-up" className='service_title' >{service.title}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>

                    <Col xs={12} md={6} lg={6}>
                        <div className='corporate_servies_text_container'>
                            <Image src={Corporatetravel} alt='Corporatetravel' className='Corporatetravel_image' data-aos="fade-up" />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <h5 className='top_destination_text mb-5' data-aos="fade-up">Top Destinations</h5>
                    {
                        destinationtxt.map((dImage, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-5 destinationtxt_container" >
                                <div className="destination_card">
                                    <Image src={dImage.planeImage} data-aos="fade-up" alt='planeImage' className='destination_airline_image' />
                                    <h5 className="mb-0 planetext" data-aos="fade-up"  >{dImage.planetext}</h5>
                                </div>
                            </Col>
                        ))
                    }
                </Row>

                <Row>
                    <h5 className='top_destination_text mb-5' data-aos="fade-up">Top Airlines</h5>
                    {
                        airlinestxt.map((dImage, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-5 destinationtxt_container" >
                                <div className="destination_card">
                                    <Image src={dImage.planeImage} alt='planeImage' className='destination_airline_image' data-aos="fade-up" />
                                    <h5 className="mb-0 planetext" data-aos="fade-up">{dImage.planetext}</h5>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Page