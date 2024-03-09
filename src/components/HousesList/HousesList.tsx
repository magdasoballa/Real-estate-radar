import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import listingsData from '../../realEstateList.json';
import './HousesList.scss';

const HousesList = () => {
    const [sortBy, setSortBy] = useState('');

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const sortOptions = [
        { value: '', label: 'Select sorting option' },
        { value: 'dateAsc', label: 'Earliest date' },
        { value: 'dateDesc', label: 'Latest date' },
        { value: 'priceAsc', label: 'Price ascending' },
        { value: 'priceDesc', label: 'Price descending' },
        { value: 'titleAsc', label: 'Title A-Z' },
        { value: 'titleDesc', label: 'Title Z-A' },
    ];

    const sortedListings = () => {
        const listingsCopy = [...listingsData];
        switch (sortBy) {
            case 'dateAsc':
                return listingsCopy.sort((a, b) => {
                    const dateA = new Date(a['dateOfIssue']).getTime();
                    const dateB = new Date(b['dateOfIssue']).getTime();
                    return dateA - dateB;
                });
            case 'dateDesc':
                return listingsCopy.sort((a, b) => {
                    const dateA = new Date(a['dateOfIssue']).getTime();
                    const dateB = new Date(b['dateOfIssue']).getTime();
                    return dateB - dateA;
                });
            case 'priceAsc':
                return listingsCopy.sort((a, b) => a.price - b.price);
            case 'priceDesc':
                return listingsCopy.sort((a, b) => b.price - a.price);
            case 'titleAsc':
                return listingsCopy.sort((a, b) => a.title.localeCompare(b.title));
            case 'titleDesc':
                return listingsCopy.sort((a, b) => b.title.localeCompare(a.title));
            default:
                return listingsCopy;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="home-container">
            <div className="sorting-options">
                <select value={sortBy} onChange={handleSortChange}>
                    {sortOptions.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <ul>
                {sortedListings().map((listing, index) => (
                    <li key={index} className="home-listing-item">
                        <Link to={`/listing/${index}`} className="home-listing-link">
                            <img src={listing.image} alt={listing.title} className="home-listing-image" />
                            <div className="home-listing-content">
                                <h2 className="home-listing-title">{listing.title}</h2>
                                <p className="home-listing-description">{listing.description}</p>
                                <p className="home-listing-price">${listing.price}</p>
                                <button className="home-listing-button">Więcej szczegółów</button>
                                <p>{formatDate(listing?.dateOfIssue)}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HousesList;
