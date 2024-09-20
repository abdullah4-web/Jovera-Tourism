'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import './adminStyle.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlights } from '../../Redux/loginSlice';

const FlightForm = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [trip, setTrip] = useState('');
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({
        from: false,
        to: false,
        trip: false
    });

    const [successMessage, setSuccessMessage] = useState(''); // New state for success message

    const token = useSelector(state => state.userLogin.user?.token);

    const validateFields = () => {
        let valid = true;
        let tempErrors = { from: false, to: false, trip: false };

        if (from.trim() === '') {
            tempErrors.from = true;
            valid = false;
        }
        if (to.trim() === '') {
            tempErrors.to = true;
            valid = false;
        }
        if (trip.trim() === '') {
            tempErrors.trip = true;
            valid = false;
        }

        setErrors(tempErrors);
        return valid;
    };

    const handleFlightSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            setSuccessMessage(''); // Clear success message if validation fails
            return;
        }

        try {
            const payload = { from, to, trip };
            const response = await axios.post(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/flights/create`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            dispatch(fetchFlights(token));

            // Show success message
            setSuccessMessage('Flight created successfully!');

            // Reset form on success
            setFrom('');
            setTo('');
            setTrip('');
            setErrors({ from: false, to: false, trip: false });
        } catch (error) {
            console.log(error, 'err');
            setSuccessMessage(''); // Clear success message if submission fails
        }
    };

    const handleFieldChange = (field, value) => {
        if (value.trim() !== '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: false,
            }));
        }
    };

    return (
        <Container>
            <h3 className='create_package'>Flight Booking Form</h3>
            <Form onSubmit={handleFlightSubmit} className='mt-3'>
                <Row>
                    <Col xs={12} sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="fromInput">
                            <Form.Label className='label_class'>From</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Departure"
                                value={from}
                                onChange={(e) => {
                                    setFrom(e.target.value);
                                    handleFieldChange('from', e.target.value);
                                }}
                                isInvalid={errors.from}
                                className='input_field'
                            />
                            {errors.from && <p style={{ color: 'red' }} className="mt-2">From field is required.</p>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="toInput">
                            <Form.Label className='label_class'>To</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Destination"
                                value={to}
                                onChange={(e) => {
                                    setTo(e.target.value);
                                    handleFieldChange('to', e.target.value);
                                }}
                                isInvalid={errors.to}
                                className='input_field'
                            />
                            {errors.to && <p style={{ color: 'red' }} className="mt-2">To field is required.</p>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={12}>
                        <Form.Group className="mb-3" controlId="tripSelect">
                            <Form.Label className='label_class'>Trip</Form.Label>
                            <Form.Select
                                value={trip}
                                onChange={(e) => {
                                    setTrip(e.target.value);
                                    handleFieldChange('trip', e.target.value);
                                }}
                                isInvalid={errors.trip}
                                className='input_field'
                            >
                                <option value="">Select Trip Type</option>
                                <option value="One Way">One Way</option>
                                <option value="Round Trip">Round Trip</option>
                            </Form.Select>
                            {errors.trip && <p style={{ color: 'red' }} className="mt-2">Trip type is required.</p>}
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className='mb-3 submit_btn'>Create</Button>
            </Form>

            {/* Display success message if it exists */}
            {successMessage && (
                <Alert variant="success" className="mt-3">
                    {successMessage}
                </Alert>
            )}
        </Container>
    );
};

export default FlightForm;
