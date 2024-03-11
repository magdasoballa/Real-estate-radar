import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Footer.scss';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';


export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum turpis ut erat condimentum, sit amet vehicula est fermentum.</p>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>Email: info@example.com</p>
                    <p>Phone: +1234567890</p>
                    <p>Address: 123 Main Street, City, Country</p>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="#">Facebook <FontAwesomeIcon icon={faFacebook} size="1x" /></a></li>
                        <li><a href="#">Twitter <FontAwesomeIcon icon={faTwitter} size="1x" /></a></li>
                        <li><a href="#">Instagram <FontAwesomeIcon icon={faInstagram} size="1x" /></a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Real Estate Radar</p>
            </div>
        </footer>
    );
};

export default Footer;
