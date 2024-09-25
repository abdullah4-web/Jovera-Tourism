'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './adminStyle.css';

const LeadData = () => {
    const token = useSelector((state) => state.userLogin.user?.token);
    const [getLeads, setGetLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchLead = async () => {
        try {
            const fetchEnquiryData = await axios.get(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/applyonline/applications`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGetLeads(fetchEnquiryData.data); // Set the lead data
        } catch (error) {
            setError('Failed to fetch leads');
            console.log(error);
        } finally {
            setLoading(false); // Stop loading state
        }
    }

    useEffect(() => {
        if (token) {
            fetchLead();
        }
    }, [token]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container>
            <h4 className='text-center mb-4'>Lead Details</h4>
            <Row>
                {getLeads.length > 0 ? (
                    getLeads.map((lead) => (
                        <Col key={lead.id} xs={12} sm={6} md={12} className="mb-4">
                            <Card className='contact_card_details' >
                                <Card.Body>
                                    <Card.Title>{lead.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Email : </strong> {lead.email}<br />
                                        <strong>Phone : </strong> {lead.phone}<br />
                                        <strong>Flight : </strong> {lead.flight}<br />
                                        <strong>Visa : </strong> {lead.visa}<br />
                                        <strong>Message : </strong> {lead.message}<br />

                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                                            <strong>Date : </strong> {new Date(lead.createdAt).toLocaleString('en-US', {
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
                    ))
                ) : (
                    <Col>
                        <Alert variant="info">No leads found.</Alert>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default LeadData;
