import React from 'react';
import VenueCard from './VenueCard';
import './Venue.css';

const venues = [
  {
    name: "Praxis Fitness Hub",
    address: "D.G.S Melkote Park, Nampally",
    distance: "1.56",
    rating: "2.18",
    ratingCount: "11",
    image: "praxis_fitness_hub.jpg"
  },
  {
    name: "Dugout Sports Arena",
    address: "4-231/1, Amar Arcade",
    distance: "2.39",
    rating: "5.00",
    ratingCount: "6",
    image: "dugout_sports_arena.jpg"
  },
  {
    name: "Vishwamanya Badminton",
    address: "Railnilayam Road",
    distance: "5.41",
    rating: "4.19",
    ratingCount: "113",
    image: "vishwamanya_badminton.jpg"
  },
  {
    name: "HighBall",
    address: "3-6-363, Street No. 20",
    distance: "0.08",
    rating: "5.00",
    ratingCount: "5",
    image: "highball.jpg"
  }
];

function Venue() {
  return (
    <div className="app">
      <div className="book-venues">
        <h2>Book Venues</h2>
        <div className="venues-container">
          {venues.map((venue, index) => (
            <VenueCard key={index} venue={venue} />
          ))}
        </div>
        <a href="#" className="see-all">SEE ALL VENUES</a>
      </div>
    </div>
  );
}

export default Venue;
