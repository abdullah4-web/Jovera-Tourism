'use client';
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './adminStyle.css';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector to get token

const Blogs = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [titleError, setTitleError] = useState(null); // Error state for title
    const [contentError, setContentError] = useState(null); // Error state for content
    const [imageError, setImageError] = useState(null); // Error state for image
    const [error, setError] = useState(null); // General error state
    const [success, setSuccess] = useState(null); // Success state
    const token = useSelector(state => state.userLogin.user?.token); // Get token from Redux store

    // Utility function to count words
    const wordCount = (str) => str.trim().split(/\s+/).length;

    // Handle form submission
    const blogForm = async (e) => {
        e.preventDefault(); // Prevent default form submission

        let hasError = false;

        // Reset errors
        setTitleError(null);
        setContentError(null);
        setImageError(null);
        setError(null);
        setSuccess(null);

        // Validation for title
        if (!title) {
            setTitleError('Title is required');
            hasError = true;
        }

        // Validation for content (Description) - ensure 100 words minimum
        if (!content) {
            setContentError('Description is required');
            hasError = true;
        } else if (wordCount(content) < 100) {
            setContentError('Description must be at least 100 words');
            hasError = true;
        }

        // Validation for image
        if (!image) {
            setImageError('Image is required');
            hasError = true;
        }

        if (hasError) return; // Exit if there are validation errors

        // No validation errors, proceed with the API call
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);

        try {
            const blogResponse = await axios.post('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/blogs/post-blog', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setSuccess('Blog submitted successfully');
            setTitle('');
            setContent('');
            setImage(null);
        } catch (error) {
            setError('Error while submitting blog');
            console.log(error);
        }
    };

    // Handle image file change
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setImageError(null); // Clear error when a file is selected
    };

    return (
        <Container>
            <h3 className='create_package'>Blog Form</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <Form onSubmit={blogForm}>
                <Row>
                    <Col xs={12} sm={12} md={12}>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label className='label_class'>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Title"
                                className='input_field'
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    if (e.target.value) setTitleError(null); // Clear error if input has value
                                }}
                            />
                            {titleError && <small className="text-danger">{titleError}</small>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={12}>
                        <Form.Group className="mb-2" controlId="formContent">
                            <Form.Label className='label_class'>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter Description Here..."
                                className='input_field'
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value);
                                    if (e.target.value && wordCount(e.target.value) >= 100) {
                                        setContentError(null); // Clear error if content is valid
                                    }
                                }}
                            />
                            {contentError && <small className="text-danger">{contentError}</small>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={12}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label className='label_class'>Image</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} />
                            {imageError && <small className="text-danger">{imageError}</small>}
                        </Form.Group>
                    </Col>
                </Row>

                <Button type="submit" className='mb-3 mt-2 submit_btn'>
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default Blogs;
