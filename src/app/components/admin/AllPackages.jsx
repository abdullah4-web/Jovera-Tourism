import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Modal, Form, Table, Image as BootstrapImage } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import Link from 'next/link';
import './adminStyle.css'
import { FaRegStar } from "react-icons/fa";

const AllPackages = () => {
    const token = useSelector((state) => state.userLogin.user?.token);
    const [allPackages, setAllPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    // Fetching flights, hotels, and visas from Redux store
    const fetcFlights = useSelector(state => state.userLogin.flights);
    const fetcHotels = useSelector(state => state.userLogin.hotels);
    const fetcVisa = useSelector(state => state.userLogin.visa);

    console.log(fetcVisa, 'fetcFlights');

    // Updated package state without unnecessary fields
    const [updatedPackage, setUpdatedPackage] = useState({
        id: '',
        hotelId: '',
        visaId: '',
        flightId: '',
        amount: '',
        duration: '',
        imageFile: null,
        prevImage: ''
    });

    console.log(allPackages, 'allPackages');

    const handleClose = () => setShow(false);

    // Handle showing the modal and setting the selected package
    const handleShow = (pkg) => {
        setSelectedPackage(pkg);
        setUpdatedPackage({
            id: pkg._id,
            hotelId: pkg.hotel?._id || '',
            visaId: pkg.visa?._id || '',
            flightId: pkg.flight?._id || '',
            amount: pkg.amount || '',
            duration: pkg.duration || '',
            imageFile: null,
            prevImage: pkg.image || ''
        });
        setShow(true);
    };

    // Fetch all packages from the API
    const fetchPackages = async () => {
        try {
            const response = await axios.get('https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/package/get-all-packages', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAllPackages(response.data);
            setFilteredPackages(response.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, [token]);

    // Handle form submission for editing a package
    const handleEditSubmit = async () => {
        const formData = new FormData();
        formData.append('id', updatedPackage.id);
        formData.append('hotel', updatedPackage.hotelId);
        formData.append('visa', updatedPackage.visaId);
        formData.append('flight', updatedPackage.flightId);
        formData.append('amount', updatedPackage.amount);
        formData.append('duration', updatedPackage.duration);
        if (updatedPackage.imageFile) {
            formData.append('image', updatedPackage.imageFile);
        }

        try {
            await axios.put(
                `/api/package/update-package/${updatedPackage.id}`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );
            setShow(false);
            fetchPackages();
        } catch (error) {
            console.error('Error updating package:', error);
        }
    };

    // Handle input changes for text fields
    const handleInputChange = (e, field) => {
        setUpdatedPackage((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    // Handle file selection for image
    const handleFileChange = (e) => {
        setUpdatedPackage((prev) => ({
            ...prev,
            imageFile: e.target.files[0],
        }));
    };

    // Handle selection changes for dropdowns
    const handleSelectChange = (e, field) => {
        setUpdatedPackage((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    // Truncate hotel names for display
    const truncateHotelName = (name) => {
        if (!name) return '';
        const words = name.split(' ');
        return words.length > 6 ? words.slice(0, 6).join(' ') + '...' : name;
    };

    // Handle package deletion
    const deleteHandler = async (id) => {
        if (!confirm('Are you sure you want to delete this package?')) return;
        try {
            await axios.put(`https://joveratoursimbackend-git-main-abdullah-shahs-projects-3915135f.vercel.app/api/package/delete-package/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPackages();
        } catch (error) {
            console.error('Error deleting package:', error);
        }
    };

    return (
        <div className="all-packages-page">
            <div className="packages_container mb-5">
                <Container>
                    <h2 className="my-4">All Packages</h2>

                    {/* Packages Table */}
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Country</th>
                                <th>Hotel</th>
                                <th>Stars</th>
                                <th>Trip</th>
                                <th>Amount</th>
                                <th>Duration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPackages.length > 0 ? (
                                filteredPackages.map((pkg) => (
                                    <tr key={pkg._id}>
                                        <td>
                                            {pkg.image ? (
                                                <BootstrapImage
                                                    src={pkg.image}
                                                    alt={pkg.visa?.country || 'Package Image'}
                                                    rounded
                                                    width={100}
                                                    height={60}
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            ) : (
                                                'No Image'
                                            )}
                                        </td>
                                        <td>{pkg.visa?.country || 'N/A'}</td>
                                        <td>{truncateHotelName(pkg.hotel?.name)}</td>
                                        <td>{pkg.hotel?.stars || 'N/A'}</td>
                                        <td>{pkg.flight?.trip || 'N/A'}</td>
                                        <td>AED {pkg.amount || '0'}</td>
                                        <td>{pkg.duration || 'N/A'}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <CiEdit
                                                    style={{ fontSize: '20px', color: 'green', cursor: 'pointer' }}
                                                    onClick={() => handleShow(pkg)}
                                                    title="Edit Package"
                                                />
                                                <RiDeleteBinLine
                                                    style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }}
                                                    onClick={() => deleteHandler(pkg._id)}
                                                    title="Delete Package"
                                                />
                                                <Link href={`/components/packageDetails/${pkg._id}`} className='view_details_image'>View Details</Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">
                                        No packages available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    {/* Popular Visa Destination */}
                    {/* <h2 className="my-4">Popular Visa Destination</h2>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fetcVisa.length > 0 ? (
                                fetcVisa.map((visa) => (
                                    <tr key={visa._id}>
                                        <td>{visa.country}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <RiDeleteBinLine
                                                    style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }}
                                                    onClick={() => deleteHandler(visa._id)}
                                                    title="Delete Visa"
                                                />
                                                <Link href={`/components/packageDetails/${visa._id}`} className='view_details_image'>View Details</Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">
                                        No visas available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table> */}

                    {/* Edit Modal */}
                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Package</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                {/* Previous Image */}
                                {updatedPackage.prevImage && !updatedPackage.imageFile && (
                                    <div className="mb-3 text-center">
                                        <Form.Label>Current Package Image</Form.Label>
                                        <div>
                                            <BootstrapImage
                                                src={updatedPackage.prevImage}
                                                alt="Current Package Image"
                                                rounded
                                                width={250}
                                                height={150}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* New Image */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Package Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    {updatedPackage.imageFile && (
                                        <div className="mt-2">
                                            <Form.Label>Selected Image Preview:</Form.Label>
                                            <BootstrapImage
                                                src={URL.createObjectURL(updatedPackage.imageFile)}
                                                alt="Selected Package Image"
                                                rounded
                                                width={250}
                                                height={150}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}
                                </Form.Group>

                                {/* Amount */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Amount (AED)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={updatedPackage.amount}
                                        onChange={(e) => handleInputChange(e, 'amount')}
                                        placeholder="Enter amount"
                                    />
                                </Form.Group>

                                {/* Duration */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={updatedPackage.duration}
                                        onChange={(e) => handleInputChange(e, 'duration')}
                                        placeholder="e.g., 5 days"
                                    />
                                </Form.Group>

                                {/* Flight Dropdown */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Flight</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={updatedPackage.flightId}
                                        onChange={(e) => handleSelectChange(e, 'flightId')}
                                    >
                                        <option value="">Select Flight</option>
                                        {fetcFlights && fetcFlights.length > 0 ? (
                                            fetcFlights.map((flight) => (
                                                <option key={flight._id} value={flight._id}>
                                                    {`${flight.from} to ${flight.to} (${flight.trip})`}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No Flights Available</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>

                                {/* Hotel Dropdown */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Hotel</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={updatedPackage.hotelId}
                                        onChange={(e) => handleSelectChange(e, 'hotelId')}
                                    >
                                        <option value="">Select Hotel</option>
                                        {fetcHotels && fetcHotels.length > 0 ? (
                                            fetcHotels.map((hotel) => (
                                                <option key={hotel._id} value={hotel._id}>
                                                    {`${hotel.name} (${hotel.stars} stars)`}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No Hotels Available</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>

                                {/* Visa Dropdown */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Visa</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={updatedPackage.visaId}
                                        onChange={(e) => handleSelectChange(e, 'visaId')}
                                    >
                                        <option value="">Select Visa</option>
                                        {fetcVisa && fetcVisa.length > 0 ? (
                                            fetcVisa.map((visa) => (
                                                <option key={visa._id} value={visa._id}>
                                                    {`${visa.type} - ${visa.country} (${visa.duration})`}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No Visas Available</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleEditSubmit}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        </div>
    );
};

export default AllPackages;




// href={`/components/packageDetails/${pkg._id}`}