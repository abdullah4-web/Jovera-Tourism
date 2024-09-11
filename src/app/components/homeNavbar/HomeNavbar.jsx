"use client"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import navlogo from '../../Assets/homeNavbarAssets/navlogo.png'
import Image from 'next/image';
import Icon from '../../Assets/homeNavbarAssets/Icon.png'
import personlogo from '../../Assets/homeNavbarAssets/personlogo.png'
import './HomeNavbar.css'
import Link from 'next/link';

function HomePageNav() {
    return (
        <Navbar expand="lg" className="navContainer sticky-top">
            <Container fluid>
                <Image src={navlogo} alt='navlogo' className='navlogo_image' />
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="m-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link href="/" className='linkStyleNav' >Home</Link>
                        <Link href="/components/Aboutus" className='linkStyleNav'>About us</Link>
                        <Link href="/components/flights" className='linkStyleNav'>Flights</Link>
                        <Link href="#action2" className='linkStyleNav'>Packages</Link>
                        <Link href="#action2" className='linkStyleNav'>Visa</Link>
                        <Link href="#action2" className='linkStyleNav'>Corporate</Link>
                        {/* <NavDropdown title="Flights" id="linkStyleNavbar">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Package" id="linkStyleNavbar">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Visa" id="linkStyleNavbar">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Corporate" id="linkStyleNavbar">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                        </NavDropdown> */}


                        <Link href="/components/contactUs" className='linkStyleNav'>Contact</Link>
                    </Nav>
                    {/* <NavDropdown title="EUR" id="linkStyleNavbar">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                            Another action
                        </NavDropdown.Item>
                    </NavDropdown> */}

                    {/* <div className='navbarLogoright' >
                        <Image src={Icon} alt='Icon' />
                    </div>

                    <div className='navbarLogoright' >
                        <Image src={personlogo} alt='personlogo' />
                    </div>

                    <Link href={'/'} className='becomeHostbtn' >Become a host</Link> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HomePageNav;