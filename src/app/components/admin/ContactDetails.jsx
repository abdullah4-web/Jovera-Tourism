'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './adminStyle.css';

const ContactDetails = () => {
    const token = useSelector((state) => state.userLogin.user?.token);
    const [getContactData, setGetContactData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getContactDetails = async () => {
        try {
            const response = await axios.get(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/contact/get-all-massages`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGetContactData(response.data); // Assuming response.data contains the flights
        } catch (error) {
            setError('Failed to fetch contact details');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getContactDetails();
    }, []);

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Container>
            <Row>
                <h4 className='text-center mb-4'>Contact Details</h4>
                {getContactData.map((contact) => (
                    <Col md={12} key={contact.id} className="mb-4">
                        <Card className='contact_card_details' >
                            <Card.Body>
                                <Card.Text>
                                    <strong>Name : </strong>{contact.name}<br />
                                    <strong>Email : </strong> {contact.email}<br />
                                    <strong>Phone Number : </strong> {contact.phone}<br />
                                    <strong>Message : </strong> {contact.message}<br /> <br />

                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                                        <strong>Date : </strong> {new Date(contact.createdAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}<br />
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ContactDetails;
