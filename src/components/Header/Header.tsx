import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons';


export const Header = () => {
    return (
        <div className='header'>
            <div className='home-icon'>
                <Link to="/">
                    <FontAwesomeIcon icon={faHome} />
                </Link>
            </div>
            <h1 className="home-heading">Real Estate Radar</h1>
        </div>
    );
};

export default Header;
