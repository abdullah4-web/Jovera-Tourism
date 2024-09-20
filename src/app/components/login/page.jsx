'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { loginApi } from '../../Redux/loginSlice';
import Link from 'next/link';
import './authstyle.css';
import Image from 'next/image';
import joveralogin from '../../Assets/homepageassets/joveralogin.png';
import HomeNavbar from '../homeNavbar/HomeNavbar'

const Page = () => {
    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState(''); // New state for login error message

    const { role, error } = useSelector((state) => state.userLogin.user) || {};
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        setErrors({ ...errors, [name]: '' });
        setLoginError(''); // Clear login error on input change
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formValues.email) newErrors.email = 'Email is required';
        if (!formValues.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            dispatch(loginApi(formValues))
                .unwrap()
                .catch((err) => {
                    setLoginError(err); // Set login error if login fails
                });
        } else {
            setErrors(formErrors);
        }
    };

    useEffect(() => {
        if (role === 'admin' || role === 'superadmin') {
            window.location.href = '/components/admin';
        }

        if (role === 'user') {
            window.location.href = '/';
        }
    }, [role]);

    return (
        <>
               <HomeNavbar />
        <div className='login_container_main'>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Card className='card_container_forgotpassword'>
                        <Card.Body>
                            <div className='login_div_container'>
                                <Row className='login_row_container'>
                                    <Col xs={12} className='d-flex justify-content-center'>
                                        <Image src={joveralogin} alt='joveralogin' width={240} height={65} />
                                    </Col>

                                    <Col xs={12} className='d-flex justify-content-center'>
                                        <h5 className='login_form_text'>Login</h5>
                                    </Col>

                                    <Col xs={12}>
                                        <div className='input_container_field mt-3'>
                                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                                <Form.Label className='forgot_label'>Email address</Form.Label>
                                                <Form.Control
                                                    type='email'
                                                    name='email'
                                                    placeholder='Enter email'
                                                    value={formValues.email}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.email}
                                                    className='text_field input_field_forgot'
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                    </Col>

                                    <Col xs={12}>
                                        <div className='input_container_field'>
                                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                                                <Form.Label className='forgot_label'>Password</Form.Label>
                                                <Form.Control
                                                    type='password'
                                                    name='password'
                                                    placeholder='Password'
                                                    value={formValues.password}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.password}
                                                    className='text_field input_field_forgot'
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            {/* Display login error message */}
                                            {loginError && (
                                                <Col xs={12}>
                                                    <div className='text-danger mb-2 text-center'>{loginError}</div>
                                                </Col>
                                            )}

                                            <div className='d-flex justify-content-end'>
                                                <Link href='/components/forgotPassword' className='sign_up_text mb-3'>
                                                    Forgot Password
                                                </Link>
                                            </div>
                                        </div>
                                    </Col>


                                    <Col xs={12}>
                                        <div className='input_container_field'>
                                            <button type='submit' className='forgot_password_button'>
                                                Login
                                            </button>
                                        </div>
                                    </Col>

                                    <div className='mt-2 register_container'>
                                        <p className='mb-0 register_account'>Don’t have an account?</p>
                                        <Link href='/components/register' className='sign_up_text'>
                                            Sign Up
                                        </Link>
                                    </div>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Form>
            </Container>
        </div>
        </> );
};

export default Page;
