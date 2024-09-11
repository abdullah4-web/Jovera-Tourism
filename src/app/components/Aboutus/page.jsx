import React from 'react'
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
const Page = () => {
  return (
    <>
      <div className='about_us_main_container' >
        <HomeNavbar />
        <div className='content_container' >
          <h1 className='about_text' >About</h1>

          <div style={{ display: 'flex', gap: '10px' }} >
            <Link href={'/'} className='about_link' >Home</Link>
            <Link href={''} className='about_link' >About</Link>
          </div>
        </div>
        <TravellingTours />
        <AboutCompany />
        <BookingProcess />
        <TravelReviews />
        <Excitingworld/>
        <CustomSupport />
        <Footer />
      </div>
    </>
  )
}

export default Page