'use client'
import React, { useState, useEffect } from 'react'
import HomeNavbar from "../homeNavbar/HomeNavbar";
import './aboutStyle.css'
import Link from 'next/link';
import TravellingTours from './TravellingTours';
import AboutCompany from './AboutCompany';
import BookingProcess from './BookingProcess';
import TravelReviews from '../travelReview/TravelReviews';
import Footer from '../footer/Footer';
import CustomSupport from '../customSupport/CustomSupport';
import Excitingworld from './Excitingworld';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
const Page = () => {

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <>
      <div className='about_us_main_container' >
        <HomeNavbar />
        <div className='content_container' >
          <h1 className='about_text' data-aos="fade-up">About</h1>

          <div style={{ display: 'flex', gap: '10px' }} >
            <Link href={'/'} className='about_link' data-aos="fade-up">Home</Link>
            <Link href={''} className='about_link' data-aos="fade-up">/ About</Link>
          </div>
        </div>
      </div>
        <TravellingTours />
        <AboutCompany />
        <BookingProcess />
        <TravelReviews />
        <Excitingworld />
        <CustomSupport />
        <Footer />
    </>
  )
}

export default Page