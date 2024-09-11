import React from 'react'
import HomeHeaderSection from '../components/homeHeaderSection/HomeHeaderSection'
import CheckAvailibility from '../components/checkAvailability/CheckAvailibility'
import PerfectPlaces from '../components/perfectPlaces/PerfectPlaces'
import TopDestination from '../components/topDestination/TopDestination'
import FlexibleThings from '../components/flexibleThings/FlexibleThings'
import Bookingprocess from '../components/bookingProcess/Bookingprocess'
import TravelReviews from '../components/travelReview/TravelReviews'
import TravelGuides from '../components/travelguides/TravelGuides'
import CustomSupport from '../components/customSupport/CustomSupport'
import InspirationTrip from '../components/inspirationtrip/InspirationTrip'

const HomePage = () => {
    return (
        <div>
            <HomeHeaderSection />
            {/* <CheckAvailibility/> */}
            <PerfectPlaces/>
            <TopDestination/>
            <FlexibleThings/>
            <InspirationTrip/>
            <Bookingprocess/>
            <TravelReviews/>
            <TravelGuides/>
            <CustomSupport/>
        </div>
    )
}

export default HomePage