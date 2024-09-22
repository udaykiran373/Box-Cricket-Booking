import React, { useEffect, useState,useRef } from 'react';
import VenueCard from './VenueCard';
import './Venue.css';

function Venue() {
  // Initialize venues with static data
  const effectRan = useRef(false);
  const [venues, setVenues] = useState([
    
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (effectRan.current === false){
    const venueload = async () => {
      try {
        const response = await fetch('http://localhost:5000/shop/loadvenues', {
          credentials: 'include'
        });
        console.log('hi');
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          console.log('Fetched Data:', data);

          // Check if data structure matches
          if (Array.isArray(data) && data.length > 0) {
            // Merge fetched venues with static venues
            setVenues(prevVenues => [...prevVenues, ...data]);
          } else {
            console.warn('Fetched data is not in expected format:', data);
          }
        } else {
          console.error('Failed to load venues:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching venues:', error);
        alert('An error occurred while fetching venues.');
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    venueload();
    effectRan.current = true;
  }return () => {
    effectRan.current = true; // Cleanup
  };
  }, []);

  if (loading) {
    return <div>Loading venues...</div>; // Display loading message while fetching
  }

  return (
    <div className="app">
      <div className="book-venues">
        <div className='heading'>
          <h2 className='heading2'>Book Venues</h2>
          <a href="#" className="see-all">SEE ALL VENUES</a>
        </div>
        <div className="venues-container">
          {venues.slice(0, 6).map((venue, index) => (
            <VenueCard key={index} venue={venue} /> // Static venues will have index as key
          ))}
        </div>
      </div>
    </div>
  );
}

export default Venue;
