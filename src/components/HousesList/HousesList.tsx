import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import listingsData from '../../realEstateList.json';
import { formatDate, formatPrice, isNewHome } from '../../utils/helpers';
import './HousesList.scss';
import { faBath, faBed, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HousesList = () => {
    const [sortBy, setSortBy] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedRooms, setSelectedRooms] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [noResults, setNoResults] = useState(false);

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
        selectedCountryParam && setSelectedCountry(selectedCountryParam || '');
        selectedRoomParam && setSelectedRooms(selectedRoomParam || '')
    }, [location.search]);

    useEffect(() => {
        if (selectedCountry === '') {
            setFilteredItems(listingsData);
        } else {
            const filtered = listingsData.filter(house => house.country === selectedCountry);
            setFilteredItems(filtered);
            setNoResults(filtered.length === 0);
        }
    }, [selectedCountry, selectedRooms]);

    useEffect(() => {
        const sortedList = sortedListings();
        if (sortBy) {
            setFilteredItems(sortedList);
        }
    }, [sortBy]);

    const queryParams = new URLSearchParams();

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleChangeRooms = (event) => {
        setSelectedRooms(event.target.value);
        event.preventDefault();
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('rooms', event.target.value);
        const queryString = queryParams.toString();
        navigate(`?${queryString}`);
    };

    const handleChangeCountry = (event) => {
        setSelectedCountry(event.target.value);
        event.preventDefault();
        const queryParams = new URLSearchParams(location.search);
        if (event.target.value) queryParams.set('country', event.target.value);
        const queryString = queryParams.toString();
        navigate(`?${queryString}`);
    };

    const handleShowAll = () => {
        setShowAll(true);
        setSelectedCountry('');
        setSelectedRooms('');
    };

    const sortedListings = () => {
        const listingsCopy = showAll ? listingsData : filteredItems;
        switch (sortBy) {
            case 'dateAsc':
                return listingsCopy.sort((a, b) => new Date(a.dateOfIssue).getTime() - new Date(b.dateOfIssue).getTime());
            case 'dateDesc':
                return listingsCopy.sort((a, b) => new Date(b.dateOfIssue).getTime() - new Date(a.dateOfIssue).getTime());
            case 'priceAsc':
                return listingsCopy.sort((a, b) => a.price - b.price);
            case 'priceDesc':
                return listingsCopy.sort((a, b) => b.price - a.price);
            case 'titleAsc':
                return listingsCopy.sort((a, b) => a.title.localeCompare(b.title));
            case 'titleDesc':
                return listingsCopy.sort((a, b) => b.title.localeCompare(a.title));
            case 'roomsAsc':
                return listingsCopy.sort((a, b) => a.rooms - b.rooms);
            case 'roomsDesc':
                return listingsCopy.sort((a, b) => b.rooms - a.rooms);
            default:
                return listingsCopy;
        }
    };

    const filterByRooms = () => {
        if (!selectedRooms) return filteredItems;
        return filteredItems.filter(item => item.rooms === parseInt(selectedRooms));
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
                {!filterByRooms().length && noResults && selectedCountry !== '' && !showAll ?
                    <li className="no-results">No results found for {selectedCountry}</li>
                    :
                    filterByRooms().map((listing, index) => (
                        <li key={index} className="home-listing-item">
                            <Link to={`/listing/${index}`} className="home-listing-link">
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
