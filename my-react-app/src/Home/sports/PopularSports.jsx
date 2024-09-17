import React from 'react';
import SportsCard from './SportsCard';
import './PopularSports.css'; // External CSS for styling the sports container

const sportsData = [
  { title: 'Badminton', image: 'BatmintonSolo.jpg' },
  { title: 'Football', image: 'FootballSolo.jpg' },
  { title: 'Cricket', image: 'CricketSolo.jpg' },
  { title: 'Swimming', image: 'swimming.jpg' },
  { title: 'Tennis', image: 'tennis.jpg' },
  { title: 'Table Tennis', image: 'Table-tennis.png' },
  { title: 'Hockey', image: 'Hockey.jpg' },
];

const PopularSports = () => {
  return (
    <div className="popular-sports-container">
      <h2>Popular Sports</h2>
      <div className="sports-card-container">
        {sportsData.map((sport, index) => (
          <SportsCard key={index} image={sport.image} title={sport.title} />
        ))}
      </div>
    </div>
  );
};

export default PopularSports;
