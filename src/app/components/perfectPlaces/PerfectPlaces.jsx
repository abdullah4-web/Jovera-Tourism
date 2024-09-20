'use client'
import React, { useState, useEffect, useRef } from 'react'
import './PerfectPlaces.css'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import one from '../../Assets/homepageassets/one.jpg'
import two from '../../Assets/homepageassets/two.jpg'
import three from '../../Assets/homepageassets/three.jpg'
import four from '../../Assets/homepageassets/four.jpg'
import five from '../../Assets/homepageassets/five.jpg'
import map from '../../Assets/homepageassets/map.png'
import exploreicon from '../../Assets/homepageassets/exploreicon.png'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import CountUp from 'react-countup';  // Import CountUp
import Link from 'next/link'

const PerfectPlaces = () => {
    const [startCount, setStartCount] = useState(false);
    const numberRef = useRef(null);

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });

        // Create an intersection observer to trigger the counter when the numbers are in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setStartCount(true);  // Start counting when in view
            }
        });

        if (numberRef.current) {
            observer.observe(numberRef.current);
        }

        return () => {
            if (numberRef.current) {
                observer.unobserve(numberRef.current);
            }
        };
    }, []);

    const imageArray = [
        { id: 0, imageUrl: one },
        { id: 1, imageUrl: two },
        { id: 2, imageUrl: three },
        { id: 3, imageUrl: four },
        { id: 4, imageUrl: five },
    ];

    return (
        <div>
            <Container className='perfectplace_container'>
                <Row>
                    <Col xs={12} md={12} lg={6} xxl={4} className='travel_places_col_one'>
                        <div className='first_col_container'>
                            <p className='extreme_tours_text' data-aos="fade-up">EXTREME TOURS</p>
                            <div>
                                <h1 className='PerfectTravel' data-aos="fade-up">
                                    The Perfect Travel Place For You & Your Family
                                </h1>
                                <div className='travel_image_container mt-5'>
                                    {imageArray.map((img, index) => (
                                        <div key={index}>
                                            <Image src={img.imageUrl} alt='image_url' className='travel_image' data-aos="fade-up" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div data-aos="fade-up">
                                <h5 className='happy_customers mt-4'>
                                    <span style={{ color: '#E4A70A', textDecorationLine: 'underline' }}>500k+</span> Happy Customer
                                </h5>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={12} lg={6} xxl={4} className='travel_places_col_two'>
                        <div data-aos="fade-up">
                            <Image src={map} alt='map' className='map_image' />
                        </div>
                    </Col>
                    <Col xs={12} md={12} lg={6} xxl={4} className='travel_places_col_three'>
                        <div ref={numberRef}>
                            <h5 className='travel_text' data-aos="fade-up">
                                We believe that a vacation should be more than a hotel room, a flight, and a rental car. It should be more than the sum of its parts.
                            </h5>

                            <div className='travel_container_text_number mt-4'>
                                <div>
                                    <h1 className='number_text' data-aos="fade-up">
                                        {startCount && <CountUp start={0} end={20} duration={3} />}
                                    </h1>
                                    <h5 className='years_text' data-aos="fade-up">Years Experience</h5>
                                </div>

                                <div>
                                    <h1 className='number_text' data-aos="fade-up">
                                        {startCount && <CountUp start={0} end={400} duration={3} />}
                                    </h1>
                                    <h5 className='years_text' data-aos="fade-up">Destination Travel</h5>
                                </div>

                                <div>
                                    <h1 className='number_text' data-aos="fade-up">
                                        {startCount && <CountUp start={0} end={50000} duration={3} separator="," />}
                                    </h1>
                                    <h5 className='years_text' data-aos="fade-up">Trusted by Customer</h5>
                                </div>
                            </div>

                            <div className='exploreNow_btn_container' data-aos="fade-up">
                                <Link href={'/components/packages'} className='exploreNow_btn mt-4' style={{textDecoration:'none', color:'black' }} >
                                    Explore Now <Image src={exploreicon} alt='exploreicon' />
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PerfectPlaces;
