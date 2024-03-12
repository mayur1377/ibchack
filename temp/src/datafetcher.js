import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import MinimumDistanceSlider from './MinimumDistanceSlider'; // Assuming you have this file
import './datafetch.css';

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

  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

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
    //   setApiResponse(data); // Set the API response here
    //   setLoading(false);
    // })
    // .catch(error => {
    //   console.error('API error:', error);
    //   setLoading(false);
    // });
    // For demo purposes, simulate API call completion after 2 seconds
    setTimeout(() => {
      setLoading(false);
      // Example API response format
      const apiResponse = {
        property: {
          propertyId: 4499,
          name: "XYZ Villa",
          location: {
            address: "City X",
            latitude: "12.3456",
            longitude: "-98.7654",
          },
        },
        room: {
          type: "Standard",
          numberOfRooms: 2,
        },
        amenities: [
          "breakfast",
          "laundry",
          "shuttleService",
          "spa",
          "eventPlanning",
          "fitnessCentre",
        ],
        totalAmount: 315,
        Discount: 24,
        NetAmount: 291,
      };
      setApiResponse(apiResponse);
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

      <br></br>

      {loading ? (
        <p>Submitting data and making an API call...</p>
      ) : (
        <button onClick={handleSubmit} style={{ backgroundColor: '#e50000', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Submit</button>
      )}

      {/* Display API response */}
      {apiResponse && (
        <div>
          <h2>API Response</h2>
          <p>Property ID: {apiResponse.property.propertyId}</p>
          <p>Name: {apiResponse.property.name}</p>
          <p>Location: {apiResponse.property.location.address}</p>
          <p>Room Type: {apiResponse.room.type}</p>
          <p>Number of Rooms: {apiResponse.room.numberOfRooms}</p>
          <p>Total Amount: {apiResponse.totalAmount}</p>
          <p>Discount: {apiResponse.Discount}</p>
          <p>Net Amount: {apiResponse.NetAmount}</p>
          <p>Amenities: {apiResponse.amenities.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default DataFetcher;
