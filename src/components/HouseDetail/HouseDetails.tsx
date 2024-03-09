import React from 'react';
import { useParams } from 'react-router-dom';
import listingsData from '../../realEstateList.json';
import './HouseDetails.scss'

const HouseDetails = () => {
  const { id } = useParams();
  const listing = listingsData[parseInt(id)];

  return (
    <div className="listing-item">
      <img src={listing.image} alt={listing.title} className="listing-image" />
      <div className="listing-content">
        <h2 className="listing-title">{listing.title}</h2>
        <p className="listing-description">{listing.description}</p>
        <p className="listing-price">${listing.price}</p>
      </div>
    </div>
  );
};

export default HouseDetails;
