import React from 'react';
import VenueCard from './VenueCard';
import './Venue.css';

const venues = [
  {
    name: "Praxis Fitness Hub",
    address: "D.G.S Melkote Park, Nampally",
    image: "Boxcricket.jpeg"
  },
  {
    name: "Dugout Sports Arena",
    address: "4-231/1, Amar Arcade",
    image: "Batminton.jpeg"
  },
  {
    name: "Vishwamanya Badminton",
    address: "Railnilayam Road",
    image: "Cricket.jpg"
  },
  {
    name: "HighBall",
    address: "3-6-363, Street No. 20",
    image: "Football.jpeg"
  },
  {
    name: "Bharathiya Swimming Acadamy",
    address: "3-6-363, Street No. 20",
    image: "Swimming.jpg"
  },
  {
    name: "Burnley Tennis Club",
    address: "3-6-363, Street No. 20",
    image: "Tennis.jpg"
  }
];

function Venue() {
  return (
    <div className="app">
      <div className="book-venues">
        <div className='heading'>
        <h2 className='heading2'>Book Venues</h2>
        <a href="#" className="see-all">SEE ALL VENUES</a>
        </div>
        <div className="venues-container">
          {venues.map((venue, index) => (
            <VenueCard key={index} venue={venue} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Venue;
