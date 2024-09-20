'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import '../login/authstyle.css';
import forgotpassword from '../../Assets/homepageassets/forgotpassword.png';

const Page = () => {
    const [otp, setOtp] = useState({ field1: '', field2: '', field3: '', field4: '' });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');

    // Refs for each input field
    const field1Ref = useRef(null);
    const field2Ref = useRef(null);
    const field3Ref = useRef(null);
    const field4Ref = useRef(null);

    // Load email from localStorage on client-side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedEmail = localStorage.getItem('forgotemail');
            if (storedEmail) {
                setEmail(storedEmail);
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update state with input value
        setOtp({ ...otp, [name]: value });

        // Automatically move to the next input field
        if (value.length === 1) {
            switch (name) {
                case 'field1':
                    field2Ref.current.focus();
                    break;
                case 'field2':
                    field3Ref.current.focus();
                    break;
                case 'field3':
                    field4Ref.current.focus();
                    break;
                default:
                    break;
            }
        }
    };

    const otpVerification = async (e) => {
        e.preventDefault();
        const otpCode = `${otp.field1}${otp.field2}${otp.field3}${otp.field4}`;

        if (otpCode.length !== 4) {
            setErrorMessage('Please enter a 4-digit OTP');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/users/verify-otp', {
                otp: otpCode,
                email: email,
            });
            setSuccessMessage(response.data.message);
            if (typeof window !== 'undefined') {
                localStorage.setItem('resetToken', response.data.resetToken);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Hide success or error message after 5 seconds
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
            }, 5000);

            // Clear timeout if component unmounts
            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);

    return (
        <div className='login_container_main'>
            <Container>
                <Row>
                    <Col xs={12} md={12}>
                        <Form onSubmit={otpVerification}>
                            <Card className='card_container_forgotpassword'>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image src={forgotpassword} alt='forgotpassword' width={150} height={150} />
                                </div>
                                <Card.Title className='text-center forgot_title mt-4'>OTP Verification</Card.Title>
                                <h5 className='forgotpassword_text'>
                                    Your Code was sent to you via email
                                </h5>
                                <Card.Body>
                                    <div className='otp_verification_main_container'>
                                        <Form.Group controlId="otpField1">
                                            <Form.Control
                                                type="text"
                                                name="field1"
                                                value={otp.field1}
                                                onChange={handleChange}
                                                maxLength="1"
                                                className="otp-field"
                                                ref={field1Ref}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="otpField2">
                                            <Form.Control
                                                type="text"
                                                name="field2"
                                                value={otp.field2}
                                                onChange={handleChange}
                                                maxLength="1"
                                                className="otp-field"
                                                ref={field2Ref}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="otpField3">
                                            <Form.Control
                                                type="text"
                                                name="field3"
                                                value={otp.field3}
                                                onChange={handleChange}
                                                maxLength="1"
                                                className="otp-field"
                                                ref={field3Ref}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="otpField4">
                                            <Form.Control
                                                type="text"
                                                name="field4"
                                                value={otp.field4}
                                                onChange={handleChange}
                                                maxLength="1"
                                                className="otp-field"
                                                ref={field4Ref}
                                                required
                                            />
                                        </Form.Group>
                                    </div>

                                    {successMessage && <p className="text-success">{successMessage}</p>}
                                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                                    <div className='forgot_password_btn_container'>
                                        <button className='forgot_password_button' type="submit" disabled={loading}>
                                            {loading ? 'Verifying...' : 'Verify OTP'}
                                        </button>
                                        <Link href={'/components/resetPassword'} style={{ color: 'black', textDecoration: 'none' }}>
                                            New Password
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Page;
