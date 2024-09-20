'use client';
import React, { useState, useEffect } from 'react';
import { Container, Card, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import Link from 'next/link';
import HomeNavbar from '../../homeNavbar/HomeNavbar'
import '../../blogs/blogstyle.css'
import { useParams } from 'next/navigation';
import Footer from '../../footer/Footer';
import EnquiryForm from '../../EnquiryForm/EnquiryForm';

const Page = () => {
    const token = useSelector((state) => state.userLogin.user?.token);
    const params = useParams();
    const [singleBlog, setSingleBlog] = useState(null); // Updated state to hold the blog object
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const getSingleBlogDetails = async () => {
        try {
            const response = await axios.get(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/blogs/single-blog/${params.blogdetails}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSingleBlog(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError('Failed to load blog details');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            getSingleBlogDetails();
        }
    }, [token]);

    return (
        <div className='blog_container'>
            <HomeNavbar />
            <div className='content_container'>
                <h1 className='about_text'>Blog</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link href='/' className='about_link'>Home</Link>
                    <span className='about_link'> / Blog</span>
                </div>
            </div>

            <Container>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <Row>
                        <Col xs={12} sm={12} md={6} lg={6} xxl={9} className='mt-4'>
                            {singleBlog && (
                                <Card className='card_blog_details' >
                                    <Card.Body>
                                        <Card.Title className='blog_title_details' >{singleBlog.title}</Card.Title>
                                        <div className='blog_details_container' >
                                            <p className='mb-0 author_name'>{singleBlog.author.name}</p>
                                            <p className='author_name'>{new Date(singleBlog.createdAt).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                        <Card.Text>
                                            <p className='blog_details_content' >{singleBlog.content}</p>
                                        </Card.Text>
                                        {/* <p>
                                            <strong>Email:</strong> {singleBlog.author.email}<br />
                                        </p> */}
                                    </Card.Body>
                                </Card>
                            )}
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xxl={3} className='mt-4 mb-4'>
                            <EnquiryForm />
                        </Col>
                    </Row>
                )}
            </Container>
            <Footer />
        </div>
    );
};

export default Page;