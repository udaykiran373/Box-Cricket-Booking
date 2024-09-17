import React from 'react';
import './VenueCard.css';

const VenueCard = ({ venue }) => {
  return (
    <div className="venue-card">
      <img src={venue.image} alt={venue.name} className="venue-image" />
      <div className="venue-details">
        <h3>{venue.name}</h3>
        <p>{venue.address} (~{venue.distance} Kms)</p>
        <div className="rating">
          <span className="rating-score">{venue.rating}</span>
          <span className="rating-count">({venue.ratingCount})</span>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
