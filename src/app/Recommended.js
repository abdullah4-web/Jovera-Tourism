import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import desone from '../Assets/homePageAssets/desone.png';
import destwo from '../Assets/homePageAssets/destwo.png';
import desthree from '../Assets/homePageAssets/desthree.png';
import desfour from '../Assets/homePageAssets/desfour.png';
import reclogo from '../Assets/homePageAssets/reclogo.png'
import Image from 'next/image';
import Pagination from 'react-bootstrap/Pagination';
import Link from 'next/link';
import './homePageStyle.css';

const cardData = [
    {
        imageUrl: desone,
        title: 'Card Title 1',
        placeName: 'Grande Caffe',
        cityName: 'Dubai',
        rating: [
            {
                rateNum: 5,
                reviews: 'Excellent',
                reviewsNum: '(3 Reviews)'
            }
        ],
        logoImage: [reclogo, reclogo, reclogo, reclogo, reclogo],
        Rate: 'AED 150.00'
    },
    {
        imageUrl: desone,
        title: 'Card Title 1',
        placeName: 'Grande Caffe',
        cityName: 'Dubai',
        rating: [
            {
                rateNum: 5,
                reviews: 'Excellent',
                reviewsNum: '(3 Reviews)'
            }
        ],
        logoImage: [reclogo, reclogo, reclogo, reclogo, reclogo],
        Rate: 'AED 150.00'
    },
    {
        imageUrl: desone,
        title: 'Card Title 1',
        placeName: 'Grande Caffe',
        cityName: 'Dubai',
        rating: [
            {
                rateNum: 5,
                reviews: 'Excellent',
                reviewsNum: '(3 Reviews)'
            }
        ],
        logoImage: [reclogo, reclogo, reclogo, reclogo, reclogo],
        Rate: 'AED 150.00'
    },
    {
        imageUrl: desone,
        title: 'Card Title 1',
        placeName: 'Grande Caffe',
        cityName: 'Dubai',
        rating: [
            {
                rateNum: 5,
                reviews: 'Excellent',
                reviewsNum: '(3 Reviews)'
            }
        ],
        logoImage: [reclogo, reclogo, reclogo, reclogo, reclogo],
        Rate: 'AED 150.00'
    },
    {
        imageUrl: desone,
        title: 'Card Title 1',
        placeName: 'Grande Caffe',
        cityName: 'Dubai',
        rating: [
            {
                rateNum: 5,
                reviews: 'Excellent',
                reviewsNum: '(3 Reviews)'
            }
        ],
        logoImage: [reclogo, reclogo, reclogo, reclogo, reclogo],
        Rate: 'AED 150.00'
    },
    {
        imageUrl: desone,
        title: 'Card Title 1',
        placeName: 'Grande Caffe',
        cityName: 'Dubai',
        rating: [
            {
                rateNum: 5,
                reviews: 'Excellent',
                reviewsNum: '(3 Reviews)'
            }
        ],
        logoImage: [reclogo, reclogo, reclogo, reclogo, reclogo],
        Rate: 'AED 150.00'
    }, {
        imageUrl: desone,
        title: 'Card Title 1',
        placeName: 'Grande Caffe',
        cityName: 'Dubai',
        rating: [
            {
                rateNum: 5,
                reviews: 'Excellent',
                reviewsNum: '(3 Reviews)'
            }
        ],
        logoImage: [reclogo, reclogo, reclogo, reclogo, reclogo],
        Rate: 'AED 150.00'
    },
    {
        imageUrl: desone,
        title: 'Card Title 1',
        placeName: 'Grande Caffe',
        cityName: 'Dubai',
        rating: [
            {
                rateNum: 5,
                reviews: 'Excellent',
                reviewsNum: '(3 Reviews)'
            }
        ],
        logoImage: [reclogo, reclogo, reclogo, reclogo, reclogo],
        Rate: 'AED 150.00'
    },

    {
        imageUrl: desone,
        title: 'Card Title 1',
        placeName: 'Grande Caffe',
        cityName: 'Dubai',
        rating: [
            {
                rateNum: 5,
                reviews: 'Excellent',
                reviewsNum: '(3 Reviews)'
            }
        ],
        logoImage: [reclogo, reclogo, reclogo, reclogo, reclogo],
        Rate: 'AED 150.00'
    },
    {
        imageUrl: desone,
        title: 'Card Title 1',
        placeName: 'Grande Caffe',
        cityName: 'Dubai',
        rating: [
            {
                rateNum: 5,
                reviews: 'Excellent',
                reviewsNum: '(3 Reviews)'
            }
        ],
        logoImage: [reclogo, reclogo, reclogo, reclogo, reclogo],
        Rate: 'AED 150.00'
    },
];

const itemsPerPage = 6;

const Recommended = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handleClick = (number) => {
        setCurrentPage(number);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cardData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(cardData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='Recommended_bg'>
            <h1 className='recommndedtxt'>Recommended for you</h1>
            <Container>
                <Row>
                    {currentItems.map((card, index) => (
                        <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                            <Link href={'/'} style={{ textDecoration: 'none' }} >
                                <Card className='mt-4' >
                                    <Image className='card_image' src={card.imageUrl} alt='imageUrl' style={{ width: '100%' }} />
                                    <Card.Body>
                                        {card.logoImage.map((logo, idx) => (
                                            <Image key={idx} src={logo} alt='logoImage' />
                                        ))}
                                        <h1 className='caseloHotel' > {card.placeName}</h1>
                                        <h1 className='caseloCity' > {card.cityName} </h1>
                                        <hr />
                                        <div className='RatingMain'>
                                            {card?.rating?.map((rate, index) => (
                                                <>
                                                    <div key={index} className='ratingContainer'>
                                                        <h1 className='ratingTEXT' > {rate.rateNum}/5 </h1>
                                                    </div>
                                                    <h1 className='review' > {rate.reviews} </h1>
                                                    <h1 className='reviewNum'> {rate.reviewsNum} </h1>
                                                </>
                                            ))}
                                        </div>
                                        <h1 className='rateofhotel' > {`From :  ${card.Rate} /night`} </h1>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
                <Pagination className="justify-content-center">
                    {pageNumbers.map(number => (
                        <Pagination.Item key={number} active={number === currentPage} onClick={() => handleClick(number)}>
                            {number}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Container>
        </div>
    )
}

export default Recommended;
