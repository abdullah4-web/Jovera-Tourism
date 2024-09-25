'use client';
import React, { useState, useEffect } from 'react';
import './TravelGuides.css';
import { Container, Card, Row, Col } from 'react-bootstrap'; // Import Row, Col for responsiveness
import Image from 'next/image';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import Slider from "react-slick";
import Link from 'next/link'; // Import Link from next/link

const TravelGuides = () => {
    const token = useSelector(state => state.userLogin.user?.token);
    const [getBlog, setGetBlogs] = useState([]);
    const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted

    // Slider settings
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
                console.error(error, 'err');
            }
        };
        getAllBlogs();
    }, [token]);

    useEffect(() => {
        // This effect will run only once, after the component is mounted on the client side
        setIsMounted(true);
    }, []);

    // Function to truncate text to a specified number of characters
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    if (!isMounted) return null; // Avoid rendering on the server-side

    return (
        <Container>
            <p className='chooseexperience' data-aos="fade-up">Travel insights & ideas</p>
            <h5 className='topdestination' data-aos="fade-up">Latest Travel Guides</h5>

            <div className="mt-4 mb-5">
                {getBlog.length === 1 || getBlog.length === 2 ? (
                    // When there's 1 or 2 blogs, display them in a responsive grid without a slider
                    <Row>
                        {getBlog.map((item, index) => (
                            <Col key={index} md={getBlog.length === 1 ? 12 : 6} className="mb-4">
                                <Card className='card_class_travel_guide' data-aos="fade-up">
                                    <Image src={item?.image || '/navlogo'} alt={item.title} width={300} height={150} className='card_image' />
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2" style={{ color: '#E4A70A' }}>{truncateText(item.title, 50)}</Card.Subtitle>
                                        <Card.Text className='card_description' data-aos="fade-up">
                                            {truncateText(item.content, 100)}
                                        </Card.Text>
                                        <Card.Text className="text-muted" data-aos="fade-up">
                                            <small>{new Date(item.createdAt).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</small>
                                        </Card.Text>
                                        <Link href={`/components/blogs/${item._id}`} passHref>
                                            <button className='read_more_btn' data-aos="fade-up">
                                                <span className="transition"></span>
                                                <span className="gradient"></span>
                                                <span className="label">Read More</span>
                                            </button>
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
                                    <div key={item.id} className="slider_item">
                                        <Card className='card_class_travel_guide' data-aos="fade-up">
                                            <Image src={item?.image || '/navlogo'} alt={item.title} width={300} height={150} className='card_image' />
                                            <Card.Body>
                                                <Card.Subtitle className="mb-2" style={{ color: '#E4A70A' }}>{truncateText(item.title, 50)}</Card.Subtitle>
                                                <Card.Text className='card_description' data-aos="fade-up">
                                                    {truncateText(item.content, 100)}
                                                </Card.Text>
                                                <Card.Text className="text-muted" data-aos="fade-up">
                                                    <small>{new Date(item.createdAt).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</small>
                                                </Card.Text>
                                                <Link href={`/components/blogs/${item._id}`} passHref>
                                                    <button className='read_more_btn' data-aos="fade-up">
                                                        <span className="transition"></span>
                                                        <span className="gradient"></span>
                                                        <span className="label">Read More</span>
                                                    </button>
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
        </Container>
    );
};

export default TravelGuides; // Disable SSR
