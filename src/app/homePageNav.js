"use client"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import tourismlogo from '../Assets/homePageAssets/tourismlogo.png'
import Image from 'next/image';
import Link from 'next/link';
import Icon from '../Assets/homePageAssets/Icon.png'
import personlogo from '../Assets/homePageAssets/personlogo.png'

function HomePageNav() {
    return (
        <Navbar expand="lg" className="navContainer">
            <Container fluid>
                <Image src={tourismlogo} alt='tourismlogo' />
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="m-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1" className='linkStyleNav' >Home</Nav.Link>
                        <Nav.Link href="#action2" className='linkStyleNav'>About us</Nav.Link>
                        <NavDropdown title="Hotel" id="linkStyleNavbar">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Tour" id="linkStyleNavbar">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Activity" id="linkStyleNavbar">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Rental" id="linkStyleNavbar">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Car" id="linkStyleNavbar">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                        </NavDropdown>


                        <Nav.Link href="#action2" className='linkStyleNav'>Contact us</Nav.Link>
                    </Nav>
                    <NavDropdown title="EUR" id="linkStyleNavbar">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                            Another action
                        </NavDropdown.Item>
                    </NavDropdown>

                    <div className='navbarLogoright' >
                        <Image src={Icon} alt='Icon' />
                    </div>

                    <div className='navbarLogoright' >
                        <Image src={personlogo} alt='personlogo' />
                    </div>

                    <Link href={'/'} className='becomeHostbtn' >Become a host</Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HomePageNav;