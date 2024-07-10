import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import Slider from "react-slick";
import Image from 'next/image';
import './homePageStyle.css';
import storyone from '../Assets/homePageAssets/storyone.png'
import storytwo from '../Assets/homePageAssets/storytwo.png'
import storythree from '../Assets/homePageAssets/storythree.png'
import storyfour from '../Assets/homePageAssets/storyfour.png'
import travellogo from '../Assets/homePageAssets/travellogo.png'
import getspecialoffer from '../Assets/homePageAssets/getspecialoffer.png'
import Link from 'next/link';
const TipsGuuides = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const stories = [
        {
            id: 1,
            title: "TRAVEL",
            travelLogo: travellogo,
            image: storyone,
            text: "Meet the Steve Jobs of the Travel Industry",
            des: 'Vulputate amet magna bibendum et nibh at. Pretium tincidunt non…'
        },

        {
            id: 2,
            title: "BOOKING",
            text: "The Ultimate Cheat Sheet on Travel",
            image: storytwo,
            des: 'relocated by your company, it can seem daunting to visit…',
            travelLogo: travellogo,
        },

        {
            id: 3,
            title: "HOTEL",
            text: "The Best Kept Secrets About Travel",
            image: storythree,
            des: 'PENNSYLVANIA, USA — The difference between a tourist and a…',
            travelLogo: travellogo,
        },

        {
            id: 4,
            title: "STAYS",
            text: "How to Explain Travel to a Five-Year-Old",
            image: storyfour,
            des: 'I’ve been a traveler my whole life — and was…',
            travelLogo: travellogo,
        },

    ]

    return (
        <div>
            <Container>
                <h1 className='storiesandtips'>Stories, tips, and guides</h1>
                <div className="carousalImage">
                    <Slider {...settings}>
                        {stories.map((story) => (
                            <div key={story.id} className="card-container">
                                <Card>
                                    <Image src={story.image} alt={story.title} style={{ width: '100%' }} />
                                    <Card.Body>
                                        <div className='travellogo' >
                                            <Image src={story.travelLogo} alt={story.title} />
                                            {story.title}
                                        </div>
                                        <Card.Text className='storytext' >
                                            {story.text}
                                        </Card.Text>
                                        <h1 className='storydes' > {story.des} </h1>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Slider>
                </div>

                <Row className='mt-5'>
                    <Col xs={12} md={6}>
                        <div>
                            <Image src={getspecialoffer} alt='getspecialoffer' className='getspecialofferImage' fluid />
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className='TravelerContainer'>
                            <h1 className='specialoffer'>Get special offers, and more from Traveler</h1>
                            <p className='subscribetext'>Subscribe to see secret deals prices drop the moment you sign up!</p>
                            <div className='subscribecontainer'>
                                <input type="text" placeholder='Email Address' className='inputField' />
                                <Link href={'/'} className='subscribebtn'>Subscribe</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default TipsGuuides;
