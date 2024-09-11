'use client'
import React from 'react';
import './TravelGuides.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Image from 'next/image';
import cardone from '../../Assets/homepageassets/cardone.png';
import cardtwo from '../../Assets/homepageassets/cardtwo.png';
import cardthree from '../../Assets/homepageassets/cardthree.png';

const TravelGuides = () => {
    const dataImage = [
        {
            id: 0,
            imageUrl: cardone,
            lifeStyle: 'Lifestyle',
            date: 'October 31, 2022',
            owner: 'Admin',
            title: '10 Best Places to Visit in Abu Dhabi, UAE',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna lirabe ites ipsum dolor sit amet...'
        },
        {
            id: 1,
            imageUrl: cardtwo,
            lifeStyle: 'Tips & Tricks',
            date: 'October 31, 2022',
            owner: 'Admin',
            title: 'The Impact of Covid-19 on Travel & Tourism Industry in Future',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna lirabe ites ipsum dolor sit amet...'
        },
        {
            id: 2,
            imageUrl: cardthree,
            lifeStyle: 'Lifestyle',
            date: 'October 31, 2022',
            owner: 'Admin',
            title: 'Top 15 Summer Holiday Destinations in UAE for 2024',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna lirabe ites ipsum dolor sit amet...'
        }
    ];

    return (
        <Container>
            <p className='chooseexperience'>Travel insights & ideas</p>
            <h5 className='topdestination'>Latest Travel Guides</h5>
            <Row className='mb-5' >
                {dataImage.map((item) => (
                    <Col key={item.id} xs={12} sm={12} md={6} lg={4} className='mt-4' >
                        <Card style={{ width: '100%', height: '100%' }} className='card_class_travel_guide' >
                            <Image src={item.imageUrl} alt={item.title} className='card_image' />
                            <Card.Body>
                                <Card.Subtitle className="mb-2" style={{ color: '#E4A70A' }}>{item.lifeStyle}</Card.Subtitle>
                                <Card.Title className='card_title' >{item.title}</Card.Title>
                                <Card.Text className='card_description' >
                                    {item.description}
                                </Card.Text>
                                <Card.Text className="text-muted">
                                    <small>{item.date} by {item.owner}</small>
                                </Card.Text>
                                <button className='read_more_btn' >
                                    <span class="transition"></span>
                                    <span class="gradient"></span>
                                    <span class="label">Read More</span>
                                </button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default TravelGuides;
