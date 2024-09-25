'use client';
import React, { useState } from 'react';
import { Accordion, Form, Button } from 'react-bootstrap';
import axios from 'axios'; // Importing axios
import Image from 'next/image';
import Callicon from '../../Assets/homepageassets/Call.png';
import Clockicon from '../../Assets/homepageassets/Clock.png';
import Emailicon from '../../Assets/homepageassets/Email.png';
import './EnquiryForm.css';
import { useSelector } from 'react-redux';

const EnquiryForm = () => {
    const [applyOnlineData, setApplyOnlineData] = useState({
        name: '',
        email: '',
        flight: '',
        visa: '',
        phone: '',
        message: '',
    });
    const [applyOnlineErrors, setApplyOnlineErrors] = useState({});


    const [enquireNowData, setEnquireNowData] = useState({
        name: '',
        email: '',
        message: '',
        phone: '',
    });
    const [enquireNowErrors, setEnquireNowErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validation for Apply Online form
    const validateApplyOnline = () => {
        const errors = {};
        if (!applyOnlineData.name) errors.name = 'Name is required';
        if (!applyOnlineData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(applyOnlineData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!applyOnlineData.visa) errors.visa = 'Visa Type is required';
        if (!applyOnlineData.flight) errors.flight = 'Flight is required';
        if (!applyOnlineData.phone) errors.flight = 'phone number is required';
        return errors;
    };

    const handleApplyOnlineSubmit = async (e) => {
        e.preventDefault();
        const errors = validateApplyOnline();
        setApplyOnlineErrors(errors);
        if (Object.keys(errors).length === 0) {
            try {
                setIsSubmitting(true); // Disable the submit button during submission

                // Make the POST request to the API using Axios
                const response = await axios.post(`http://192.168.2.137:4040/api/applyonline/apply`, {
                    name: applyOnlineData.name,
                    email: applyOnlineData.email,
                    flight: applyOnlineData.flight,
                    visa: applyOnlineData.visa,
                    phone: applyOnlineData.phone,
                    message: applyOnlineData.message,
                });

                console.log('Form submitted successfully:', response.data);

                // Optionally clear the form after successful submission
                setApplyOnlineData({
                    name: '',
                    email: '',
                    flight: '',
                    visa: '',
                    phone: '',
                    message: '',
                });

                // Optionally display a success message
                alert('Your application has been submitted successfully!');
            } catch (error) {
                console.error('Error submitting form:', error.response?.data || error.message);
                alert('Failed to submit the form. Please try again.');
            } finally {
                setIsSubmitting(false); // Re-enable the submit button
            }
        }
    };
    // Validation for Enquire Now form
    const validateEnquireNow = () => {
        const errors = {};
        if (!enquireNowData.name) errors.name = 'Name is required';
        if (!enquireNowData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(enquireNowData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!enquireNowData.phone) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(enquireNowData.phone)) {
            errors.phone = 'Phone number is invalid';
        }
        if (!enquireNowData.message) errors.message = 'Message is required';
        return errors;
    };

    const handleEnquireNowSubmit = async (e) => {
        e.preventDefault();
        const errors = validateEnquireNow();
        setEnquireNowErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                setIsSubmitting(true);
                const response = await axios.post('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/contact/post-massage', enquireNowData);
                console.log('Enquire Now form submitted successfully', response.data);

                // Optionally clear the form after successful submission
                setEnquireNowData({
                    name: '',
                    email: '',
                    message: '',
                    phone: '',
                });
            } catch (error) {
                console.error('Error submitting form:', error.response?.data || error.message);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // Dynamic field validation on change for Apply Online form
    const handleApplyOnlineChange = (e) => {
        const { name, value } = e.target;
        setApplyOnlineData((prevData) => ({ ...prevData, [name]: value }));

        // Clear errors as the user types valid values
        setApplyOnlineErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            if (value) {
                delete updatedErrors[name];  // Remove error when the field has a valid value
            }
            return updatedErrors;
        });
    };

    // Dynamic field validation on change for Enquire Now form
    const handleEnquireNowChange = (e) => {
        const { name, value } = e.target;
        setEnquireNowData((prevData) => ({ ...prevData, [name]: value }));

        // Clear errors as the user types valid values
        setEnquireNowErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            if (value) {
                delete updatedErrors[name];  // Remove error when the field has a valid value
            }
            return updatedErrors;
        });
    };

    return (
        <div className='accordian_main_container'>
            <Accordion defaultActiveKey="1"> {/* Setting the defaultActiveKey to 1 */}
                <Accordion.Item eventKey="0">
                    <Accordion.Header className='accordian_header'>Apply Online</Accordion.Header>
                    <Accordion.Body>
                        <Form onSubmit={handleApplyOnlineSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className='form_label'>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    className='input_field'
                                    name="name"
                                    value={applyOnlineData.name}
                                    onChange={handleApplyOnlineChange}
                                />
                                {applyOnlineErrors.name && (
                                    <div className="error-message">{applyOnlineErrors.name}</div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className='form_label'>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    className='input_field'
                                    name="email"
                                    value={applyOnlineData.email}
                                    onChange={handleApplyOnlineChange}
                                />
                                {applyOnlineErrors.email && (
                                    <div className="error-message">{applyOnlineErrors.email}</div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className='form_label'>Flight</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Flight Details"
                                    className='input_field'
                                    name="flight"
                                    value={applyOnlineData.flight}
                                    onChange={handleApplyOnlineChange}
                                />
                                {applyOnlineErrors.flight && (
                                    <div className="error-message">{applyOnlineErrors.flight}</div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className='form_label'>Visa</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Visa Type"
                                    className='input_field'
                                    name="visa"
                                    value={applyOnlineData.visa}
                                    onChange={handleApplyOnlineChange}
                                />
                                {applyOnlineErrors.visa && (
                                    <div className="error-message">{applyOnlineErrors.visa}</div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className='form_label'>Phone</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Number"
                                    className='input_field'
                                    name="phone"
                                    value={applyOnlineData.phone}
                                    onChange={handleApplyOnlineChange}
                                />
                                {applyOnlineErrors.phone && (
                                    <div className="error-message">{applyOnlineErrors.phone}</div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className='form_label'>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter Your Message"
                                    className='input_field'
                                    name="message"
                                    value={applyOnlineData.message}
                                    onChange={handleApplyOnlineChange}
                                />
                                {applyOnlineErrors.message && (
                                    <div className="error-message">{applyOnlineErrors.message}</div>
                                )}
                            </Form.Group>

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="primary" type="submit" className='submit_apply_handler' disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Apply Now'}
                                </Button>
                            </div>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header className='accordian_header'>Enquire Now</Accordion.Header>
                    <Accordion.Body>
                        <Form onSubmit={handleEnquireNowSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className='form_label'>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    className='input_field'
                                    name="name"
                                    value={enquireNowData.name}
                                    onChange={handleEnquireNowChange}
                                />
                                {enquireNowErrors.name && (
                                    <div className="error-message">{enquireNowErrors.name}</div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className='form_label'>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    className='input_field'
                                    name="email"
                                    value={enquireNowData.email}
                                    onChange={handleEnquireNowChange}
                                />
                                {enquireNowErrors.email && (
                                    <div className="error-message">{enquireNowErrors.email}</div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className='form_label'>Phone</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Phone"
                                    className='input_field'
                                    name="phone"
                                    value={enquireNowData.phone}
                                    onChange={handleEnquireNowChange}
                                />
                                {enquireNowErrors.phone && (
                                    <div className="error-message">{enquireNowErrors.phone}</div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className='form_label'>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    type="text"
                                    placeholder="Enter Your Message"
                                    className='input_field'
                                    name="message"
                                    value={enquireNowData.message}
                                    onChange={handleEnquireNowChange}
                                />
                                {enquireNowErrors.message && (
                                    <div className="error-message">{enquireNowErrors.message}</div>
                                )}
                            </Form.Group>

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="primary" type="submit" disabled={isSubmitting} className='submit_apply_handler'>
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </Button>
                            </div>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>


            {/* Contact Information Section */}
            <div className='div_container'>
                <h1 className='title_call'>Call us on</h1>
                <div className='call_conatiner'>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Image src={Callicon} alt='Callicon' width={30} height={30} />
                        <div>
                            <p className='mb-0 p_tag_inquiry'>0543075030</p>
                            <p className='mb-0 p_tag_inquiry'>0543074730</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Image src={Callicon} alt='Callicon' width={30} height={30} />
                        <div>
                            <p className='mb-0 p_tag_inquiry'>0543074735 </p>
                            <p className='mb-0 p_tag_inquiry'>0543074737</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='div_container'>
                <h1 className='title_call'>Timings</h1>
                <div className='call_conatiner'>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Image src={Clockicon} alt='Clockicon' width={30} height={30} />
                        <p className='mb-0 p_tag_inquiry'>mon-sat 24 hours</p>
                    </div>
                </div>
            </div>


            <div className='div_container'>
                <h1 className='title_call'>Mail Us</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'center' }}>
                    <Image src={Emailicon} alt='Emailicon' width={30} height={30} />
                    <div>
                        <p className='mb-0 p_tag_inquiry'>info@joveratourism.ae</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnquiryForm;
