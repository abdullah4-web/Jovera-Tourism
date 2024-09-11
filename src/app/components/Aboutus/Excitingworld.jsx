import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import './BookingStyle.css'
import exploreicon from '../../Assets/homepageassets/exploreicon.png'
const Excitingworld = () => {
    return (
        <div className='exciting_world_container' >
            <div>

                <h1 className='exciting_world' >
                    We live in an exciting world
                </h1>
                <div className='Start_btn_container' >
                    <button className='StartNow_btn'>Start Exploring It <Image src={exploreicon} alt='exploreicon' /></button>
                </div>
            </div>
        </div>
    )
}

export default Excitingworld