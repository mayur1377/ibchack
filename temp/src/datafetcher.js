import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Dropdown } from 'rsuite';
import MinimumDistanceSlider from './MinimumDistanceSlider'; // Assuming you have this file
import './datafetch.css';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const minDistance = 10;

const DataFetcher = () => {
  const [userInputs, setUserInputs] = useState({
    location: '',
    priceRange: [150, 500],
    dates: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
    numAdults: 1,
    numChildren: 0,
    numRooms: 1,
    wifi: false,
    pool: false,
    gym: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setUserInputs({
      ...userInputs,
      [name]: inputValue,
    });
  };

  const handleDateChange = (ranges) => {
    setUserInputs({
      ...userInputs,
      dates: {
        ...userInputs.dates,
        ...ranges.selection,
      },
    });
  };

  const handleIncrement = (field) => {
    setUserInputs({
      ...userInputs,
      [field]: userInputs[field] + 1,
    });
  };

  const handleDecrement = (field) => {
    setUserInputs({
      ...userInputs,
      [field]: Math.max(userInputs[field] - 1, 0),
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    // Make API call using userInputs
    // Example: fetch('https://api.example.com/endpoint', {
    //   method: 'POST',
    //   body: JSON.stringify(userInputs),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('API response:', data);
    //   setLoading(false);
    // })
    // .catch(error => {
    //   console.error('API error:', error);
    //   setLoading(false);
    // });
    // For demo purposes, simulate API call completion after 2 seconds
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <div className='datafetch'>
      <FormControl fullWidth>
        <InputLabel>Select Location</InputLabel>
        <br></br>
        <Select
          name="location"
          value={userInputs.location}
          onChange={handleInputChange}
          required
        >
          <MenuItem value="">Select a location</MenuItem>
          <MenuItem value="city a">CITY a</MenuItem>
          <MenuItem value="city b">CITY b</MenuItem>
          <MenuItem value="city c">CITY c</MenuItem>
        </Select>
      </FormControl>
    

      <h3>Select Price Range</h3>
      <MinimumDistanceSlider value={userInputs.priceRange} onChange={(value) => setUserInputs({ ...userInputs, priceRange: value })} />

      <h3>Select Dates</h3>
      <DateRangePicker
        ranges={[userInputs.dates]}
        onChange={handleDateChange}
        color="secondary"
      />
<div className="numberfetch">
  <h3>Enter Number of Adults</h3>
  <div className="button-container">
    <button onClick={() => setUserInputs({...userInputs, numAdults: Math.max(0, userInputs.numAdults - 1)})}>-</button>
    <input type="number" name="numAdults" value={userInputs.numAdults} onChange={handleInputChange} required />
    <button onClick={() => setUserInputs({...userInputs, numAdults: userInputs.numAdults + 1})}>+</button>
  </div>

  <h3>Enter Number of Children</h3>
  <div className="button-container">
    <button onClick={() => setUserInputs({...userInputs, numChildren: Math.max(0, userInputs.numChildren - 1)})}>-</button>
    <input type="number" name="numChildren" value={userInputs.numChildren} onChange={handleInputChange} required />
    <button onClick={() => setUserInputs({...userInputs, numChildren: userInputs.numChildren + 1})}>+</button>
  </div>

  <h3>Enter Number of Rooms</h3>
  <div className="button-container">
    <button onClick={() => setUserInputs({...userInputs, numRooms: Math.max(0, userInputs.numRooms - 1)})}>-</button>
    <input type="number" name="numRooms" value={userInputs.numRooms} onChange={handleInputChange} required />
    <button onClick={() => setUserInputs({...userInputs, numRooms: userInputs.numRooms + 1})}>+</button>
  </div>
</div>

      <div className="amenities">
        <h3>Select Amenities</h3>
        <input type="checkbox" id="wifi" name="wifi" checked={userInputs.wifi} onChange={handleInputChange} />
        <label htmlFor="wifi">Wifi</label>
        <input type="checkbox" id="pool" name="pool" checked={userInputs.pool} onChange={handleInputChange} />
        <label htmlFor="pool">Pool</label>
        <input type="checkbox" id="gym" name="gym" checked={userInputs.gym} onChange={handleInputChange} />
        <label htmlFor="gym">Gym</label>
      </div>  

      <br></br>

      {loading ? (
        <p>Submitting data and making an API call...</p>
      ) : (
        <button onClick={handleSubmit} style={{ backgroundColor: '#e50000', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Submit</button>
      )}

      {/* Display submitted options */}
      {submitted && (
        <div>
          <h2>Submitted Options</h2>
          <p>Location: {userInputs.location}</p>
          <p>Price Range: ${userInputs.priceRange[0]} - ${userInputs.priceRange[1]}</p>
          <p>Dates: {userInputs.dates.startDate.toDateString()} - {userInputs.dates.endDate.toDateString()}</p>
          <p>Number of Adults: {userInputs.numAdults}</p>
          <p>Number of Children: {userInputs.numChildren}</p>
          <p>Number of Rooms: {userInputs.numRooms}</p>
          <p>Selected Amenities:
            {userInputs.wifi && <span>Wifi</span>}
            {userInputs.pool && <span>Pool</span>}
            {userInputs.gym && <span>Gym</span>}
          </p>
        </div>
      )}
    </div>
  );
};

export default DataFetcher;
