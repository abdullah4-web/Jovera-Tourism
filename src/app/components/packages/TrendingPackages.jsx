'use client';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Card, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import trendingicon from '../../Assets/homepageassets/trending.png';
import Image from 'next/image';
import './TrendingPackages.css';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const TrendingPackages = () => {
    const token = useSelector((state) => state.userLogin.user?.token);
    const [filteredPackages, setFilteredPackages] = useState([]);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/package/get-all-packages', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Filter packages with type "Hot Deals"
                const hotDeals = response.data.filter(pkg => pkg.type === "Hot Deals");
                setFilteredPackages(hotDeals);
            } catch (error) {
                console.log(error, 'err');
            }
        };

        fetchPackages();
    }, [token]);

    // Limit the number of displayed packages to 5
    const displayedPackages = filteredPackages.slice(0, 5);

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    return (
        <div>
            <div className='tranding_container mb-4 mt-5' data-aos="fade-up">
                <h5 className='trending_deals' data-aos="fade-up">Trending Hot Deals</h5>
                <Image src={trendingicon} alt='trendingicon' data-aos="fade-up" />
            </div>
            <Container>
                <Row>
                    {displayedPackages.length > 0 ? (
                        displayedPackages.map((pkg) => (
                            <Col key={pkg._id} xs={12} sm={12} md={6} lg={3} className='mt-3'>
                                <Link href={`/components/packageDetails/${pkg._id}`} style={{ textDecoration: 'none' }}>
                                    <Card className="card_class_travel_guide" data-aos="fade-up">
                                        <div className="image_container">
                                            <Image src={pkg.image} alt="image" className="card_image" width={480} height={307} />
                                        </div>
                                        <Card.Body>
                                            <Card.Title className='trending_title' data-aos="fade-up">{pkg.title}</Card.Title>
                                            <Card.Text>
                                                <div className='pkge_card_container'>
                                                    <h4 className='pkge_subtitle'>Duration</h4>
                                                    <h4 className='pkge_subtitle' data-aos="fade-up">{pkg.duration}</h4>
                                                </div>
                                                <hr style={{ marginTop: '-1px' }} />
                                                <div className='pkge_card_container'>
                                                    <h4 className='pkge_subtitle'>Amount</h4>
                                                    <h4 className='pkge_subtitle' data-aos="fade-up">{pkg.amount} AED</h4>
                                                </div>
                                                <hr style={{ marginTop: '-1px' }} />
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        ))
                    ) : (
                        <Col xs={12} className='text-center mt-3'>

                            <div className='hot_deals_container' >

                                <Alert variant="success">
                                    <h5>No Hot Deals Available</h5>
                                </Alert>
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default TrendingPackages;
