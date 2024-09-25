'use client'
import React, { useState } from 'react';
import { Form, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import './registerStyle.css';
import registerImage from '../../Assets/homepageassets/registerImage.png'
import Image from 'next/image';
import HomeNavbar from '../homeNavbar/HomeNavbar'

const Page = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        nationality: '',
        address: '',
        password: '',
        picture: null,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!formData.nationality) newErrors.nationality = 'Nationality is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.password) newErrors.password = 'Password is required';

        if (formData.picture && !['image/jpeg', 'image/png', 'image/jpg'].includes(formData.picture.type)) {
            newErrors.picture = 'Only .jpg, .png, and .jpeg files are allowed';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('contact', formData.phone);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('nationality', formData.nationality);
        if (formData.picture) formDataToSend.append('picture', formData.picture);

        try {
            const response = await axios.post('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/users/register', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess('User registered successfully!');
            setFormData({
                email: '',
                name: '',
                phone: '',
                nationality: '',
                address: '',
                password: '',
                picture: null,
            });
            window.location.href = '/components/login';
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <HomeNavbar />
            <div className='register_container_main'>
                <Container>
                    <Row>
                        <Form onSubmit={handleSubmit}>
                            <Card className='register_form'>
                                {success && <Alert variant='success'>{success}</Alert>}

                                <div className='register_image_container' >
                                    <Image src={registerImage} alt='registerImage' width={150} height={150} />
                                </div>
                                <h2 className='text-center 
                                 mt-5'>Register Yourself With Us</h2>
                                <Card.Body>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Form.Group className="mb-3" controlId="formEmail">
                                                <Form.Label className='forgot_label'>Email address</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    isInvalid={!!errors.email}
                                                    className='input_field_forgot '
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Group className="mb-3" controlId="formName">
                                                <Form.Label className='forgot_label'>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    isInvalid={!!errors.name}
                                                    className='input_field_forgot'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Form.Group className="mb-3" controlId="formPhone">
                                                <Form.Label className='forgot_label'>Phone</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter contact"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    isInvalid={!!errors.phone}
                                                    className='input_field_forgot'
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Group className="mb-3" controlId="formNationality">
                                                <Form.Label className='forgot_label'>Nationality</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Nationality"
                                                    name="nationality"
                                                    value={formData.nationality}
                                                    onChange={handleInputChange}
                                                    isInvalid={!!errors.nationality}
                                                    className='input_field_forgot'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Form.Group className="mb-3" controlId="formAddress">
                                                <Form.Label className='forgot_label'>Address</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Address"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    isInvalid={!!errors.address}
                                                    className='input_field_forgot'
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} md={6}>
                                            <Form.Group className="mb-3" controlId="formPassword">
                                                <Form.Label className='forgot_label'>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    isInvalid={!!errors.password}
                                                    className='input_field_forgot'
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>

                                        <Col xs={12} md={12}>
                                            <Form.Group controlId="formFile" className="mb-3">
                                                <Form.Label className='forgot_label'>Profile Picture</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    name="picture"
                                                    onChange={handleInputChange}
                                                    isInvalid={!!errors.picture}
                                                    multiple
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12} md={4}>

                                            <button className='forgot_password_button' type="submit" disabled={loading}>
                                                {loading ? 'Submitting...' : 'Register'}
                                            </button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Form>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Page;
