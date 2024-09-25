import React from 'react';
import './Loader.css';
import { BiSolidPlaneAlt } from 'react-icons/bi';

const Loader = () => {
    return (
        <div className="loader">
            <BiSolidPlaneAlt className="plane-icon" style={{ color: '#e4a70a' }} />
        </div>
    );
}

export default Loader;
