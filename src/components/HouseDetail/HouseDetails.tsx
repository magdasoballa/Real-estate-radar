import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import listingsData from '../../realEstateList.json';
import { formatDate, formatPrice, isNewHome } from '../../utils/helpers';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './HouseDetails.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faGlobe } from '@fortawesome/free-solid-svg-icons';

const HouseDetails = () => {
  const { id } = useParams();
  const listing = listingsData[parseInt(id)];
  const navigate = useNavigate();

  return (
    <>
      <button className='back-button' onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /> Back to search results</button>
      <div className="listing-container">

        <div className="listing-item">
          <img src={listing.image} alt={listing?.title} className="listing-image" />
          <div className="listing-info">
            <div>
              {isNewHome(listing?.dateOfIssue) && <div className="new-home-badge">New Home</div>}
              <h2 className="listing-title">{listing?.title}</h2>

              <div className='listing-icons'><FontAwesomeIcon icon={faBed} /> {listing?.rooms} <FontAwesomeIcon icon={faBath} /> {listing?.bathroom}
              </div>
              <div><FontAwesomeIcon icon={faGlobe} /> {listing?.country}
              </div>
            </div>
            <div className='listing-description'>{listing?.description}</div>
            <div className="listing-price">${formatPrice(listing?.price)}</div>
            <div className="listing-date">Listed on {formatDate(listing?.dateOfIssue)}</div>
          </div>
        </div>
      </div>
    </>

  );
};

export default HouseDetails;
