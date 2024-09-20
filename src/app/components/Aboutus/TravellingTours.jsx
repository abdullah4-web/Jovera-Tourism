'use client'
import React, { useEffect } from 'react';
import './aboutStyle.css';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import aboutusimage from '../../Assets/homepageassets/aboutusimage.png';
import exploreicon from '../../Assets/homepageassets/exploreicon.png';
import icon from '../../Assets/homepageassets/icon.png';
import iconone from '../../Assets/homepageassets/iconone.png';
import icontwo from '../../Assets/homepageassets/icontwo.png';
import iconthree from '../../Assets/homepageassets/iconthree.png';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import CountUp from 'react-countup';

const TravellingTours = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    const reviewsData = [
        {
            id: 0,
            icons: icon,
            numbercount: 16284,
            title: 'Tours and holidays',
        },
        {
            id: 1,
            icons: iconone,
            numbercount: 12456,
            title: 'Happy Customers',
        },
        {
            id: 2,
            icons: icontwo,
            numbercount: 7890,
            title: 'Destinations',
        },
        {
            id: 3,
            icons: iconthree,
            numbercount: 2567,
            title: 'Tour Packages',
        },
    ];

    return (
        <Container>
            <Row className='mt-4' >
                <Col xs={12} sm={12} md={6}>
                    <Image src={aboutusimage} alt='aboutusimage' className='aboutusimages' data-aos="fade-up" />
                </Col>
                <Col xs={12} sm={12} md={6}>
                    <div>
                        <h5 className='timetoexplore' data-aos="fade-up">Time to Explore</h5>
                        <h5 className='touring_world' data-aos="fade-up">
                            A Better Way of Traveling and Touring the World
                        </h5>

                        <div className='joveratourismtext'>
                            <p className='jovera_about_p_tag' data-aos="fade-up">
                                Jovera Tourism is a global travel booking portal where you can effortlessly book day tours, fixed group departures, holidays, and vacation packages in 130+ countries around the world.
                            </p>

                            <p className='jovera_about_p_tag' data-aos="fade-up">
                                Today, booking the right tour or holiday package has become a time-consuming and painful process. Which tour operator is qualified? What&apos;s the right tour price? When you pay an upfront deposit to an unknown tour operator, is your money safe? Are the reviews seen on a local operator&apos;s website genuine?
                            </p>
                        </div>

                        <div className='exploreNow_btn_container' data-aos="fade-up">
                            <Link href={'/components/contactUs'} className='exploreNow_btn' style={{ textDecoration: 'none', color: 'black' }}>Contact Us <Image src={exploreicon} alt='exploreicon' /></Link>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Trip Reviews */}
            <Row>
                {reviewsData.map((review) => (
                    <Col xs={12} sm={4} md={4} lg={3} key={review.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className='numbercount_title'>
                            <Image src={review.icons} alt='review' data-aos="fade-up" />
                            <div>
                                <CountUp className='mb-0 numbercount' start={0} end={review.numbercount} duration={3} separator="," />
                                <p className='mb-0 reviewtitle' data-aos="fade-up">{review.title}</p>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default TravellingTours;
