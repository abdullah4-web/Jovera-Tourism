'use client';
import React from 'react';
import './InspirationTrip.css';
import Image from 'next/image';
import newimage from '../../Assets/homepageassets/new.jpeg';
import { Container, Row, Col, Card } from 'react-bootstrap';
import beach from '../../Assets/homepageassets/beach.png'
import boat from '../../Assets/homepageassets/boat.png'
import hiking from '../../Assets/homepageassets/hiking.png'
import food from '../../Assets/homepageassets/food.png'
import mountain from '../../Assets/homepageassets/mountain.png'
const InspirationTrip = () => {
    const imageData = [
        {
            id: 0,
            title: 'Adventure',
            subtitle: '10 Tours+',
            bgImage: mountain,
        },
        {
            id: 1,
            title: 'Beaches',
            subtitle: '10 Tours+',
            bgImage: beach,
        },
        {
            id: 2,
            title: 'Boat Tours',
            subtitle: '10 Tours+',
            bgImage: boat,
        },
        {
            id: 3,
            title: 'City Tours',
            subtitle: '10 Tours+',
            bgImage: newimage,
        },
        {
            id: 4,
            title: 'Food',
            subtitle: '10 Tours+',
            bgImage: food,
        },
        {
            id: 5,
            title: 'Hiking',
            subtitle: '10 Tours+',
            bgImage: hiking,
        },
    ];

    return (
        <div style={{ backgroundColor: 'black', padding: '40px 20px' }} className='mt-3'>
            <Container>
                <div className='booking_process_text'>
                    <p className='chooseexperience' style={{ color: 'white' }}>Browse by Category</p>
                    <h5 className='topdestination' style={{ color: 'white' }}>Find Inspiration For Your Next Trip</h5>
                </div>

                <Row>
                    {imageData.map((item) => (
                        <Col xs={12} sm={6} lg={4} xxl={2} key={item.id} className='mb-4 mt-4'>
                            <Card className='inspiration_card'>
                                <div className='image-container'>
                                    <Image
                                        src={item.bgImage}
                                        alt={item.title}
                                        className='card_images'
                                    />
                                    <div className='overlay'>
                                        <h5 className='title'>{item.title}</h5>
                                        <p className='subtitle'>{item.subtitle}</p>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default InspirationTrip;
