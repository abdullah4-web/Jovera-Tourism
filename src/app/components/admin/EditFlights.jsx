'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card, Table, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import './adminStyle.css';
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const EditFlights = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentFlight, setCurrentFlight] = useState({});
    const token = useSelector((state) => state.userLogin.user?.token);

    const fetchFlights = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/flights/get-all-flights`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFlights(response.data);
        } catch (error) {
            setError('Failed to fetch flights. Please try again later.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchFlights();
        }
    }, [token]);

    const flightdeleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this flight?")) {
            try {
                await axios.put(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/flights/delete-flight/${id}`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFlights(flights.filter(flight => flight._id !== id));
                fetchFlights();
            } catch (error) {
                console.error('Error deleting flight:', error);
                setError('Failed to delete flight. Please try again later.');
            }
        }
    };

    const flightEditHandler = async () => {
        try {
            await axios.put(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/flights/update-flight/${currentFlight._id}`, {
                from: currentFlight.from,
                to: currentFlight.to,
                trip: currentFlight.trip,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchFlights(); // Refresh flights after edit
            setShowEditModal(false); // Close the modal
        } catch (error) {
            console.log(error, 'err');
            setError('Failed to update flight. Please try again later.');
        }
    };

    const handleEditClick = (flight) => {
        setCurrentFlight(flight); // Set current flight to edit
        setShowEditModal(true); // Show the modal
    };

    return (
        <Container>
            <h4 className='text-center mb-4'>All Flights</h4>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {!loading && !error && (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                                <th>Trip</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flights.map((flight) => (
                                <tr key={flight._id}>
                                    <td>{flight.from}</td>
                                    <td>{flight.to}</td>
                                    <td>{flight.trip}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                            <FiEdit
                                                style={{ color: 'green', fontSize: '20px', cursor: 'pointer' }}
                                                onClick={() => handleEditClick(flight)}
                                            />
                                            <MdDelete
                                                style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
                                                onClick={() => flightdeleteHandler(flight._id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* Edit Flight Modal */}
                    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Flight</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formFrom">
                                    <Form.Label>From</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={currentFlight.from}
                                        onChange={(e) => setCurrentFlight({ ...currentFlight, from: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formTo">
                                    <Form.Label>To</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={currentFlight.to}
                                        onChange={(e) => setCurrentFlight({ ...currentFlight, to: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formTrip">
                                    <Form.Label>Trip</Form.Label>
                                    <Form.Select
                                        value={currentFlight.trip}
                                        onChange={(e) => setCurrentFlight({ ...currentFlight, trip: e.target.value })}
                                    >
                                        <option value="">Select Trip Type</option>
                                        <option value="one-way">One Way</option>
                                        <option value="round-trip">Round Trip</option>
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={flightEditHandler}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </Container>
    );
};

export default EditFlights;
