'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For Next.js 13 and above
import { useSelector } from 'react-redux';
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
import RegisterUser from './RegisterUser';
import Allusers from './Allusers';
import EditFlights from './EditFlights';
import EditVisa from './EditVisa';
import EditHotels from './EditHotels';
import ContactDetails from './ContactDetails';
import LeadData from './LeadData';

const Page = () => {
    const router = useRouter();
    const [activeForm, setActiveForm] = useState(null);
    const [totalPackages, setTotalPackages] = useState(0);
    const [totalFlights, setTotalFlights] = useState(0);
    const [totalHotels, setTotalHotels] = useState(0);
    const [totalVisas, setTotalVisas] = useState(0);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Safely accessing the token and role with fallbacks
    const authToken = useSelector(state => state.userLogin?.user?.token) || '';
    const userRole = useSelector(state => state.userLogin?.user?.role) || '';

    useEffect(() => {
        // Check user role for authorization
        if (!authToken) {
            console.error('Auth token is missing');
            router.push('/components/login');
            return;
        }

        if (userRole !== 'admin' && userRole !== 'superadmin') {
            console.error('User is not authorized');
            router.push('/components/login');
            return;
        }

        setIsAuthorized(true);
        setIsLoading(false);
    }, [authToken, userRole, router]);

    useEffect(() => {
        if (!isAuthorized) return;

        const fetchData = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                };

                // Fetch packages
                const packagesResponse = await fetch('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/package/get-all-packages', { headers });
                if (!packagesResponse.ok) throw new Error('Failed to fetch packages');
                const packagesData = await packagesResponse.json();
                setTotalPackages(packagesData.length);

                // Fetch flights
                const flightsResponse = await fetch('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/flights/get-all-flights', { headers });
                if (!flightsResponse.ok) throw new Error('Failed to fetch flights');
                const flightsData = await flightsResponse.json();
                setTotalFlights(flightsData.length);

                // Fetch hotels
                const hotelsResponse = await fetch('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/hotels/get-all-hotels', { headers });
                if (!hotelsResponse.ok) throw new Error('Failed to fetch hotels');
                const hotelsData = await hotelsResponse.json();
                setTotalHotels(hotelsData.length);

                // Fetch visas
                const visasResponse = await fetch('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/visa/get-all-visa', { headers });
                if (!visasResponse.ok) throw new Error('Failed to fetch visas');
                const visasData = await visasResponse.json();
                setTotalVisas(visasData.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [authToken, isAuthorized]);

    const renderForm = () => {
        switch (activeForm) {
            case 'allusers':
                return <Allusers />;
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
            case 'editflights':
                return <EditFlights />;
            case 'editvisa':
                return <EditVisa />;
            case 'edithotels':
                return <EditHotels />;
            case 'contactdetails':
                return <ContactDetails />;
            case 'leaddetails':
                return <LeadData />;
            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div>Loading...</div>
            </Container>
        );
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={2} className="sidebar">
                        <div className="sidebar-buttons">
                            <Button
                                onClick={() => setActiveForm('allusers')}
                                className='All_btn_class'
                                active={activeForm === 'allusers'}
                            >
                                All Users
                            </Button>
                            <Button
                                onClick={() => setActiveForm('package')}
                                className='All_btn_class'
                                active={activeForm === 'package'}
                            >
                                Create Package
                            </Button>
                            <Button
                                onClick={() => setActiveForm('flights')}
                                className='All_btn_class'
                                active={activeForm === 'flights'}
                            >
                                Create Flights
                            </Button>
                            <Button
                                onClick={() => setActiveForm('visa')}
                                className='All_btn_class'
                                active={activeForm === 'visa'}
                            >
                                Create Visa
                            </Button>
                            <Button
                                onClick={() => setActiveForm('hotels')}
                                className='All_btn_class'
                                active={activeForm === 'hotels'}
                            >
                                Create  Hotels
                            </Button>
                            <Button
                                onClick={() => setActiveForm('blogs')}
                                className='All_btn_class'
                                active={activeForm === 'blogs'}
                            >
                                Create Blogs
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
                                Edit Packages
                            </Button>


                            <Button
                                onClick={() => setActiveForm('editflights')}
                                className='All_btn_class'
                                active={activeForm === 'editflights'}
                            >
                                Edit Flights
                            </Button>

                            <Button
                                onClick={() => setActiveForm('editvisa')}
                                className='All_btn_class'
                                active={activeForm === 'editvisa'}
                            >
                                Edit Visa
                            </Button>

                            <Button
                                onClick={() => setActiveForm('edithotels')}
                                className='All_btn_class'
                                active={activeForm === 'edithotels'}
                            >
                                Edit Hotels
                            </Button>

                            <Button
                                onClick={() => setActiveForm('contactdetails')}
                                className='All_btn_class'
                                active={activeForm === 'contactdetails'}
                            >
                                Contact Details
                            </Button>

                            <Button
                                onClick={() => setActiveForm('leaddetails')}
                                className='All_btn_class'
                                active={activeForm === 'leaddetails'}
                            >
                                Lead Details
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
