'use client';
import React, { useEffect, useState } from 'react';
import './HomeHeaderSection.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactPlayer from 'react-player';

const HomeHeaderSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });

        // Update the title index every 5 seconds
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % headSectionText.length);
        }, 3000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const headSectionText = [
        {
            id: 0,
            title: 'Design Your Journey Yourself and Discover Adventure.',
        },
        {
            id: 1,
            title: 'Get a UAE visa within 24 hours.',
        },
        {
            id: 2,
            title: 'Best offers for Airline Tickets.',
        },
    ];

    return (
        <div className="HomeHeaderSection_container">
            <div className="heroSectionSlider">
                <div className="videoContainer">
                    <ReactPlayer
                        url='https://res.cloudinary.com/dn1oz4vt9/video/upload/v1726753509/0912_2_ujhomn.mp4'
                        controls={false}
                        playing={true}
                        muted={true}
                        loop={true}
                        playsinline={true}
                        width="100%"
                        height="100%"
                    />
                    <div className="overlayContent">
                        <h1 className='heroText'>
                            {headSectionText[currentIndex].title}
                        </h1>
                        <button className='exploreButton'>Explore Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeHeaderSection;
