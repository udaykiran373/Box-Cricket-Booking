import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';


const BookingPage = () => {
  const { venueName, groundName } = useParams();
  const [venueData, setVenueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const effectRan = useRef(false);
  const {name}=useParams();
  console.log(name);

  useEffect(() => {
    if (effectRan.current === false) {
      const fetchVenueData = async () => {
        try {
          const response = await fetch('http://localhost:5000/shop/loadground', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
            credentials: 'include',
          });

          if (response.ok) {
            const data = await response.json();
            setVenueData(data);
          } else {
            console.error('Failed to load Ground:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching Ground:', error);
          alert('An error occurred while fetching Ground.');
        } finally {
          setLoading(false);
        }
      };

      fetchVenueData();
      effectRan.current = true;
    }

    return () => {
      effectRan.current = true; // Cleanup to prevent double fetch in strict mode
    };
  }, [name]);

  if (loading) {
    return <div>Loading Ground...</div>; // Display loading message while fetching
  }

  if (!venueData) {
    return <div>No venue data available.
        hello
    </div>; // Handle case where no data is returned
  }

  return (
    <div className="booking-page">
        <h1>Hi</h1>
      <div className="content">
        <VenueDetails
          name={venueData.groundname}
          location={venueData.address}
          image={venueData.image}
          rating={venueData.averagerating}
          ratingCount={venueData.reviews.length}
          timing={venueData.availability}
          facilities={venueData.facilities}
          pricePerHour={venueData.priceperhour}
        />
        <div className="side-info">
          <BookingInfo pricePerHour={venueData.priceperhour} />

        </div>
      </div>
    </div>
  );
};

const VenueDetails = ({ name, location, image, rating, ratingCount, timing, facilities, pricePerHour }) => {
  return (
    <div className="venue-details">
      <h2>{name}</h2>
      <p>{location} · ⭐ {rating} ({ratingCount} ratings)</p>
    
      {/*<img src={require(`../assets/${image}`)} alt={name} className="venue-image" />*/}
      
      <div className="venue-info">
        <h4>Timing</h4>
        <p>{timing.map(t => `${t.start} - ${t.end}`).join(', ')}</p>
        <h4>Facilities</h4>
        <ul>
          {facilities.map((facility, index) => (
            <li key={index}>{facility}</li>
          ))}
        </ul>
        <h4>Price</h4>
        <p>₹{pricePerHour} per hour</p>
      </div>
    </div>
  );
};

const BookingInfo = ({ pricePerHour }) => {
  return (
    <div className="booking-info">
      <h3>Book Now</h3>
      <p>Price: ₹{pricePerHour} per hour</p>
      <button className="book-now">Book Now</button>
      <div className="button-group">
        <button className="share"><i className="fas fa-share-alt"></i> Share</button>
        <button className="bulk-corporate">Bulk / Corporate</button>
      </div>
    </div>
  );
};


export default BookingPage;
