'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Table, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import './adminStyle.css';
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const EditHotels = () => {
    const [allHotels, setAllHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentHotel, setCurrentHotel] = useState({ id: '', name: '', stars: '' });
    const token = useSelector((state) => state.userLogin.user?.token);

    // Get All Hotels
    const getAllHotels = async () => {
        try {
            const response = await axios.get(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/hotels/get-all-hotels`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAllHotels(response.data);
        } catch (error) {
            setError('Failed to fetch hotels. Please try again later.');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllHotels();
    }, [token]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
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

    // Hotel Delete Handler
    const hotelDeleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this Hotel?")) {
            try {
                await axios.put(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/hotels/delete-hotel/${id}`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAllHotels(allHotels.filter(hotel => hotel._id !== id));
            } catch (error) {
                console.error('Error deleting hotel:', error);
                setError('Failed to delete hotel. Please try again later.');
            }
        }
    };

    // Hotel Edit Handler
    const hotelEditHandler = async () => {
        try {
            await axios.put(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/hotels/update-hotel/${currentHotel.id}`, {
                name: currentHotel.name,
                stars: currentHotel.stars,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setShowModal(false);
            getAllHotels();
        } catch (error) {
            console.error('Error updating hotel:', error);
            setError('Failed to update hotel. Please try again later.');
        }
    };

    const handleEditClick = (hotel) => {
        setCurrentHotel({ id: hotel._id, name: hotel.name, stars: hotel.stars });
        setShowModal(true);
    };

    return (
        <Container>
            <h4 className='text-center mb-4'>Hotels Details</h4>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Hotel Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allHotels.length > 0 ? (
                        allHotels.map(hotel => (
                            <tr key={hotel._id}>
                                <td>{hotel.name}</td>
                                <td>{hotel.stars}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                        <FiEdit
                                            style={{ color: 'green', fontSize: '20px', cursor: 'pointer' }}
                                            onClick={() => handleEditClick(hotel)}
                                        />
                                        <MdDelete
                                            style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
                                            onClick={() => hotelDeleteHandler(hotel._id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No hotels found</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Edit Hotel Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Hotel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="hotelName">
                            <Form.Label>Hotel Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={currentHotel.name} 
                                onChange={(e) => setCurrentHotel({ ...currentHotel, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="hotelStars">
                            <Form.Label>Hotel Stars</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={currentHotel.stars} 
                                onChange={(e) => setCurrentHotel({ ...currentHotel, stars: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={hotelEditHandler}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default EditHotels;
