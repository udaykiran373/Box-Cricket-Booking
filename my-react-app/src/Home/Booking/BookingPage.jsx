import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './BookingPage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingPage = () => {
  const { name } = useParams();
  const [venueData, setVenueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [playDuration, setPlayDuration] = useState(1); 
  const [availableDays, setAvailableDays] = useState([]);
  const [pricePerHour, setPricePerHour] = useState(0);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const shopname = name.replace(/-/g, ' ').split('_')[0];
  const effectRan = useRef(false);
  const [address, setAddress] = useState('');
  const [alreadybookedgrounds,setalreadybookedgrounds]=useState(null);
  const [sessionstate,setsessionstate]=useState(false);
  const [platformpercentage,setplatformpercentage]=useState(0);

  useEffect(() => {
    if (effectRan.current === false) {
      const fetchVenueData = async () => {
        try {
          const response = await fetch('http://localhost:5000/shop/loadground', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
            credentials: 'include',
          });

          if (response.ok) {
            const data = await response.json();
            setVenueData(data.ground);
            setAddress(data.address);
            setPricePerHour(data.ground.priceperhour);
            extractAvailableDays(data.ground.availability);
          } else {
            const errorData = await response.json();
            setError(errorData.message);
          }
        } catch (error) {
          setError('An error occurred while fetching Ground.');
        } finally {
          setLoading(false);
        }
      };

      fetchVenueData();
      effectRan.current = true;
    } 

    return () => {
      effectRan.current = true;
    };
  }, [name]);

  const extractAvailableDays = (availability) => {
    const days = availability.map(timing => timing.day);
    setAvailableDays(days);
  };

  const openBookingModal =async () => {
    try{
     const response=await fetch('http://localhost:5000/user/checksession',{credentials: 'include'}) ;
     if(response.ok){
      setsessionstate(true);
     }
    }catch(error){
      console.log(error)
    }
    try{
      const percentage=await getpercentage();
      setplatformpercentage(percentage);
    }catch(err){
      console.log(err)
    }
    setIsModalOpen(true);
  };


  const getpercentage=async ()=>{
    try{
      const response=await fetch('http://localhost:5000/admin/getpercentage',{credentials: 'include'});
      if(response.ok){
        const data=await response.json();
        return data.percentage;
      }}catch(err){
        console.log(err);
      }};

  const closeBookingModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setSelectedTime('');
    setAvailableTimeSlots([]);
    setPlayDuration(1);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    fetchAvailableTimeSlots(date, playDuration);
  };

  const generateTimeSlots = (start, end, duration) => {
    const startTime = convertTimeStringToMinutes(start);
    const endTime = convertTimeStringToMinutes(end);
    const slots = [];

    for (let time = startTime; time + (duration * 60) <= endTime; time += 30) {
      const slotStart = convertMinutesToTimeString(time);
      slots.push(slotStart);
    }

    return slots;
  };

  const fetchAvailableTimeSlots = (date, duration) => {
    const selectedDay = new Date(date).toLocaleString('en-US', { weekday: 'long' });
    const thatdaytime=checkGroundThatDateIf();

    const selectedDayAvailability = venueData.availability.find(
      (availability) => availability.day === selectedDay
    );

    if (selectedDayAvailability) {
      const slots = [];
      selectedDayAvailability.times.forEach((timeSlot) => {
        const generatedSlots = generateTimeSlots(timeSlot.start, timeSlot.end, duration);
        slots.push(...generatedSlots);
      });
      setAvailableTimeSlots(slots);
    } else {
      setAvailableTimeSlots([]);
    }
  };

  const handleTimeSelection = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDurationChange = (event) => {
    const duration = event.target.value;
    setPlayDuration(duration);
    if (selectedDate) {
      fetchAvailableTimeSlots(selectedDate, duration);
    }
  };

  const isDateAvailable = (date) => {
    const day = new Date(date).toLocaleString('en-US', { weekday: 'long' });
    return availableDays.includes(day);
  };

  const isDisabled = (date) => {
    return isDateAvailable(date);
  };

  const convertTimeStringToMinutes = (timeString) => {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours) + 12;
    }
    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }
    return parseInt(hours) * 60 + parseInt(minutes);
  };

  const convertMinutesToTimeString = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const modifier = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = mins.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${modifier}`;
  };

    const checkGroundThatDateIf = async () => {
      if (venueData && selectedDate && venueData.groundname) {
        console.log("venueData:", venueData);
        console.log("selectedDate:", selectedDate);
        console.log("shopname:", shopname);
  
        const groundname = venueData.groundname;
        try {
          const response = await fetch('http://localhost:5000/shop/checkgroundifthatdate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ selectedDate, shopname, groundname }),
            credentials: 'include',
          });
          console.log('hi'); // Check if this logs
  
          if (response.ok) {
            const data = await response.json();
            return data;
            setalreadybookedgrounds(data);
          } else {
            const errorData = await response.json();
            console.log(errorData);
          }
        } catch (error) {
          console.log('Error during fetch:', error);
        }
      } else {
        console.log("Required data is missing. VenueData, selectedDate, or shopname is null.");
      }
    };
    const bookinghandle = async () => {
      const bookingDetails = {
          shopname: shopname, // The shop ID associated with the booking
          groundname: venueData.groundname,
          date: selectedDate,
          timeSlot: {
              start: selectedTime,
              end: calculateEndTime( selectedTime, playDuration), // Adjusted to pass the date
          },
          groundfee:pricePerHour*playDuration,
          platformfee:(pricePerHour*playDuration*platformpercentage/100),
          amountPaid: ((pricePerHour * playDuration)+(pricePerHour*playDuration*platformpercentage/100))
      };
      console.log(bookingDetails);
  
      try {
          const response = await fetch('http://localhost:5000/shop/bookground', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(bookingDetails),
              credentials: 'include',
          });
  
          if (response.ok) {
              const result = await response.json();
              alert(`Booking confirmed! ${result.message}`);
              closeBookingModal();
          } else {
              const errorData = await response.json();
              alert(`Booking failed: ${errorData.message}`);
          }
      } catch (error) {
          alert('An error occurred while booking the ground.');
      }
  };
const calculateEndTime = (startTime, duration) => {
  // Ensure the startTime is in "HH:mm" format
  const timeParts = startTime.split(':');
  if (timeParts.length !== 2) {
      console.error("Invalid time format. Expected HH:mm");
      return null; // Handle error accordingly
  }

  let hours = parseInt(timeParts[0], 10);
  let minutes = parseInt(timeParts[1], 10);

  // Check if hours and minutes are valid numbers
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      console.error("Invalid hours or minutes:", { hours, minutes });
      return null; // Handle error accordingly
  }

  // Create a Date object for the start time
  const startDate = new Date(); // Get current date
  startDate.setHours(hours, minutes, 0, 0); // Set the hours and minutes

  // Calculate the end time by adding duration in milliseconds
  const endDate = new Date(startDate.getTime() + duration * 60 * 60 * 1000); // duration in hours

  // Format the end time as HH:mm
  const endTime = endDate.toTimeString().slice(0, 5); // Returns time in HH:mm format

  console.log(`Start Time: ${startTime}, Duration: ${duration} hours, End Time: ${endTime}`); // Log to check

  return endTime; // Return the calculated end time
};

  
  
  if (loading) {
    return <div className="bp-loading">Loading Ground...</div>;
  }

  if (error) {
    return <div className="bp-error">{error}</div>;
  }

  if (!venueData) {
    return <div className="bp-no-data">No venue data available.</div>;
  }

  return (
    <div className="bp-booking-page">
      <h1 className="bp-main-title">{shopname} - {venueData.groundname}</h1>
      <div className="bp-content">
        <VenueDetails
          name={venueData.groundname}
          dimensions={venueData.grounddimensions ? `Length: ${venueData.grounddimensions.length}m, Width: ${venueData.grounddimensions.width}m` : 'No dimensions available'}
          address={address ? `Address: ${address}` : 'Address not Available'}
          image={venueData.image}
          rating={venueData.reviews ? (venueData.reviews.reduce((sum, review) => sum + review.rating, 0) / venueData.reviews.length).toFixed(1) : 'No ratings yet'}
          ratingCount={venueData.reviews ? venueData.reviews.length : 0}
          timing={venueData.availability || []}
          facilities={venueData.facilities || []}
          pricePerHour={venueData.priceperhour}
        />
        <div className="bp-side-info">
          <BookingInfo pricePerHour={venueData.priceperhour} onBookNow={openBookingModal} />
        </div>
      </div>

      {isModalOpen && (
        <div className="bp-modal">
          <div className="bp-modal-content">
            <h2 className="bp-modal-title">
              Book Now
              <span className="bp-close" onClick={closeBookingModal}>&times;</span>
            </h2>
            <label htmlFor="date">Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateSelection}
              minDate={new Date()}
              filterDate={isDisabled}
              dateFormat="yyyy/MM/dd"
              className="bp-datepicker"
            />
            <label htmlFor="duration">Select Duration (in hours):</label>
            <input
              type="number"
              min="1"
              value={playDuration}
              onChange={handleDurationChange}
            />
            <label htmlFor="time">Available Time Slots:</label>
            <select value={selectedTime} onChange={handleTimeSelection} className="bp-time-slot-dropdown">
              <option value="" disabled>Select a time slot</option>
              {availableTimeSlots.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
            <h3>Ground Price:₹{pricePerHour * playDuration}</h3>
            <h3>Platform Fee:₹{pricePerHour * playDuration*platformpercentage/100}</h3>
            <h3>Total Fee:₹{pricePerHour * playDuration+(pricePerHour * playDuration*platformpercentage/100)}</h3>
            {sessionstate && <button onClick={bookinghandle} className="bp-book-now-button">Book Now</button>}
            {!sessionstate && <a href='/login'>Please log in to book a ground.</a>}
          </div>
        </div>
      )}
    </div>
  );
};

const VenueDetails = ({ name, dimensions, address, image, rating, ratingCount, timing, facilities, pricePerHour }) => {
  return (
    <div className="bp-venue-details">
      <h2>{name}</h2>
      <img src={image} alt={`${name}`} className="bp-venue-image" />
      <p>{dimensions}</p>
      <p>{address}</p>
      <p>Price per hour: ₹{pricePerHour}</p>
      <p>Rating: {rating} ({ratingCount} reviews)</p>
      <h3>Facilities</h3>
      <ul>
        {facilities.map((facility, index) => <li key={index}>{facility}</li>)}
      </ul>
      <h3>Timing</h3>
      <ul>
        {timing.map((t, index) => (
          <li key={index}>{t.day}: {t.times.map(time => `${time.start} - ${time.end}`).join(', ')}</li>
        ))}
      </ul>
    </div>
  );
};

const BookingInfo = ({ pricePerHour, onBookNow }) => {
  return (
    <div className="bp-booking-info">
      <h3>Book Your Slot</h3>
      <p>Price per hour: ₹{pricePerHour}</p>
      <button onClick={onBookNow} className="bp-book-now-button">Book Now</button>
    </div>
  );
};

export default BookingPage;
