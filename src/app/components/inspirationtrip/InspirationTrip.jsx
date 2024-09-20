'use client'
import React, { useState, useEffect } from 'react'
import './InspirationTrip.css';
import Image from 'next/image';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import Link from 'next/link';

const InspirationTrip = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });

        const fetchPackages = async () => {
            try {
                const response = await axios.get('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/package/get-all-packages');
                setPackages(response.data);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };

        fetchPackages();
    }, []);

    return (
        <div style={{ backgroundColor: 'black', padding: '40px 20px' }} className='mt-3'>
            <Container>
                <div className='booking_process_text'>
                    <p className='chooseexperience' style={{ color: 'white' }} data-aos="fade-up">Browse by Category</p>
                    <h5 className='topdestination' style={{ color: 'white' }} data-aos="fade-up">Find Inspiration For Your Next Trip</h5>
                </div>

                <Row className='insportion_trip_col' >
                    {packages.slice(0, 5).map((item) => (
                        <Col xs={12} sm={6} lg={4} xxl={2} key={item._id} className='mb-4 mt-4 '>
                            <Link href={`/components/packageDetails/${item._id}`} style={{ textDecoration: 'none' }}>
                                <Card className='inspiration_card' data-aos="fade-up">
                                    <div className='image-container'>
                                        <Image
                                            src={item.image}
                                            alt={item.hotel?.name || 'Package Image'}
                                            className='card_images'
                                            width={300}
                                            height={600}
                                        />
                                        <div className='overlay'>
                                            <h5 className='title'>{item.visa?.country || 'Unknown Country'}</h5>
                                            <p className='subtitle'>{item.visa?.type || 'No Visa Info'}</p>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default InspirationTrip;
