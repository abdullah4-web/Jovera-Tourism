'use client';
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Spinner, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import './adminStyle.css';
import Image from 'next/image';
import { MdLockReset } from "react-icons/md";

const Allusers = () => {
    const token = useSelector((state) => state.userLogin.user?.token);
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]); // New state for filtered users
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false); // New state for reset password modal
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [editError, setEditError] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', email: '', role: '' });
    const [newPassword, setNewPassword] = useState(''); // New state for new password
    const [resetError, setResetError] = useState(null); // New state for reset password error
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const getAllUsers = async () => {
        try {
            const { data } = await axios.get(`http://192.168.2.137:4040/api/users/allusers`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAllUsers(data);
            setFilteredUsers(data); // Initialize filtered users with all users
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch users');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            getAllUsers();
        }
    }, [token]);

    useEffect(() => {
        // Filter users based on the search term
        const filtered = allUsers.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, allUsers]);

    // Confirm Delete Handler
    const confirmDelete = (userId) => {
        setSelectedUserId(userId);
        setShowDeleteModal(true);
    };

    // Delete API Handler
    const userDeleteHandler = async () => {
        setDeleteError(null);
        try {
            await axios.put(`http://192.168.2.137:4040/api/users/delete/${selectedUserId}`, { DelStatus: true }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Update the state after deletion
            setAllUsers(allUsers.filter(user => user._id !== selectedUserId));
            setFilteredUsers(filteredUsers.filter(user => user._id !== selectedUserId)); // Update filtered users too
            setShowDeleteModal(false);
            setShowSuccessModal(true);
            setTimeout(() => setShowSuccessModal(false), 3000);
        } catch (error) {
            setDeleteError('Failed to delete user');
        }
    };

    // Edit API Handler
    const userEditHandler = (user) => {
        setSelectedUserId(user._id);
        setEditForm({
            name: user.name,
            email: user.email,
            role: user.role
        });
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const saveEditHandler = async () => {
        setEditError(null);
        try {
            await axios.put(`http://192.168.2.137:4040/api/users/edit-user/${selectedUserId}`,
                {
                    name: editForm.name,
                    email: editForm.email,
                    role: editForm.role
                }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Update the state with the edited user
            setAllUsers(allUsers.map(user =>
                user._id === selectedUserId ? { ...user, ...editForm } : user
            ));
            setFilteredUsers(filteredUsers.map(user =>
                user._id === selectedUserId ? { ...user, ...editForm } : user
            ));
            setShowEditModal(false);
            setShowSuccessModal(true);
            setTimeout(() => setShowSuccessModal(false), 3000);
        } catch (error) {
            setEditError('Failed to edit user');
        }
    };

    // Open Reset Password Modal
    const openResetModal = (userId) => {
        setSelectedUserId(userId);
        setNewPassword(''); // Clear the password field
        setShowResetModal(true);
    };

    // Reset user Password Handler
    const userResetPassword = async () => {
        setResetError(null);
        try {
            await axios.put(`http://192.168.2.137:4040/api/users/edit-pass/${selectedUserId}`, {
                newPassword: newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowResetModal(false);
            setShowSuccessModal(true);
            setTimeout(() => setShowSuccessModal(false), 3000);
        } catch (error) {
            setResetError('Failed to reset password');
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">All Users</h2>

            {/* Search Bar */}
            <Form.Group className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Search User"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Form.Group>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : error ? (
                <div className="text-center text-danger">{error}</div>
            ) : (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <Col key={user._id}>
                                <Card className="h-100 admin_all_users">
                                    <Card.Body>
                                        <div className='all_user_container' >
                                            <Image src={user.picture} alt='userPicture' width={120} height={120} style={{ borderRadius: '50%' }} />
                                            <Card.Title className='mt-3'>{user.name}</Card.Title>
                                            <Card.Text className='mb-2'>{user.email}</Card.Text>
                                            <Card.Text>{user.role}</Card.Text>
                                        </div>
                                    </Card.Body>
                                    <Card.Footer className="d-flex justify-content-between">
                                        <CiEdit style={{ color: 'green', fontSize: '24px', cursor: 'pointer' }} onClick={() => userEditHandler(user)} />
                                        <RiDeleteBinLine
                                            style={{ color: 'red', fontSize: '24px', cursor: 'pointer' }}
                                            onClick={() => confirmDelete(user._id)}
                                        />
                                        <MdLockReset style={{ color: 'green', fontSize: '24px', cursor: 'pointer' }} onClick={() => openResetModal(user._id)} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <div className="text-center text-muted">No users found</div>
                    )}
                </Row>
            )}

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {deleteError && <div className="text-danger">{deleteError}</div>}
                    <p>Are you sure you want to delete this user?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={userDeleteHandler}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editError && <div className="text-danger">{editError}</div>}
                    <Form>
                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editForm.name}
                                onChange={handleEditChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={editForm.email}
                                onChange={handleEditChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole" className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                type="text"
                                name="role"
                                value={editForm.role}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={saveEditHandler}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Reset Password Modal */}
            <Modal show={showResetModal} onHide={() => setShowResetModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {resetError && <div className="text-danger">{resetError}</div>}
                    <Form.Group className="mb-3" controlId="formNewPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowResetModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={userResetPassword}>
                        Reset Password
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
                <Modal.Body className="text-center">
                    <p className="text-success">Operation successful!</p>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Allusers;
