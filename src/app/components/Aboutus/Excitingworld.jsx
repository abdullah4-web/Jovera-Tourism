'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import './BookingStyle.css'
import exploreicon from '../../Assets/homepageassets/exploreicon.png'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
const Excitingworld = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);
    return (
        <div className='exciting_world_container' data-aos="fade-up">
            <div>

                <h1 className='exciting_world' data-aos="fade-up">
                    We live in an exciting world
                </h1>
                <div className='Start_btn_container' data-aos="fade-up">
                    <button className='StartNow_btn'>Start Exploring It <Image src={exploreicon} alt='exploreicon' /></button>
                </div>
            </div>
        </div>
    )
}

export default Excitingworld