import React from 'react';
import './VenueCard.css';

const VenueCard = ({ venue }) => {
  return (
    <div className="venue-card">
      <img src={venue.image} alt={venue.name} className="venue-image" />
      <div className="venue-details">
        <h3>{venue.name}</h3>
        <p>{venue.address}</p>
      </div>
    </div>
  );
};

export default VenueCard;
