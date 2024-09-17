import React from 'react';
import './SportsCard.css'; // External CSS for styling the sports cards

const SportsCard = ({ image, title }) => {
  return (
    <div className="sports-card">
      <img src={image} alt={title} className="sports-image" />
      <div className="sports-title">{title}</div>
    </div>
  );
};

export default SportsCard;
