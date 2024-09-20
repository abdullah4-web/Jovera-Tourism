'use client';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import './TopDestination.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import Link from 'next/link';

const TopDestination = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 2000 });

        const fetchPackages = async () => {
            try {
                const response = await fetch('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/package/get-all-packages');
                const data = await response.json();
                const uniquePackages = Array.from(new Set(data.map(item => item.country)))
                    .map(country => data.find(item => item.country === country));
                setPackages(uniquePackages.slice(0, 5)); // Limit to five unique packages
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };

        fetchPackages();
    }, []);

    return (
        <Container>
            <p className='chooseexperience' data-aos="fade-up">Choose your experience</p>
            <h5 className='topdestination' data-aos="fade-up">Top Attractions Destinations</h5>
            <Row className='topdestination_row mt-5'>
                {packages.map((pkg, index) => (
                    <Col xs={12} md={6} lg={6} xxl={2} key={index}>
                        <Link href={`/components/packageDetails/${pkg._id}`} style={{ textDecoration: 'none' }}>
                            <div className='images_destination' data-aos="fade-up">
                                <Image src={pkg.image} alt={pkg.country} className='destination_image' width={300} height={350} />
                                <div className='overlay'></div>
                                <h5 className='destination_text_tour'>{pkg.country}</h5>
                                <h5 className='destination_text'>{pkg.tours} Tours</h5>
                            </div>
                        </Link>
                    </Col>
                ))}
                <div data-aos="fade-up">
                    <h5 className='destintioncall'>
                        Speak to our Destination Experts at Call <span style={{ color: '#E4A70A' }}>800-664000</span>
                    </h5>
                </div>
            </Row>
        </Container>
    );
};

export default TopDestination;
