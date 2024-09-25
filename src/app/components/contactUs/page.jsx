'use client';
import React, { useState, useEffect } from 'react';
import HomeNavbar from "../homeNavbar/HomeNavbar";
import './ContactUsStyle.css';
import { Col, Container, Row, Form } from 'react-bootstrap';
import Footer from '../footer/Footer';
import exploreicon from '../../Assets/homepageassets/exploreicon.png';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaLinkedin, FaTiktok } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { TbBrandYoutube } from "react-icons/tb";

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

    const [submitSuccess, setSubmitSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error when user types
        if (value.trim() !== '') {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        // Check for empty fields and set errors
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact Number is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/contact/post-massage', {
                name: formData.fullName,
                email: formData.email,
                phone: formData.contactNumber,
                message: formData.message
            });
            setSubmitSuccess('Your message has been sent successfully!');
            setFormData({
                fullName: '',
                email: '',
                contactNumber: '',
                message: ''
            });
        } catch (error) {
            setSubmitSuccess('Failed to send message. Please try again later.');
        }
    };

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    const socialMedia = [
        {
            id: 0,
            icon: <FaFacebook />,
            url: 'https://www.facebook.com/jovera.tourism'
        },
        {
            id: 1,
            icon: <FaTiktok />,
            url: 'https://www.facebook.com/jovera.tourism'
        },
        {
            id: 2,
            icon: <BsInstagram />,
            url: 'https://www.instagram.com/jovera_tourism'
        },
        {
            id: 3,
            icon: <TbBrandYoutube />,
            url: 'https://www.facebook.com/jovera.tourism'
        },
    ];

    return (
        <>
            <div className='contact_us_container'>
                <HomeNavbar />
                <div className='content_container'>
                    <h1 className='about_text' data-aos="fade-up">Contact</h1>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Link href={'/'} className='about_link' data-aos="fade-up">Home</Link>
                        <span className='about_link'>/ Contact</span>
                    </div>
                </div>
            </div>
            <Container>
                <h1 className='contcat_h1_tag mt-4' data-aos="fade-up">
                    Need to contact us? Use one of the options below. Our team is always happy to help.
                </h1>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <div>
                            <h2 className='email_us_text' data-aos="fade-up">Email us</h2>
                            <p className='drop_email' data-aos="fade-up">Drop us an Email and we’ll get back to you within 48hrs…</p>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={12} sm={12} md={6} lg={6}>
                                    <Form.Group className="mb-3" controlId="formBasicFirstName" data-aos="fade-up">
                                        <Form.Label style={{ fontWeight: '600' }} data-aos="fade-up">Full Name</Form.Label>
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
                                    <Form.Group className="mb-3" controlId="formBasicEmail" data-aos="fade-up">
                                        <Form.Label style={{ fontWeight: '600' }} data-aos="fade-up">Email</Form.Label>
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
                                    <Form.Group className="mb-3" controlId="formBasicContactNumber" data-aos="fade-up">
                                        <Form.Label style={{ fontWeight: '600' }} data-aos="fade-up">Contact Number</Form.Label>
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
                                    <Form.Group className="mb-3" controlId="formBasicMessage" data-aos="fade-up">
                                        <Form.Label style={{ fontWeight: '600' }} data-aos="fade-up">What’s Your Message?</Form.Label>
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
                                <button type="submit" className='Submit_btn' data-aos="fade-up">
                                    Submit <Image src={exploreicon} alt='exploreicon' />
                                </button>
                            </div>
                        </Form>
                        {submitSuccess && <p style={{ color: 'green' }} >{submitSuccess}</p>}
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <h2 className='email_us_text' data-aos="fade-up">Trip Queries</h2>
                        <p className='mb-0 all_contact_text mt-3' data-aos="fade-up">Helpline</p>
                        <h5 style={{ color: '#E4A70A' }} data-aos="fade-up">800-664000</h5>
                        <p className='mb-0 all_contact_text mt-3' data-aos="fade-up">Contactable hours</p>
                        <h5 data-aos="fade-up">Mon-Sat 24 hours</h5>
                        <p className='mb-0 all_contact_text mt-3' data-aos="fade-up">Require Information About a Trip</p>
                        <h5 data-aos="fade-up">info@joveratourism.ae</h5>

                        <div className='social_links_container mb-3 mt-3'>
                            {socialMedia.map((social) => (
                                <Link key={social.id} href={social.url} target='_blank' data-aos="fade-up" style={{ color: 'black' }} className='social_links'>
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                        <div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.947111273687!2d54.3922058!3d24.4526202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e6862939edac9%3A0x4df84efcc80cb629!2sAl%20Jazira%20Club!5e0!3m2!1sen!2sae!4v1727183124450!5m2!1sen!2sae"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                data-aos="fade-up"
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default ContactPage;
