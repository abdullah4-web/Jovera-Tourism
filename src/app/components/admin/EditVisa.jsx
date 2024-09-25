'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Table, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import './adminStyle.css';
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const EditVisa = () => {
    const [visa, setVisas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editVisa, setEditVisa] = useState({ type: '', country: '', duration: '' });
    const [currentVisaId, setCurrentVisaId] = useState(null);
    const token = useSelector((state) => state.userLogin.user?.token);

    const fetchVisa = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/visa/get-all-visa`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setVisas(response.data);
        } catch (error) {
            setError('Failed to fetch visas. Please try again later.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchVisa();
        }
    }, [token]);

    // Visa Delete Handler
    const visadeleteHandler = async (id) => {
        try {
            await axios.put(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/visa/delete-visa/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setVisas(visa.filter(v => v._id !== id));
            fetchVisa();
        } catch (error) {
            console.log(error, 'err');
        }
    }

    // Open modal for editing visa
    const handleEditClick = (visaItem) => {
        setEditVisa({
            type: visaItem.type,
            country: visaItem.country,
            duration: visaItem.duration
        });
        setCurrentVisaId(visaItem._id);
        setShowModal(true);
    }

    // Visa Edit Handler
    const visaEditHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/visa/update-visa/${currentVisaId}`, editVisa, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchVisa();
            setShowModal(false);
        } catch (error) {
            console.log(error, 'err');
        }
    }

    return (
        <Container>
            <h4 className='text-center mb-4'>Visa Details</h4>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {!loading && !error && (
                <>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Visa Type</th>
                                <th>Duration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visa.length > 0 ? (
                                visa.map((visaItem) => (
                                    <tr key={visaItem._id}>
                                        <td>{visaItem.country}</td>
                                        <td>{visaItem.type}</td>
                                        <td>{visaItem.duration}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                                <FiEdit
                                                    style={{ color: 'green', fontSize: '20px', cursor: 'pointer' }}
                                                    onClick={() => handleEditClick(visaItem)}
                                                />
                                                <MdDelete
                                                    style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
                                                    onClick={() => visadeleteHandler(visaItem._id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No visas available.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    {/* Modal for Editing Visa */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Visa</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={visaEditHandler}>
                                <Form.Group controlId="formCountry">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={editVisa.country}
                                        onChange={(e) => setEditVisa({ ...editVisa, country: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formType">
                                    <Form.Label>Visa Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={editVisa.type}
                                        onChange={(e) => setEditVisa({ ...editVisa, type: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDuration">
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={editVisa.duration}
                                        onChange={(e) => setEditVisa({ ...editVisa, duration: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Update Visa
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </Container>
    );
};

export default EditVisa;
