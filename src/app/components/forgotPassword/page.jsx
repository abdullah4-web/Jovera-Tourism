'use client'
import React, { useState, useEffect } from 'react'
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'
import Link from 'next/link'
import forgotpassword from '../../Assets/homepageassets/forgotpassword.PNG'
import Image from 'next/image'
import '../login/authstyle.css'
import { IoChevronBack } from "react-icons/io5";

const Page = () => {
    const [email, setEmail] = useState('') // State to store email
    const [formError, setFormError] = useState('') // State to store form errors
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault() // Prevent default form submission behavior

        // Check if email field is empty and set an error if necessary
        if (!email) {
            setFormError('Email is required')
            return
        }

        setFormError('') // Clear any existing errors

        try {
            const forgotPassResponse = await axios.post(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/users/forgot-password`, {
                email: email // Send email as payload
            })
            setSuccessMessage(forgotPassResponse.data.message)
            localStorage.setItem('forgotemail', email)
            window.location.href = '/components/otpVerification';
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const handleChange = (e) => {
        const value = e.target.value
        setEmail(value) // Update email state
        // Clear the error message if the email field has a value
        if (value) {
            setFormError('')
        }
    }

    useEffect(() => {
        // Hide success message after 5 seconds
        if (successMessage && errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('')
                setErrorMessage('')
            }, 5000)

            // Clear timeout if component unmounts
            return () => clearTimeout(timer)
        }
    }, [successMessage, errorMessage])

    return (
        <div className='login_container_main'>
            <Container>
                <Row>
                    <Col xs={12} md={12} >
                        <Form onSubmit={handleSubmit}>
                            <Card className='card_container_forgotpassword' >
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                    <Image src={forgotpassword} alt='forgotpassword' width={150} height={150} />
                                </div>
                                <Card.Body>
                                    <Card.Title className='text-center forgot_title' >Forgot Password</Card.Title>
                                    <h5 className='forgotpassword_text' >
                                        Enter the Email Address associated with your User ID
                                    </h5>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className='forgot_label' >Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            value={email} // Bind input to email state
                                            onChange={handleChange} // Update state on input change
                                            isInvalid={!!formError} // Show error styling if there is an error
                                            className='input_field_forgot '
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formError} {/* Display error message */}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <h5> {successMessage && successMessage} </h5>
                                    <h5> {errorMessage && errorMessage} </h5>


                                    <div className='forgot_password_btn_container'>
                                        <button className='forgot_password_button' type="submit">Submit</button>
                                        <Link href={'/components/otpVerification'} style={{ color: 'black', textDecoration: 'none' }} >
                                            OTO Code
                                        </Link>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Page
