'use client';
import React, { useState } from 'react';
import { Accordion, Form, Button } from 'react-bootstrap';
import Image from 'next/image';
import Callicon from '../../Assets/homepageassets/Call.png';
import Clockicon from '../../Assets/homepageassets/Clock.png';
import Emailicon from '../../Assets/homepageassets/Email.png';
import './EnquiryForm.css';

const EnquiryForm = () => {
    const [applyOnlineData, setApplyOnlineData] = useState({
        name: '',
        email: '',
        visaType: '',
    });
    const [applyOnlineErrors, setApplyOnlineErrors] = useState({});

    const [enquireNowData, setEnquireNowData] = useState({
        name: '',
        email: '',
        visaType: '',
        phone: '',
    });
    const [enquireNowErrors, setEnquireNowErrors] = useState({});

    // Validation for Apply Online form
    const validateApplyOnline = () => {
        const errors = {};
        if (!applyOnlineData.name) errors.name = 'Name is required';
        if (!applyOnlineData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(applyOnlineData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!applyOnlineData.visaType) errors.visaType = 'Visa Type is required';
        return errors;
    };

    const handleApplyOnlineSubmit = (e) => {
        e.preventDefault();
        const errors = validateApplyOnline();
        setApplyOnlineErrors(errors);
        if (Object.keys(errors).length === 0) {
            console.log('Apply Online form submitted', applyOnlineData);
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
        if (!enquireNowData.visaType) errors.visaType = 'Visa Type is required';
        if (!enquireNowData.phone) {
            errors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(enquireNowData.phone)) {
            errors.phone = 'Phone number is invalid';
        }
        return errors;
    };

    const handleEnquireNowSubmit = (e) => {
        e.preventDefault();
        const errors = validateEnquireNow();
        setEnquireNowErrors(errors);
        if (Object.keys(errors).length === 0) {
            console.log('Enquire Now form submitted', enquireNowData);
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
                                <Form.Label className='form_label'>Visa Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Visa Type"
                                    className='input_field'
                                    name="visaType"
                                    value={applyOnlineData.visaType}
                                    onChange={handleApplyOnlineChange}
                                />
                                {applyOnlineErrors.visaType && (
                                    <div className="error-message">{applyOnlineErrors.visaType}</div>
                                )}
                            </Form.Group>

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="primary" type="submit" className='submit_apply_handler'>
                                    Apply Now
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
                                <Form.Label className='form_label'>Visa Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Visa Type"
                                    className='input_field'
                                    name="visaType"
                                    value={enquireNowData.visaType}
                                    onChange={handleEnquireNowChange}
                                />
                                {enquireNowErrors.visaType && (
                                    <div className="error-message">{enquireNowErrors.visaType}</div>
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

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="primary" type="submit" className='submit_apply_handler' >
                                    Submit
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
                        <p className='mb-0 p_tag_inquiry'>info@jovera.ae</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnquiryForm;
