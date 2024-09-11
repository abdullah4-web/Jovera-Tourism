import React from 'react'
import './aboutStyle.css'
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import aboutusimage from '../../Assets/homepageassets/aboutusimage.png'
import exploreicon from '../../Assets/homepageassets/exploreicon.png'
import icon from '../../Assets/homepageassets/icon.png'
import iconone from '../../Assets/homepageassets/iconone.png'
import icontwo from '../../Assets/homepageassets/icontwo.png'
import iconthree from '../../Assets/homepageassets/iconthree.png'
const TravellingTours = () => {
    const reviewsData = [
        {
            id: 0,
            icons: icon,
            numbercount: '16,284+',
            title: 'Tours and holidays'
        },
        {
            id: 0,
            icons: iconone,
            numbercount: '16,284+',
            title: 'Tours and holidays'
        },
        {
            id: 0,
            icons: icontwo,
            numbercount: '16,284+',
            title: 'Tours and holidays'
        },
        {
            id: 0,
            icons: iconthree,
            numbercount: '16,284+',
            title: 'Tours and holidays'
        },
    ]
    return (
        <Container>
            <Row>
                <Col xs={12} sm={12} md={6} >
                    <Image src={aboutusimage} alt='aboutusimage' className='aboutusimages' />
                </Col>
                <Col xs={12} sm={12} md={6} >
                    <div>
                        <h5 className='timetoexplore' >Time to Explore</h5>
                        <h5 className='touring_world' >
                            A Better Way of Traveling and Touring the World
                        </h5>

                        <div className='joveratourismtext' >
                            <p className='jovera_about_p_tag' >
                                Jovera Tourism is a global travel booking portal. where you effortlessly can book day tours, fixed group departures, holidays and vacation packages in 130+ countries around the world.
                            </p>

                            <p className='jovera_about_p_tag'>
                                Today, booking the right tour or holiday package has become a time consuming and painful process. Which tour operator is qualified? What’s the right tour price? When you pay an upfront deposit to an unknown tour operator, is your money safe? Are the reviews seen on a local operators website genuine?
                            </p>
                        </div>

                        <div className='exploreNow_btn_container' >
                            <Link href={'/components/contactUs'} className='exploreNow_btn' style={{ textDecoration:'none', color:'black' }} >Contact Us <Image src={exploreicon} alt='exploreicon' /></Link>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Trip Reviews */}
            <Row>
                {reviewsData.map((review, index) => (
                    <Col xs={12} sm={4} md={4} lg={3} key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className='numbercount_title'>
                            <Image src={review.icons} alt='review' />
                            <div  >
                                <p className='mb-0 numbercount'>{review.numbercount}</p>
                                <p className='mb-0 reviewtitle'>{review.title}</p>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default TravellingTours