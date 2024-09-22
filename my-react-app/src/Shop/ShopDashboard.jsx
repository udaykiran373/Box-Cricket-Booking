import React, { useState,useEffect,useRef } from 'react';
import './ShopDashboard.css';
import { useNavigate } from 'react-router-dom';

const ShopDashboard = () => {
    const effectRan = useRef(false);
    const [state, setState] = useState({});   
    const [daysPerWeek, setDaysPerWeek] = useState(0);   
    const [daysArray, setDaysArray] = useState([]);  
    const [timesArray, setTimesArray] = useState([]); 
    const [grounds, setGrounds] = useState([]); 
    const navigate = useNavigate();
  useEffect(() => {
    if (effectRan.current === false){
    const checkShopSession = async () => {
        try {
            const response = await fetch('http://localhost:5000/shop/checkshopsession', {
                credentials: 'include'
            });
            if (!response.ok) {
                navigate('/shoplogin');
            } else {
                const data = await response.json();
                console.log('Shop Data:', data);
                setState(data.shop);
                setGrounds(data.shop.grounds || []);
            }
        } catch (error) {
            console.error('Error fetching shop session:', error);
            alert('An error occurred while fetching shop session.');
        }
    };

    checkShopSession();
    effectRan.current = true;
  }return () => {
    effectRan.current = true; // Cleanup
  };
}, [navigate]);
const updatesubmit = async (e) => {
    e.preventDefault();
    const { shopname, address } = e.target.elements;

    try {
        const response = await fetch('http://localhost:5000/shop/updateshop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                shopname: shopname.value,
                address: address.value
            }),
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            setState(data.updatedShop);
            alert('Shop details updated successfully');
        } else {
            const error = await response.json();
            alert('Update failed: ${error.msg}');
        }
    } catch (error) {
        console.error('Error updating shop details:', error);
        alert('An error occurred while updating shop details.');
    }
};


  // Handle change for the days per week input
  const handleDaysPerWeekChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setDaysPerWeek(value);
    setDaysArray(Array(value).fill(''));
    setTimesArray(Array(value).fill({ start: '', end: '' }));
  };

  // Handle change for each day selection
  const handleDayChange = (index, value) => {
    const updatedDays = [...daysArray];
    updatedDays[index] = value;
    setDaysArray(updatedDays);
  };

  // Handle change for each time selection
  const handleTimeChange = (index, type, value) => {
    const updatedTimes = [...timesArray];
    updatedTimes[index] = { ...updatedTimes[index], [type]: value };
    setTimesArray(updatedTimes);
  };

  // Generate day options
  const generateDayOptions = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days.map((day, index) => (
      <option key={index} value={day}>
        {day}
      </option>
    ));
  };

  // Add ground function with image upload
  const addGround = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form); // Use FormData to handle file upload

    const availability = daysArray.map((day, index) => ({
        day,
        times: [{ start: timesArray[index].start, end: timesArray[index].end }]
    }));
    formData.append('availability', JSON.stringify(availability));

    try {
        
        const response = await fetch('http://localhost:5000/shop/addground', {
            method: 'POST',
            body: formData, // Send FormData directly
            credentials: 'include'
        });

        if (response.ok) {
            const updatedData = await response.json();
            console.log('Updated Grounds Data:', updatedData);
            setGrounds(updatedData.shop.grounds);
            alert('Ground added successfully!');
            form.reset();
            setDaysPerWeek(0);
            setDaysArray([]);
            setTimesArray([]);
        } else {
            const error = await response.json();
            alert(`Error adding ground: ${error.msg}`);
        }
    } catch (error) {
        console.error('Error adding ground:', error);
        alert('An error occurred while adding the ground.');
    }
};


  return (

        <div className="sd-shop-dashboard">
            <h1 className="sd-title">Shop Dashboard</h1>
            <h3 className="sd-email">Email: {state.email}</h3>
            <h3 className="sd-owner">Owner Name: {state.owner}</h3>
            
            <form className="sd-update-form" onSubmit={updatesubmit}>
                <label className="sd-label" htmlFor="shopname">Shop Name:</label>
                <input
                    className="sd-input"
                    type="text"
                    name="shopname"
                    id="shopname"
                    placeholder="Shop Name"
                    defaultValue={state.shopname}
                    required
                />
                <label className="sd-label" htmlFor="address">Address:</label>
                <input
                    className="sd-input"
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address"
                    defaultValue={state.address}
                    required
                />
                <button className="sd-button" type="submit">Update Shop Details</button>
            </form>
            
      <h1 className="sd-title">Shop Dashboard</h1>
      <form className="sd-add-ground-form" onSubmit={addGround}>
    <label className="sd-label" htmlFor="groundname">Ground Name:</label>
    <input className="sd-input" type="text" name="groundname" id="groundname" placeholder="Ground Name" required />

    <label className="sd-label" htmlFor="priceperhour">Price Per Hour:</label>
    <input className="sd-input" type="number" name="priceperhour" id="priceperhour" placeholder="Price Per Hour" required />

    <label className="sd-label" htmlFor="maxplayers">Maximum Number of Players:</label>
    <input className="sd-input" type="number" name="maxplayers" id="maxplayers" placeholder="Maximum Number Of Players" required />

    <label className="sd-label" htmlFor="groundLength">Ground Length (meters):</label>
    <input className="sd-input" type="number" name="groundLength" id="groundLength" placeholder="Ground Length (meters)" required />

    <label className="sd-label" htmlFor="groundwidth">Ground Width (meters):</label>
    <input className="sd-input" type="number" name="groundwidth" id="groundwidth" placeholder="Ground Width (meters)" required />

    <label className="sd-label" htmlFor="facilities">Facilities Available:</label>
    <input className="sd-input" type="text" name="facilities" id="facilities" placeholder="Facilities Available" required />

    <label className="sd-label" htmlFor="surfaceType">Surface Type:</label>
    <select className="sd-select" name="surfaceType" id="surfaceType" required>
        <option value="Grass">Grass</option>
        <option value="Turf">Turf</option>
        <option value="Clay">Clay</option>
        <option value="Hard">Hard</option>
        <option value="Synthetic">Synthetic</option>
    </select>

    <label className="sd-label" htmlFor="image">Upload Ground Image:</label>
    <input className="sd-input" type="file" name="image" id="image" accept="image/*" required />

    <label className="sd-label" htmlFor="daysperweek">Days Available Per Week:</label>
    <input
        className="sd-input"
        type="number"
        name="daysperweek"
        id="daysperweek"
        placeholder="Days Per Week"
        required
        value={daysPerWeek}
        onChange={handleDaysPerWeekChange}
    />

    {Array.from({ length: daysPerWeek }).map((_, index) => (
        <div key={index} className="sd-day-container">
            <label className="sd-label" htmlFor={`day-${index}`}>Day:</label>
            <select
                className="sd-select"
                name={`day-${index}`}
                id={`day-${index}`}
                value={daysArray[index] || ''}
                onChange={(e) => handleDayChange(index, e.target.value)}
                required
            >
                <option value="" disabled>Select Day</option>
                {generateDayOptions()}
            </select>

            <label className="sd-label" htmlFor={`start-time-${index}`}>Start Time:</label>
            <input
                className="sd-input"
                type="time"
                name={`start-time-${index}`}
                id={`start-time-${index}`}
                value={timesArray[index]?.start || ''}
                onChange={(e) => handleTimeChange(index, 'start', e.target.value)}
                required
            />

            <label className="sd-label" htmlFor={`end-time-${index}`}>End Time:</label>
            <input
                className="sd-input"
                type="time"
                name={`end-time-${index}`}
                id={`end-time-${index}`}
                value={timesArray[index]?.end || ''}
                onChange={(e) => handleTimeChange(index, 'end', e.target.value)}
                required
            />
        </div>
    ))}

    <button className="sd-button" type="submit">Add Ground</button>
</form>

      <div className="sd-grounds-list">
        <h2 className="sd-subtitle">Available Grounds</h2>
        {grounds.length > 0 ? (
          <ul className="sd-ground-list">
            {grounds.map((ground, index) => (
              <li key={index} className="sd-ground-item">
                <h3>{ground.groundname}</h3>
                <p>Price Per Hour: {ground.priceperhour}</p>
                <p>Max Players: {ground.maxplayers}</p>
                <p>Ground Dimensions: {ground.grounddimensions.length} x {ground.grounddimensions.width} meters</p>
                <p>Facilities: {ground.facilities.join(', ')}</p>
                <p>Surface Type: {ground.surfacetype}</p>
                <img src={ground.image} alt={ground.groundname} className="sd-ground-image" />
                <p>Status: {ground.status}</p>
                <p>Verification: {ground.verify ? 'Verified' : 'Not Verified'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No grounds available yet.</p>
        )}
      </div>
    </div>
  );
};

export default ShopDashboard;
