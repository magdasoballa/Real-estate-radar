import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import listingsData from '../../realEstateList.json';
import { formatDate, formatPrice, isNewHome } from '../../utils/helpers';
import './HousesList.scss';
import { faBath, faBed, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const HousesList = () => {
    const [sortBy, setSortBy] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [noResults, setNoResults] = useState(false);

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
        if (selectedCountry === '') {
            setFilteredItems(listingsData);
        } else {
            const filtered = listingsData.filter(house => house.country === selectedCountry);
            setFilteredItems(filtered);
            setNoResults(filtered.length === 0);
        }
    }, [selectedCountry]);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleChangeCountry = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleShowAll = () => {
        setShowAll(true);
        setSelectedCountry('')
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
            default:
                return listingsCopy;
        }
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
                </select>
                <select className="sorting-option" value={selectedCountry} onChange={handleChangeCountry}>
                    <option >Select a country</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country.name.common}>{country.name.common}</option>
                    ))}
                </select>
                <button className="sorting-option" onClick={handleShowAll}>Show All</button>
            </div>
            <ul>
                {noResults && selectedCountry !== '' && !showAll ?
                    <li className="no-results">No results found for {selectedCountry}</li>
                    :
                    sortedListings().map((listing, index) => (
                        <li key={index} className="home-listing-item">
                            <Link to={`/listing/${index}`} className="home-listing-link">
                                <div className="home-listing-content">
                                    <img src={listing?.image} alt="Miniatura" className="home-listing-pic" />
                                    <div className="home-listing-info">
                                        {isNewHome(listing.dateOfIssue) && <div className="new-home-badge">New Home</div>}

                                        <div className="home-listing-title">{listing?.title}</div>
                                        <div>{listing?.rooms} bed flat for sale</div>
                                        <div className='home-listing-icons'><FontAwesomeIcon icon={faBed} /> {listing?.rooms} <FontAwesomeIcon icon={faBath} /> {listing?.bathroom}
                                        </div>
                                        <div><FontAwesomeIcon icon={faGlobe} /> {listing?.country}
                                        </div>
                                        <div className="home-listing-price">${formatPrice(listing?.price)}</div>
                                        <button className="home-listing-button">More details</button>
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
