'use client';
import React, { useState } from 'react';
import './HomeNavbar.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaBars } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import navlogo from '../../Assets/homeNavbarAssets/navlogo.png';
import Nav from 'react-bootstrap/Nav';
import { logout } from '../../Redux/loginSlice';
import { useDispatch, useSelector } from 'react-redux';

const Sidenav = () => {
    const [sidenavWidth, setSidenavWidth] = useState(0);
    const checkAuth = useSelector(state => state.userLogin?.user?.token);
    const checkRole = useSelector(state => state.userLogin?.user?.role);
    const dispatch = useDispatch();

    const openNav = () => {
        setSidenavWidth(250);
    };

    const closeNav = () => {
        setSidenavWidth(0);
    };

    const logoutHandler = () => {
        dispatch(logout());
        // window.location.href = '/components/login';
    };

    return (
        <>
            <Navbar expand="lg" className="sticky-top" style={{ overflow: 'visible', background: 'rgba(0, 0, 0, 0.35)' }}>
                <Container>
                    <Link href={'/'}>
                        <Image src={navlogo} alt='navlogo' className='navlogo_image' />
                    </Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="justify-content-center">
                        <Nav className="m-auto my-2 my-lg-0" navbarScroll>
                            <Link href="/" className='linkStyleNav'>Home</Link>
                            <Link href="/components/Aboutus" className='linkStyleNav'>About</Link>
                            <Link href="/components/packages" className='linkStyleNav'>Packages</Link>
                            <Link href="/components/corporate" className='linkStyleNav'>Corporate</Link>
                            <Link href="/components/contactUs" className='linkStyleNav'>Contact</Link>
                            {(checkRole === 'admin' || checkRole === 'superadmin') && (
                                <Link href="/components/admin" className='linkStyleNav'>Admin</Link>
                            )}
                            {checkAuth ? (
                                <>
                                    <Link href={'/components/login'} className='logout_btn linkStyleNav' onClick={logoutHandler} style={{ cursor: 'pointer' }}>Logout</Link>

                                </>
                            ) : (
                                <>
                                    <Link href="/components/login" className='linkStyleNav'>Login</Link>
                                    <Link href="/components/register" className='linkStyleNav'>Register</Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>

                    <div className='side_bar_container'>
                        <div id="mySidenav" className="sidenav" style={{ width: sidenavWidth }}>
                            <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
                                &times;
                            </a>
                            <div className='link_tag_sidebar'>
                                <Link href="/" className='linkStyleNav'>Home</Link>
                                <Link href="/components/Aboutus" className='linkStyleNav'>About us</Link>
                                <Link href="/components/packages" className='linkStyleNav'>Packages</Link>
                                <Link href="/components/corporate" className='linkStyleNav'>Corporate</Link>
                                <Link href="/components/contactUs" className='linkStyleNav'>Contact</Link>
                                {(checkRole === 'admin' || checkRole === 'superadmin') && (
                                    <Link href="/components/admin" className='linkStyleNav'>Admin</Link>
                                )}
                                {checkAuth ? (
                                    <>
                                        <Link href={'/components/login'} className='logout_btn' onClick={logoutHandler} style={{ cursor: 'pointer' }}>Logout</Link>

                                    </>
                                ) : (
                                    <>
                                        <Link href="/components/login" className='linkStyleNav'>Login</Link>
                                        <Link href="/components/register" className='linkStyleNav'>Register</Link>
                                    </>
                                )}
                            </div>
                        </div>

                        <span
                            style={{ fontSize: '30px', cursor: 'pointer' }}
                            onClick={openNav}
                        >
                            <FaBars style={{ color: 'white', backgroundColor: 'transparent' }} />
                        </span>
                    </div>
                </Container>
            </Navbar>
        </>
    );
};

export default Sidenav;
