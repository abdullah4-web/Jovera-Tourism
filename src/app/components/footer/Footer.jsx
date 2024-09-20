'use client'
import React from 'react'
import './Footer.css';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import navlogo from '../../Assets/homeNavbarAssets/navlogo.png';
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {

    // Footer Image Handler
    const footerImageHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const socialMedia = [
        {
            id: 0,
            icon: <FaFacebook />
        },
        {
            id: 1,
            icon: <FaTwitter />
        },
        {
            id: 2,
            icon: <BsInstagram />
        },
        {
            id: 3,
            icon: <FaLinkedin />
        },
    ];

    return (
        <div className='footer_main_container'>
            <Container>
                <Row>
                    <Col xs={12} md={6} lg={6} className='first_column'>
                        <div className='footer_text' >
                            <Link className='linktag_footer' href=''>About Us</Link>
                            <Link className='linktag_footer' href=''>Contact Us</Link>
                            <Link className='linktag_footer' href=''>Travel Guides</Link>
                            <Link className='linktag_footer' href=''>Data Policy</Link>
                        </div>

                        <div className='footer_text'>
                            <Link className='linktag_footer' href=''>Visa</Link>
                            <Link className='linktag_footer' href=''>Flights</Link>
                            <Link className='linktag_footer' href=''>Corporate</Link>
                            <Link className='linktag_footer' href=''>Packages</Link>
                        </div>
                    </Col>

                    <Col xs={12} md={6} lg={6} className='second_column'>
                        <div onClick={footerImageHandler} className='mt-5 footer-logo-container'>
                            <Image src={navlogo} alt='navlogo' className='footer-logo' style={{ cursor: 'pointer' }} />
                        </div>
                        <div className='jovera_contact_details mt-3'>
                            <Link className='jovera_address' style={{ textDecoration: 'underline' }} href={'https://maps.app.goo.gl/Pry1rF1sxQvJ4SCt8'} target="_blank">
                                Al Jazira Club - floor No. 8 - Tower A Al Muroor St - Al Nahyan - Zone 1 - Abu Dhabi
                            </Link>
                            <h5 className='jovera_number mt-2'>800-664000</h5>
                            <p className='jovera_email mt-2'>info@jovera.ae</p>
                        </div>
                    </Col>
                </Row>

                <div style={{ width: '100%', height: '1px', backgroundColor: 'white', marginTop: '20px' }}></div>

                <div style={{ paddingBottom: '40px' }} className='footer_social_terms_container' >

                    <div>
                        <p className='rightsreserved mb-0' >© 2022 <span style={{ color: '#E4A70A', fontWeight: '600' }}>JOVERA TOURISM.</span> All rights reserved.</p>
                    </div>

                    <div className='privacypolicy_cookies' >
                        <Link href='' className='termsandconditions' >Terms & Conditions</Link>
                        <Link href='' className='termsandconditions' >Cookies</Link>
                        <Link href='' className='termsandconditions' >Privacy Policy</Link>
                    </div>

                    <div className='social_links_container' >
                        {socialMedia.map((social) => (
                            <div key={social.id} className='social_links'>
                                {social.icon}
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;
