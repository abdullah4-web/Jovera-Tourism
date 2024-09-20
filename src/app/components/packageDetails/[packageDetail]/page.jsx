'use client';
import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import HomeNavbar from '../../homeNavbar/HomeNavbar';
import '../../blogs/blogstyle.css';
import { useParams } from 'next/navigation';
import Footer from '../../footer/Footer';
import EnquiryForm from '../../EnquiryForm/EnquiryForm';
import './packagedetailstyle.css'
import { FaStar } from "react-icons/fa";
import TrendingPackages from '../../packages/TrendingPackages';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const PackageDetails = () => {
    const token = useSelector((state) => state.userLogin.user?.token);
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [packageData, setPackageData] = useState(null);

    const getSinglePackage = async () => {
        try {
            const singlePackageResponse = await axios.get(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/package/single-package/${params.packageDetail}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPackageData(singlePackageResponse.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch package details');
            setLoading(false);
        }
    };

    useEffect(() => {
        getSinglePackage();
    }, [token]);

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    return (
        <>
            <div
                style={{
                    backgroundImage: packageData ? `url(${packageData.foregroundimage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '50vh',
                }}
            >
                <HomeNavbar />
                <div className='content_container'>
                    <h1 className='about_text' data-aos="fade-up">{packageData?.title}</h1>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Link href='/' className='about_link' data-aos="fade-up">Home</Link>
                        <span className='about_link' data-aos="fade-up"> / Package Details</span>
                    </div>
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
                            <Card className='mb-4'>
                                <Card.Body>

                                    <div className='pkge_card_container'>
                                        <h4 className='pkge_subtitle' data-aos="fade-up">Category</h4>
                                        <h4 className='pkge_subtitle' data-aos="fade-up"> {packageData?.type}</h4>
                                    </div>
                                    <hr style={{ marginTop: '-1px' }} data-aos="fade-up" />

                                    <div className='pkge_card_container'>
                                        <h4 className='pkge_subtitle' data-aos="fade-up">Amount</h4>
                                        <h4 className='pkge_subtitle' data-aos="fade-up"> {packageData?.amount} AED</h4>
                                    </div>
                                    <hr style={{ marginTop: '-1px' }} data-aos="fade-up" />

                                    <div className='pkge_card_container'>
                                        <h4 className='pkge_subtitle' data-aos="fade-up">Duration</h4>
                                        <h4 className='pkge_subtitle' data-aos="fade-up"> {packageData?.duration}</h4>
                                    </div>
                                    <hr style={{ marginTop: '-1px' }} data-aos="fade-up" />

                                    <h4 className='flight_sub_heading text-center' data-aos="fade-up">Flight</h4>

                                    <div className='pkge_card_container'>
                                        <h4 className='pkge_subtitle' data-aos="fade-up">Flight From</h4>
                                        <h4 className='pkge_subtitle' data-aos="fade-up"> {packageData?.flight?.from}</h4>
                                    </div>
                                    <hr style={{ marginTop: '-1px' }} data-aos="fade-up" />

                                    <div className='pkge_card_container'>
                                        <h4 className='pkge_subtitle' data-aos="fade-up">Flight To</h4>
                                        <h4 className='pkge_subtitle' data-aos="fade-up"> {packageData?.flight?.to}</h4>
                                    </div>
                                    <hr style={{ marginTop: '-1px' }} data-aos="fade-up" />

                                    <h4 className='flight_sub_heading text-center' data-aos="fade-up">Visa</h4>

                                    <div className='pkge_card_container'>
                                        <h4 className='pkge_subtitle' data-aos="fade-up">Visa Type</h4>
                                        <h4 className='pkge_subtitle' data-aos="fade-up"> {packageData?.visa?.type}</h4>
                                    </div>
                                    <hr style={{ marginTop: '-1px' }} data-aos="fade-up" />

                                    <div className='pkge_card_container'>
                                        <h4 className='pkge_subtitle' data-aos="fade-up">Visa Country</h4>
                                        <h4 className='pkge_subtitle' data-aos="fade-up"> {packageData?.visa?.country}</h4>
                                    </div>
                                    <hr style={{ marginTop: '-1px' }} data-aos="fade-up" />

                                    <h4 className='flight_sub_heading text-center' data-aos="fade-up">Hotel</h4>

                                    <div className='pkge_card_container'>
                                        <h4 className='pkge_subtitle' data-aos="fade-up">Hotel Name</h4>
                                        <h4 className='pkge_subtitle' data-aos="fade-up">  {packageData?.hotel?.name}</h4>
                                    </div>
                                    <hr style={{ marginTop: '-1px' }} data-aos="fade-up" />

                                    <div className='pkge_card_container'>
                                        <h4 className='pkge_subtitle' data-aos="fade-up">Hotel Stars</h4>
                                        <div className='hotel_stars'>
                                            {[...Array(packageData?.hotel?.stars)].map((_, index) => (
                                                <FaStar key={index} color="#f7ce08" data-aos="fade-up" />
                                            ))}
                                        </div>
                                    </div>
                                    <hr style={{ marginTop: '-1px' }} data-aos="fade-up" />


                                    <h4 className='flight_sub_heading text-center' data-aos="fade-up">Details</h4>

                                    <h4 className='pkge_subtitle' data-aos="fade-up">  {packageData?.description}</h4>
                                </Card.Body>
                            </Card>

                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xxl={3} className='mt-4 mb-4'>
                            <EnquiryForm />
                        </Col>


                    </Row>
                )}

            </Container>
            <div className='mb-4' >

                <TrendingPackages />
            </div>
            <Footer />
        </>
    );
};

export default PackageDetails;
