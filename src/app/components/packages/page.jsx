'use client';
import React, { useState, useEffect } from 'react';
import HomeNavbar from '../homeNavbar/HomeNavbar';
import './packagesStyle.css';
import Link from 'next/link';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import '../admin/adminStyle.css';
import Footer from '../footer/Footer';
import { FaStar } from "react-icons/fa";
import TrendingPackages from './TrendingPackages';

const Page = () => {
    const token = useSelector(state => state.userLogin.user?.token);
    const [allPackages, setAllPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/package/get-all-packages', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAllPackages(response.data);
                setFilteredPackages(response.data);
            } catch (error) {
                console.log(error, 'err');
            }
        };

        fetchPackages();
    }, [token]);

    useEffect(() => {
        if (filter === 'all') {
            setFilteredPackages(allPackages);
        } else if (filter === 'flight') {
            setFilteredPackages(allPackages.filter(pkg => pkg.flight));
        } else if (filter === 'hotel') {
            setFilteredPackages(allPackages.filter(pkg => pkg.hotel));
        } else if (filter === 'visa') {
            setFilteredPackages(allPackages.filter(pkg => pkg.visa));
        }
    }, [filter, allPackages]);

    const truncateHotelName = (name) => {
        const words = name.split(' ');
        return words.length > 6 ? words.slice(0, 6).join(' ') + '...' : name;
    };

    return (
        <div className='flight_container'>
            <HomeNavbar />
            <div className='content_container'>
                <h1 className='about_text'>Packages</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link href={'/'} className='about_link'>Home</Link>
                    <Link href={''} className='about_link'> / Packages</Link>
                </div>
            </div>

            <div className='packages_container mb-5'>
                <Container>
                    <div className="slider_package_container mt-4">
                        <div>
                            <TrendingPackages />
                        </div>

                        <div className='slider_package_container'>
                            <h5 className='All_packages_text'>All Packages</h5>
                            <div className='button_group mt-4 mb-4'>
                                <Button className='packages_btn' onClick={() => setFilter('all')}>All</Button>
                                <Button className='packages_btn' onClick={() => setFilter('flight')}>Flights</Button>
                                <Button className='packages_btn' onClick={() => setFilter('hotel')}>Hotels</Button>
                                <Button className='packages_btn' onClick={() => setFilter('visa')}>Visas</Button>
                            </div>

                            {/* Package Cards or No Packages Message */}
                            {filteredPackages.length === 0 ? (
                                <div className="no-packages-message">
                                    <h4 className='mb-0 text-center' >No Packages Available.</h4>
                                </div>
                            ) : (
                                <Row className='g-4'>
                                    {filteredPackages.map((pkg, index) => (
                                        <Col key={index} sm={12} md={6} lg={6} xxl={4}>
                                            <Link href={`/components/packageDetails/${pkg._id}`} style={{ textDecoration: 'none' }}>
                                                <Card className="card_class_travel_guide">
                                                    <div className="image_container">
                                                        <Image src={pkg?.image} alt="image" className="card_image" width={480} height={307} />
                                                    </div>

                                                    {filter === 'hotel' && pkg.hotel && (
                                                        <div className="flight_details">
                                                            <div className='pkge_card_container'>
                                                                <h4 className='pkge_subtitle'>Hotel</h4>
                                                                <h4 className='pkge_subtitle'>{truncateHotelName(pkg.hotel.name)}</h4>
                                                            </div>
                                                            <hr style={{ marginTop: '-1px' }} />
                                                            <div className='pkge_card_container'>
                                                                <h4 className='pkge_subtitle'>Stars</h4>
                                                                <div className='hotel_stars'>
                                                                    {[...Array(pkg.hotel.stars)].map((_, index) => (
                                                                        <FaStar key={index} color="#f7ce08" />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <hr style={{ marginTop: '-1px' }} />
                                                        </div>
                                                    )}

                                                    {filter === 'flight' && pkg.flight && (
                                                        <div className="flight_details">
                                                            <div className='pkge_card_container'>
                                                                <h4 className='pkge_subtitle'>From</h4>
                                                                <h4 className='pkge_subtitle'>{pkg.flight.from}</h4>
                                                            </div>
                                                            <hr style={{ marginTop: '-1px' }} />
                                                            <div className='pkge_card_container'>
                                                                <h4 className='pkge_subtitle'>To</h4>
                                                                <h4 className='pkge_subtitle'>{pkg.flight.to}</h4>
                                                            </div>
                                                            <hr style={{ marginTop: '-1px' }} />
                                                            <div className='pkge_card_container'>
                                                                <h4 className='pkge_subtitle'>Trip</h4>
                                                                <h4 className='pkge_subtitle'>{pkg.flight.trip}</h4>
                                                            </div>
                                                            <hr style={{ marginTop: '-1px' }} />
                                                        </div>
                                                    )}

                                                    {filter === 'visa' && pkg.visa && (
                                                        <div className="flight_details">
                                                            <div className='pkge_card_container'>
                                                                <h4 className='pkge_subtitle'>Country</h4>
                                                                <h4 className='pkge_subtitle'>{pkg.visa.country}</h4>
                                                            </div>
                                                            <hr style={{ marginTop: '-1px' }} />
                                                            <div className='pkge_card_container'>
                                                                <h4 className='pkge_subtitle'>Type</h4>
                                                                <h4 className='pkge_subtitle'>{pkg.visa.type}</h4>
                                                            </div>
                                                            <hr style={{ marginTop: '-1px' }} />
                                                            <div className='pkge_card_container'>
                                                                <h4 className='pkge_subtitle'>Duration</h4>
                                                                <h4 className='pkge_subtitle'>{pkg.visa.duration}</h4>
                                                            </div>
                                                            <hr style={{ marginTop: '-1px' }} />
                                                        </div>
                                                    )}

                                                    {filter === 'all' && (
                                                        <div className="flight_details">
                                                            <div className='pkge_card_container'>
                                                                <h4 className='pkge_card_title mb-0'>{truncateHotelName(pkg.hotel.name)}</h4>
                                                                <div className='hotel_stars'>
                                                                    {[...Array(pkg.hotel.stars)].map((_, index) => (
                                                                        <FaStar key={index} color="#f7ce08" />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <h4 className='country_title'>{pkg.visa.country}</h4>
                                                            <div className='pkge_card_container'>
                                                                <h4 className='pkge_subtitle'>Trip</h4>
                                                                <h4 className='pkge_subtitle'>{pkg.flight.trip}</h4>
                                                            </div>
                                                            <hr style={{ marginTop: '-1px' }} />
                                                            <div className='pkge_card_container'>
                                                                <h4 className='pkge_subtitle'>Amount</h4>
                                                                <h4 className='pkge_subtitle'>{pkg.amount} AED</h4>
                                                            </div>
                                                            <hr style={{ marginTop: '-1px' }} />
                                                            <div className='pkge_card_container'>
                                                                <h4 className='pkge_subtitle'>Duration</h4>
                                                                <h4 className='pkge_subtitle'>{pkg.duration}</h4>
                                                            </div>
                                                            <hr style={{ marginTop: '-1px' }} />
                                                            <div className='pkge_card_container'>
                                                                <h4 className='pkge_subtitle'>Visa Type</h4>
                                                                <h4 className='pkge_subtitle'>{pkg.type}</h4>
                                                            </div>
                                                            <hr style={{ marginTop: '-1px' }} />
                                                        </div>
                                                    )}
                                                </Card>
                                            </Link>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
