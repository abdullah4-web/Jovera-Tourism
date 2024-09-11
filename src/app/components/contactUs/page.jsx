'use client'
import React, { useState } from 'react';
import HomeNavbar from "../homeNavbar/HomeNavbar";
import './ContactUsStyle.css';
import Link from 'next/link';
import { Col, Container, Row, Form } from 'react-bootstrap';
import Footer from '../footer/Footer';
import exploreicon from '../../Assets/homepageassets/exploreicon.png';
import Image from 'next/image';
import joveramap from '../../Assets/homepageassets/joveramap.png'
const ContactPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error when user types
        if (value.trim() !== '') {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        // Check for empty fields and set errors
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact Number is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            // Handle form submission if no errors
            console.log('Form submitted successfully', formData);
        }
    };

    return (
        <div className='contact_us_container'>
            <HomeNavbar />
            <div className='content_container'>
                <h1 className='about_text'>Contact</h1>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link href={'/'} className='about_link'>Home</Link>
                    <Link href={''} className='about_link'>Contact</Link>
                </div>
            </div>
            <Container>
                <h1 className='contcat_h1_tag'>
                    Need to contact us? Use one of the options below. Our team is always happy to help.
                </h1>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <div>
                            <h2 className='email_us_text'>Email us</h2>
                            <p className='drop_email'>Drop us an Email and we’ll get back to you within 48hrs…</p>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                                        <Form.Label style={{ fontWeight: '600' }}>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Full Name"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            isInvalid={!!errors.fullName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.fullName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label style={{ fontWeight: '600' }}>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <Form.Group className="mb-3" controlId="formBasicContactNumber">
                                        <Form.Label style={{ fontWeight: '600' }}>Contact Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Contact Number"
                                            name="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            isInvalid={!!errors.contactNumber}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.contactNumber}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <Form.Group className="mb-3" controlId="formBasicMessage">
                                        <Form.Label style={{ fontWeight: '600' }}>What’s Your Message?</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Your Message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            isInvalid={!!errors.message}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className='Start_btn_container'>
                                <button type="submit" className='Submit_btn'>
                                    Submit <Image src={exploreicon} alt='exploreicon' />
                                </button>
                            </div>
                        </Form>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <h2 className='email_us_text'>Trip Queries</h2>
                        <p className='mb-0' style={{ color: '#9097A0' }}>Helpline</p>
                        <h5 style={{ color: '#E4A70A' }} >800-664000</h5>
                        <p className='mb-0' style={{ color: '#9097A0' }}>Contactable hours</p>
                        <h5>Mon-Sat 24 hours</h5>
                        <p className='mb-0' style={{ color: '#9097A0' }} >Require Information About a Trip</p>
                        <h5>info@jovera.ae</h5>
                        <div>
                            <Link href={'https://maps.app.goo.gl/Pry1rF1sxQvJ4SCt8'} target="_blank" >
                                <Image src={joveramap} alt='joveramap' className='joveramap_image'/>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default ContactPage;
