'use client'
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { CiStar } from 'react-icons/ci';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector to get token
import { fetchHotels } from '../../Redux/loginSlice';

import './adminStyle.css'

const HotelsForm = () => {
    const [name, setName] = useState(''); // State for name input
    const [stars, setStars] = useState(0); // State for selected stars
    const [nameError, setNameError] = useState(''); // State for name validation error
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const token = useSelector(state => state.userLogin.user?.token); // Get token from Redux store
    const dispatch = useDispatch();

    // Handle form submission
    const handleHotelSubmit = async (e) => {
        e.preventDefault();

        // Validate the name field
        if (name.trim() === '') {
            setNameError('Hotel name is required');
            return;
        }

        try {
            // Send POST request with name, stars, and token in the headers
            const hotelBooking = await axios.post(
                `https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/hotels/create`,
                { name, stars },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Add token to request headers
                    }
                }
            );
            dispatch(fetchHotels(token));
            console.log(hotelBooking.data); // For debugging or success message

            // Show success message and reset the form
            setSuccessMessage('Hotel booking created successfully!');
            setName(''); // Reset the name field
            setStars(0); // Reset the stars
            setNameError(''); // Clear any validation errors

            // Hide success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error(error, 'err');
        }
    };

    // Function to handle real-time validation
    const handleNameChange = (e) => {
        const inputName = e.target.value;
        setName(inputName);

        // Clear error as soon as the user types something
        if (inputName.trim() !== '') {
            setNameError('');
        }
    };

    // Function to handle star click
    const handleStarClick = (index) => {
        setStars(index); // Set the clicked star index as the selected rating
    };

    return (
        <Container>
            <h3 className='create_package'>Hotel Booking Form</h3>
            
            {/* Show success message if available */}
            {successMessage && (
                <Alert variant="success">
                    {successMessage}
                </Alert>
            )}

            <Form onSubmit={handleHotelSubmit} >
                <Row>
                    <Col xs={12} sm={12} md={12} >
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className='label_class'>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Hotel Name"
                                value={name}
                                onChange={handleNameChange} // Update state and perform validation as user types
                                isInvalid={!!nameError} // Add red border if there's an error
                                className='input_field'
                            />
                            {nameError && (
                                <Form.Control.Feedback type="invalid">
                                    {nameError} {/* Display error message */}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={12} >
                    <div style={{ display: 'flex', gap: '5px' }}>
                        {/* Render 5 stars dynamically */}
                        {[1, 2, 3, 4, 5].map((index) => (
                            <CiStar
                                key={index}
                                onClick={() => handleStarClick(index)}
                                style={{
                                    fontSize: '28px',
                                    cursor: 'pointer',
                                    color: stars >= index ? 'gold' : 'gray' // Change color if selected
                                }}
                            />
                        ))}
                    </div>
                    </Col>

                </Row>
                <Button type="submit" className='mb-3 mt-3 submit_btn'>
                    Submit
                </Button>
            </Form>

        </Container>
    );
};

export default HotelsForm;
