"use client"
import React, { useState, useEffect } from 'react';
import HomeNavbar from '../homeNavbar/HomeNavbar';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import FlightForm from './FlightForm';
import HotelsForm from './HotelsForm';
import VisaForm from './VisaForm';
import HotelPackage from './HotelPackage';
import './adminStyle.css';
import Footer from '../footer/Footer';
import Blogs from './Blogs';
import AdminBlogs from './AdminBlogs';
import AllPackages from './AllPackages';
import { useSelector } from 'react-redux';
import RegisterUser from './RegisterUser';

const Page = () => {
    const [activeForm, setActiveForm] = useState(null);
    const [totalPackages, setTotalPackages] = useState(0);
    const [totalFlights, setTotalFlights] = useState(0);
    const [totalHotels, setTotalHotels] = useState(0);
    const [totalVisas, setTotalVisas] = useState(0);
    const authToken = useSelector(state => state.userLogin.user.token);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                };

                // Fetch packages
                const packagesResponse = await fetch('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/package/get-all-packages', { headers });
                const packagesData = await packagesResponse.json();
                setTotalPackages(packagesData.length);

                // Fetch flights
                const flightsResponse = await fetch('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/flights/get-all-flights', { headers });
                const flightsData = await flightsResponse.json();
                setTotalFlights(flightsData.length);

                // Fetch hotels
                const hotelsResponse = await fetch('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/hotels/get-all-hotels', { headers });
                const hotelsData = await hotelsResponse.json();
                setTotalHotels(hotelsData.length);

                // Fetch visas
                const visasResponse = await fetch('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/visa/get-all-visa', { headers });
                const visasData = await visasResponse.json();
                setTotalVisas(visasData.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [authToken]); // Add authToken as a dependency

    const renderForm = () => {
        switch (activeForm) {
            case 'flights':
                return <FlightForm />;
            case 'visa':
                return <VisaForm />;
            case 'hotels':
                return <HotelsForm />;
            case 'package':
                return <HotelPackage />;
            case 'blogs':
                return <Blogs />;
            case 'adminBlogs':
                return <AdminBlogs />;
            case 'allpackages':
                return <AllPackages />;
            case 'registeruser':
                return <RegisterUser />;
            default:
                return null;
        }
    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={2} className="sidebar">
                        <div className="sidebar-buttons">
                            <Button
                                onClick={() => setActiveForm('package')}
                                className='All_btn_class'
                                active={activeForm === 'package'}
                            >
                                Package
                            </Button>
                            <Button
                                onClick={() => setActiveForm('flights')}
                                className='All_btn_class'
                                active={activeForm === 'flights'}
                            >
                                Flights
                            </Button>
                            <Button
                                onClick={() => setActiveForm('visa')}
                                className='All_btn_class'
                                active={activeForm === 'visa'}
                            >
                                Visa
                            </Button>
                            <Button
                                onClick={() => setActiveForm('hotels')}
                                className='All_btn_class'
                                active={activeForm === 'hotels'}
                            >
                                Hotels
                            </Button>
                            <Button
                                onClick={() => setActiveForm('blogs')}
                                className='All_btn_class'
                                active={activeForm === 'blogs'}
                            >
                                Blogs
                            </Button>
                            <Button
                                onClick={() => setActiveForm('adminBlogs')}
                                className='All_btn_class'
                                active={activeForm === 'adminBlogs'}
                            >
                                Edit Blogs
                            </Button>
                            <Button
                                onClick={() => setActiveForm('allpackages')}
                                className='All_btn_class'
                                active={activeForm === 'allpackages'}
                            >
                                All Packages
                            </Button>
                            <Button
                                onClick={() => setActiveForm('registeruser')}
                                className='All_btn_class'
                                active={activeForm === 'registeruser'}
                            >
                                Register User
                            </Button>
                        </div>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={10}>
                        <div className='admin_container'>
                            <HomeNavbar />
                        </div>
                        <Container>
                            <Row className="mt-4">
                                <Col md={6} lg={3}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Total Packages</Card.Title>
                                            <Card.Text>
                                                There are {totalPackages} packages available.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6} lg={3}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Total Flights</Card.Title>
                                            <Card.Text>
                                                There are {totalFlights} flights available.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6} lg={3}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Total Hotels</Card.Title>
                                            <Card.Text>
                                                There are {totalHotels} hotels available.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6} lg={3}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Total Visas</Card.Title>
                                            <Card.Text>
                                                There are {totalVisas} visas available.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <div className='form_container mt-4'>
                                {renderForm()}
                            </div>

                        </Container>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Page;
