'use client';
import React, { useState, useEffect } from 'react';
import '../travelguides/TravelGuides.css';
import { Container, Card, Modal, Button, Form, Row, Col } from 'react-bootstrap'; // Import Row and Col
import Image from 'next/image';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import Slider from "react-slick";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Link from 'next/link';

const AdminBlogs = () => {
    const token = useSelector(state => state.userLogin.user?.token);
    const [getBlog, setGetBlogs] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedContent, setUpdatedContent] = useState('');
    const [updatedImage, setUpdatedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // State for image preview
    const [contentError, setContentError] = useState(''); // State for content validation error

    const handleClose = () => {
        setShow(false);
        setContentError(''); // Reset the error on close
    };

    const handleShow = (blog) => {
        setSelectedBlog(blog);
        setUpdatedTitle(blog.title);
        setUpdatedContent(blog.content);
        setUpdatedImage(null);
        setImagePreview(blog.image); // Set preview to current image
        setShow(true);
    };

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024, // screens smaller than 1024px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768, // screens smaller than 768px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            },
            {
                breakpoint: 480, // screens smaller than 480px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    useEffect(() => {
        const getAllBlogs = async () => {
            try {
                const response = await axios.get(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/blogs/get-all-blogs`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setGetBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        getAllBlogs();
    }, [token]);

    // Function to truncate text to a specified number of characters
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const handleBlogDelete = async (id) => {
        try {
            await axios.put(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/blogs/delete-blog/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGetBlogs(getBlog.filter(blog => blog._id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handleEditBlog = async () => {
        if (!selectedBlog) return;

        // Validate if the content contains at least 100 words
        const wordCount = updatedContent.trim().split(/\s+/).length;
        if (wordCount < 100) {
            setContentError('Description must be at least 100 words.');
            return;
        }

        const formData = new FormData();
        formData.append('title', updatedTitle);
        formData.append('content', updatedContent);
        if (updatedImage) {
            formData.append('image', updatedImage);
        }

        try {
            await axios.put(`/api/blogs/edit-blog/${selectedBlog._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            // Update the blog in the state
            setGetBlogs(getBlog.map(blog =>
                blog._id === selectedBlog._id
                    ? { ...blog, title: updatedTitle, content: updatedContent, image: updatedImage ? URL.createObjectURL(updatedImage) : blog.image }
                    : blog
            ));
            handleClose(); // Close the modal
        } catch (error) {
            console.error('Error editing blog:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUpdatedImage(file);
        setImagePreview(URL.createObjectURL(file)); // Create preview URL
    };

    return (
        <Container>
            <p className='chooseexperience' data-aos="fade-up">Travel insights & ideas</p>
            <h5 className='topdestination' data-aos="fade-up">Latest Travel Guides</h5>
            <div className="mt-4 mb-5">
                {getBlog.length === 1 || getBlog.length === 2 ? (
                    <Row>
                        {getBlog.map((item) => (
                            <Col key={item._id} md={getBlog.length === 1 ? 12 : 6} className="mb-4">
                                <Card className='card_class_travel_guide' data-aos="fade-up">
                                    <Image src={item?.image || '/navlogo'} alt={item.title} width={300} height={150} className='card_image' />
                                    <Card.Body>
                                        <div className='subtitle_deleteicon d-flex justify-content-between align-items-center'>
                                            <Card.Subtitle className="mb-2" style={{ color: '#E4A70A' }}>{truncateText(item.title, 50)}</Card.Subtitle>
                                            <div style={{ display: 'flex', gap: '10px' }} >
                                                <RiDeleteBinLine
                                                    style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }}
                                                    onClick={() => handleBlogDelete(item._id)}
                                                />
                                                <CiEdit
                                                    style={{ fontSize: '20px', color: 'green', cursor: 'pointer' }}
                                                    onClick={() => handleShow(item)}
                                                />
                                            </div>
                                        </div>
                                        <Card.Text className='card_description mt-3' data-aos="fade-up">
                                            {truncateText(item.content, 100)}
                                        </Card.Text>
                                        <Card.Text className="text-muted" data-aos="fade-up">
                                            <small>{new Date(item.createdAt).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</small>
                                        </Card.Text>
                                        <Link href={`/components/blogs/${item._id}`} passHref>
                                            <Button variant="primary" className='read_more_btn' data-aos="fade-up">
                                                Read More
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    // When there are 3 or more blogs, show them in the slider
                    getBlog.length >= 3 && (
                        <div className="slider_package_container">
                            <Slider {...settings}>
                                {getBlog.map((item) => (
                                    <div key={item._id} className="slider_item">
                                        <Card className='card_class_travel_guide' data-aos="fade-up">
                                            <Image src={item?.image || '/navlogo'} alt={item.title} width={300} height={150} className='card_image' />
                                            <Card.Body>
                                                <div className='subtitle_deleteicon d-flex justify-content-between align-items-center'>
                                                    <Card.Subtitle className="mb-2" style={{ color: '#E4A70A' }}>{item.title}</Card.Subtitle>
                                                    <div style={{ display: 'flex', gap: '10px' }} >
                                                        <RiDeleteBinLine
                                                            style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }}
                                                            onClick={() => handleBlogDelete(item._id)}
                                                        />
                                                        <CiEdit
                                                            style={{ fontSize: '20px', color: 'green', cursor: 'pointer' }}
                                                            onClick={() => handleShow(item)}
                                                        />
                                                    </div>
                                                </div>
                                                <Card.Text className='card_description mt-3' data-aos="fade-up">
                                                    {truncateText(item.content, 100)}
                                                </Card.Text>
                                                <Card.Text className="text-muted" data-aos="fade-up">
                                                    <small>{new Date(item.createdAt).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</small>
                                                </Card.Text>
                                                <Link href={`/components/blogs/${item._id}`} passHref>
                                                    <Button variant="primary" className='read_more_btn' data-aos="fade-up">
                                                        Read More
                                                    </Button>
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )
                )}
            </div>

            {/* Edit Blog Modal */}
            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {selectedBlog ? selectedBlog.title : 'Loading...'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBlog ? (
                        <>
                            <Form>
                                <Form.Group className="mb-3" controlId="formTitle">
                                    <Form.Label className='label_class'>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter title"
                                        value={updatedTitle}
                                        onChange={(e) => setUpdatedTitle(e.target.value)}
                                        className='input_field'
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="formContent">
                                    <Form.Label className='label_class'>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="Enter Description Here..."
                                        className='input_field'
                                        value={updatedContent}
                                        onChange={(e) => setUpdatedContent(e.target.value)}
                                        isInvalid={!!contentError} // Set error state
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {contentError}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formFile">
                                    <Form.Label className='label_class'>Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        className='input_field'
                                        onChange={handleImageChange}
                                    />
                                </Form.Group>
                                {imagePreview && (
                                    <div className="mb-3">
                                        <Image src={imagePreview} alt="Preview" width={150} height={150} />
                                    </div>
                                )}
                            </Form>
                        </>
                    ) : 'Loading...'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleEditBlog}>Save Changes</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AdminBlogs;
