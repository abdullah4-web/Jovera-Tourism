'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import './adminStyle.css';

const HotelPackage = () => {
    const token = useSelector(state => state.userLogin.user?.token);
    const [allPackages, setAllPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const fetcFlights = useSelector(state => state.userLogin.flights);
    const fetcHotels = useSelector(state => state.userLogin.hotels);
    const fetcVisa = useSelector(state => state.userLogin.visa);

    const [formData, setFormData] = useState({
        flight: null,
        hotel: null,
        visa: null,
        amount: '',
        duration: '',
        type: null,
        image: null,
        foregroundimage: null,
        title: '',
        country: '',
        description: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [flightOptions, setFlightOptions] = useState([]);
    const [hotelOptions, setHotelOptions] = useState([]);
    const [visaOptions, setVisaOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);

    // Extract unique types from allPackages for the type dropdown
    useEffect(() => {
        const extraTypes = ['Hot Deals', 'Normal Deals'];
        const packageTypes = allPackages.map(pkg => pkg.type);
        const combinedTypes = new Set([...packageTypes, ...extraTypes]);
        const formattedTypeOptions = Array.from(combinedTypes).map(type => ({
            value: type,
            label: type
        }));
        setTypeOptions(formattedTypeOptions);
    }, [allPackages]);

    // Populate flight, hotel, and visa options
    useEffect(() => {
        if (fetcFlights) {
            setFlightOptions(fetcFlights.map(flight => ({
                value: flight._id,
                label: `${flight.from} to ${flight.to} (${flight.trip})`
            })));
        }

        if (fetcHotels) {
            setHotelOptions(fetcHotels.map(hotel => ({
                value: hotel._id,
                label: hotel.name
            })));
        }

        if (fetcVisa) {
            setVisaOptions(fetcVisa.map(visa => ({
                value: visa._id,
                label: `${visa.country} - ${visa.duration} (${visa.type})`
            })));
        }
    }, [fetcFlights, fetcHotels, fetcVisa]);

    // Handle changes for Select components
    const handleSelectChange = (selectedOption, name) => {
        setFormData(prevFormData => ({ ...prevFormData, [name]: selectedOption }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    // Handle changes for text inputs
    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        setFormData(prevFormData => ({ ...prevFormData, image: e.target.files[0] }));
        setErrors(prevErrors => ({ ...prevErrors, image: '' }));
    };

    const handleFileForGroundChange = (e) => {
        setFormData(prevFormData => ({ ...prevFormData, foregroundimage: e.target.files[0] }));
        setErrors(prevErrors => ({ ...prevErrors, foregroundimage: '' }));
    };

    // Validate form inputs
    const validateForm = () => {
        const newErrors = {};
        if (!formData.flight) newErrors.flight = 'Flight is required';
        if (!formData.hotel) newErrors.hotel = 'Hotel is required';
        if (!formData.visa) newErrors.visa = 'Visa is required';
        if (!formData.amount) newErrors.amount = 'Amount is required';
        if (!formData.duration) newErrors.duration = 'Duration is required';
        if (!formData.type) newErrors.type = 'Type is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.image) newErrors.image = 'Image upload is required';
        if (!formData.foregroundimage) newErrors.foregroundimage = 'Foreground Image upload is required';

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        const formErrors = validateForm();

        if (Object.keys(formErrors).length === 0) {
            const payload = new FormData();
            payload.append('flight', formData.flight?.value || '');
            payload.append('hotel', formData.hotel?.value || '');
            payload.append('visa', formData.visa?.value || '');
            payload.append('amount', formData.amount);
            payload.append('duration', formData.duration);
            payload.append('type', formData.type?.value || '');
            payload.append('country', formData.country || '');
            payload.append('description', formData.description || '');
            payload.append('title', formData.title || '');
            payload.append('image', formData.image);
            payload.append('foregroundimage', formData.foregroundimage);

            try {
                const response = await axios.post('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/package/create', payload, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 201 || response.status === 200) {
                    setSuccessMessage('Package created successfully!');
                    setFormData({
                        flight: null,
                        hotel: null,
                        visa: null,
                        amount: '',
                        duration: '',
                        title: '',
                        type: null,
                        image: null,
                        country: '',
                        description: '',
                        foregroundimage: null
                    });
                    fetchPackages(); // Refresh the packages list
                }
                console.log(response.data, 'responsedata');
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'Failed to create the package.');
            }
        } else {
            setErrors(formErrors);
        }
    };

    // Fetch all packages from the API
    const fetchPackages = async () => {
        try {
            const response = await axios.get('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/package/get-all-packages', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAllPackages(response.data);
            setFilteredPackages(response.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
            setErrorMessage('Failed to fetch packages.');
        }
    };

    // Fetch packages on component mount or when token changes
    useEffect(() => {
        if (token) {
            fetchPackages();
        }
    }, [token]);

    return (
        <Container>
            <h3 className='create_package'>Create Package</h3>

            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form onSubmit={handleSubmit} className='mt-3'>
                <Row>
                    <Col xs={12} sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="formFlight">
                            <Form.Label className='label_class'>Flight</Form.Label>
                            <Select
                                name="flight"
                                options={flightOptions}
                                value={formData.flight}
                                onChange={(option) => handleSelectChange(option, 'flight')}
                                placeholder="Select Flight"
                                className='input_field'
                            />
                            {errors.flight && <p className="text-danger">{errors.flight}</p>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="formHotel">
                            <Form.Label className='label_class'>Hotel</Form.Label>
                            <Select
                                name="hotel"
                                options={hotelOptions}
                                value={formData.hotel}
                                onChange={(option) => handleSelectChange(option, 'hotel')}
                                placeholder="Select Hotel"
                                className='input_field'
                            />
                            {errors.hotel && <p className="text-danger">{errors.hotel}</p>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="formVisa">
                            <Form.Label className='label_class'>Visa</Form.Label>
                            <Select
                                name="visa"
                                options={visaOptions}
                                value={formData.visa}
                                onChange={(option) => handleSelectChange(option, 'visa')}
                                placeholder="Select Visa"
                                className='input_field'
                            />
                            {errors.visa && <p className="text-danger">{errors.visa}</p>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="formAmount">
                            <Form.Label className='label_class'>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleTextChange}
                                placeholder="Enter Amount"
                                isInvalid={!!errors.amount}
                                className='input_field'
                            />
                            {errors.amount && <p className="text-danger">{errors.amount}</p>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="formDuration">
                            <Form.Label className='label_class'>Duration</Form.Label>
                            <Form.Control
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleTextChange}
                                placeholder="Enter Duration"
                                isInvalid={!!errors.duration}
                                className='input_field'
                            />
                            {errors.duration && <p className="text-danger">{errors.duration}</p>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="formType">
                            <Form.Label className='label_class'>Category</Form.Label>
                            <Select
                                name="type"
                                options={typeOptions}
                                value={formData.type}
                                onChange={(option) => handleSelectChange(option, 'type')}
                                placeholder="Select Category"
                                className='input_field'
                            />
                            {errors.type && <p className="text-danger">{errors.type}</p>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="formDuration">
                            <Form.Label className='label_class'>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleTextChange}
                                placeholder="Enter Title"
                                isInvalid={!!errors.title}
                                className='input_field'
                            />
                            {errors.title && <p className="text-danger">{errors.title}</p>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="formDuration">
                            <Form.Label className='label_class'>Country</Form.Label>
                            <Form.Control
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleTextChange}
                                placeholder="Enter country"
                                isInvalid={!!errors.country}
                                className='input_field'
                            />
                            {errors.country && <p className="text-danger">{errors.country}</p>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label className='label_class'>Upload ForeGround Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="foregroundimage"
                                onChange={handleFileForGroundChange}
                                isInvalid={!!errors.foregroundimage}
                            />
                            {errors.foregroundimage && <p className="text-danger">{errors.foregroundimage}</p>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label className='label_class'>Upload Thumbnil Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                                isInvalid={!!errors.image}
                            />
                            {errors.image && <p className="text-danger">{errors.image}</p>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="formDuration">
                            <Form.Label className='label_class'>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                as="textarea" rows={3}
                                value={formData.description}
                                onChange={handleTextChange}
                                placeholder="Enter Package Detail Here..."
                                isInvalid={!!errors.description}
                                className='input_field'
                            />
                            {errors.description && <p className="text-danger">{errors.description}</p>}
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

export default HotelPackage;
