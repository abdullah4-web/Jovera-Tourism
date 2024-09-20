'use client'
import React, { useState } from 'react';
import { Button, Form, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import '../login/authstyle.css'
import Image from 'next/image';
import forgotpassword from '../../Assets/homepageassets/forgotpassword.PNG'
const Page = () => {
    const [newPassword, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const email = localStorage.getItem('forgotemail')
    const resetToken = localStorage.getItem('resetToken')

    console.log(newPassword, email, resetToken, 'password')

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Validate password
        if (newPassword.length < 3) {
            setErrorMessage('Password length must be at least 3 characters');
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('Password and Confirm Password do not match');
            return;
        }

        try {
            await axios.post('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/users//reset-password', {
                newPassword: newPassword,
                email: email,
                resetToken: resetToken
            });
            setErrorMessage(''); // Clear error message on successful submission
        } catch (error) {
            console.log(error, 'err');
            setErrorMessage('An error occurred while resetting the password');
        }
    }

    return (
        <div className='login_container_main'>
            <Container>
                <Row>
                    <Form onSubmit={handleSubmit}>
                        <Card className='card_container_forgotpassword' >
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                <Image src={forgotpassword} alt='forgotpassword' width={150} height={150} />
                            </div>
                            <Card.Body>
                                <Card.Title className='text-center forgot_title mt-4' >Reset Password</Card.Title>

                                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                                <Col xs={12} md={12} >

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label className='forgot_label'>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={newPassword}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className='input_field_forgot'
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={12} >

                                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                        <Form.Label className='forgot_label'>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className='input_field_forgot'
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={12} >
                                <div className='forgot_password_btn_container'>
                                    <button className='forgot_password_button' type="submit">
                                        Reset Password
                                    </button>
                                    </div>
                                </Col>
                            </Card.Body>
                        </Card>

                    </Form>
                </Row>
            </Container>

        </div>
    )
}

export default Page
