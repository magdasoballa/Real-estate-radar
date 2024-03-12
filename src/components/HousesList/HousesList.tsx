import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import listingsData from '../../realEstateList.json';
import { formatDate, formatPrice, isNewHome } from '../../utils/helpers';
import './HousesList.scss';
import { faBath, faBed, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useListingsFilter from '../../hooks/useListingFilter';

const HousesList = () => {
    const [countries, setCountries] = useState([]);
    const { sortBy, setSortBy, selectedCountry, setSelectedCountry, selectedRooms, setSelectedRooms, showAll, filteredItems, noResults, applyFilters, resetFilters } = useListingsFilter(listingsData);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                setCountries(data);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const selectedCountryParam = queryParams.get('country');
        const selectedRoomParam = queryParams.get('rooms');
        const selectedSortByParam = queryParams.get('sortBy');
        selectedCountryParam && setSelectedCountry(selectedCountryParam || '');
        selectedRoomParam && setSelectedRooms(selectedRoomParam || '')
        selectedSortByParam && setSortBy(selectedSortByParam || '')
    }, [location.search]);

    useEffect(() => {
        applyFilters();
    }, [selectedCountry, selectedRooms, sortBy]);

    const handleSortChange = (event) => {
        const selectedValue = event.target.value;
        setSortBy(selectedValue);
        const queryParams = new URLSearchParams(location.search);
        if (selectedValue) {
            queryParams.set('sortBy', selectedValue);
        } else {
            queryParams.delete('sortBy');
        }
        const queryString = queryParams.toString();
        navigate(`?${queryString}`);
    };

    const handleChangeRooms = (event) => {
        const selectedValue = event.target.value;
        setSelectedRooms(selectedValue);
        const queryParams = new URLSearchParams(location.search);
        if (selectedValue) {
            queryParams.set('rooms', selectedValue);
        } else {
            queryParams.delete('rooms');
        }
        const queryString = queryParams.toString();
        navigate(`?${queryString}`);
    };
    const handleChangeCountry = (event) => {
        const selectedValue = event.target.value;
        setSelectedCountry(selectedValue);
        const queryParams = new URLSearchParams(location.search);
        if (selectedValue) {
            queryParams.set('country', selectedValue);
        } else {
            queryParams.delete('country');
        }
        const queryString = queryParams.toString();
        navigate(`?${queryString}`);
    };

    const handleShowAll = () => {
        resetFilters();
        navigate('/');
    };

    return (
        <div className="home-container">
            <div className="sorting-options">
                <select value={sortBy} onChange={handleSortChange} className="sorting-option">
                    <option value="">Select sorting option</option>
                    <option value="dateAsc">Earliest date</option>
                    <option value="dateDesc">Latest date</option>
                    <option value="priceAsc">Price ascending</option>
                    <option value="priceDesc">Price descending</option>
                    <option value="titleAsc">Title A-Z</option>
                    <option value="titleDesc">Title Z-A</option>
                    <option value="roomsAsc">Rooms ascending</option>
                    <option value="roomsDesc">Rooms descending</option>
                </select>
                <select className="sorting-option" value={selectedCountry} onChange={handleChangeCountry}>
                    <option value="">Select a country</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country.name.common}>{country.name.common}</option>
                    ))}
                </select>
                <select className="sorting-option" value={selectedRooms} onChange={handleChangeRooms}>
                    <option value="">Number of rooms</option>
                    <option value="1">1 room</option>
                    <option value="2">2 rooms</option>
                    <option value="3">3 rooms</option>
                    <option value="4">4 rooms</option>
                    <option value="5">5 or more</option>
                </select>
                <button className="sorting-option" onClick={handleShowAll}>Show All</button>
            </div>
            <ul>
                {noResults && selectedCountry !== '' && !showAll ?
                    <li className="no-results">No results found for {selectedCountry}</li>
                    :
                    filteredItems.map((listing, index) => (
                        <li key={index} className="home-listing-item">
                            <Link to={`/listing/${listing?.id}`} className="home-listing-link">
                                <div className="home-listing-content">
                                    <img src={listing?.image} alt="Miniatura" className="home-listing-pic" />
                                    <div className="home-listing-info">
                                        {isNewHome(listing.dateOfIssue) && <div className="new-home-badge">New Home</div>}
                                        <div className="home-listing-title">{listing?.title}</div>
                                        <div>{listing?.rooms} bed flat for sale</div>
                                        <div className='home-listing-icons'>
                                            <FontAwesomeIcon icon={faBed} /> {listing?.rooms} <FontAwesomeIcon icon={faBath} /> {listing?.bathroom}
                                        </div>
                                        <div><FontAwesomeIcon icon={faGlobe} /> {listing?.country}</div>
                                        <div className="home-listing-price">${formatPrice(listing?.price)}</div>
                                        <div><button className="home-listing-button">More details</button></div>
                                        <div className="home-listing-date">Listed on {formatDate(listing?.dateOfIssue)}</div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default HousesList;
