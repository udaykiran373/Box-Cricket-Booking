import React from 'react';
import './VenueCard2.css';

const VenueCard2 = ({ venue }) => {
  return (
    <div className="venue-card2">
      <a href='#'><img src={venue.image} alt={venue.name} className="venue-image2" /></a>
      <div className="venue-details2">
        <h3>{venue.name}</h3>
        <p>{venue.address}</p>
      </div>
    </div>
  );
};

export default VenueCard2;