import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'; // Import Alert for success message
import { useSelector, useDispatch } from 'react-redux';
import { fetchVisa } from '../../Redux/loginSlice'; // Adjust the import based on your file structure
import './adminStyle.css';

const VisaForm = () => {
    // State to store form values
    const [type, setType] = useState('');
    const [country, setCountry] = useState('');
    const [duration, setDuration] = useState('');
    const dispatch = useDispatch();

    // State to handle validation errors
    const [errors, setErrors] = useState({});
    
    // State to handle success message
    const [successMessage, setSuccessMessage] = useState('');

    // Assuming token is stored in the Redux store
    const token = useSelector(state => state.userLogin.user?.token); // Adjust according to your state structure

    // Function to validate the form fields
    const validateForm = () => {
        const newErrors = {};
        if (!type.trim()) newErrors.type = 'Type is required';
        if (!country.trim()) newErrors.country = 'Country is required';
        if (!duration.trim()) newErrors.duration = 'Duration is required';
        return newErrors;
    };

    // Function to handle form submission
    const visaHandle = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Set errors if validation fails
            return;
        }

        try {
            await axios.post(
                'https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/visa/create',
                {
                    type,        // Visa type from state
                    country,     // Country from state
                    duration,    // Duration from state
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Assuming you're passing an auth token
                    },
                }
            );

            // Dispatch action to fetch updated visa data
            dispatch(fetchVisa(token));

            // Reset form fields on success
            setType('');
            setCountry('');
            setDuration('');
            setErrors({});

            // Show success message
            setSuccessMessage('Visa created successfully!');
            
            // Optionally clear success message after a few seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error creating visa:', error);
        }
    };

    // Handle onChange events for inputs
    const handleChange = (setter) => (e) => {
        setter(e.target.value);
        if (errors[e.target.name]) {
            setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: undefined })); // Clear error if valid
        }
    };

    return (
        <Container>
            <h3 className='create_package'>Visa Form</h3>
            
            {/* Show success message if form is submitted successfully */}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            
            <Form onSubmit={visaHandle}>
                <Row>
                    <Col xs={12} sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="formBasicType">
                            <Form.Label className='label_class'>Type</Form.Label>
                            <Form.Control
                                type="text"
                                name="type"
                                placeholder="Enter Visa Type"
                                value={type}
                                onChange={handleChange(setType)}
                                isInvalid={!!errors.type}
                                className='input_field'
                            />
                            {errors.type && <p style={{ color: 'red' }} className="mt-2">{errors.type}</p>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="formBasicCountry">
                            <Form.Label className='label_class'>Country</Form.Label>
                            <Form.Control
                                type="text"
                                name="country"
                                placeholder="Enter Country Name"
                                value={country}
                                onChange={handleChange(setCountry)}
                                isInvalid={!!errors.country}
                                className='input_field'
                            />
                            {errors.country && <p style={{ color: 'red' }} className="mt-2">{errors.country}</p>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={12}>
                        <Form.Group className="mb-3" controlId="formBasicDuration">
                            <Form.Label className='label_class'>Duration</Form.Label>
                            <Form.Control
                                type="text"
                                name="duration"
                                placeholder="Enter Visa Duration"
                                value={duration}
                                onChange={handleChange(setDuration)}
                                isInvalid={!!errors.duration}
                                className='input_field'
                            />
                            {errors.duration && <p style={{ color: 'red' }} className="mt-2">{errors.duration}</p>}
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className='mb-3 submit_btn'>
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default VisaForm;
