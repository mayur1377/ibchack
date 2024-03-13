import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Dropdown } from 'rsuite';
import MinimumDistanceSlider from './MinimumDistanceSlider'; // Assuming you have this file
import './datafetch.css';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import image1 from './1.png';
import image2 from './2.png';
import image3 from './3.png';
import image4 from './4.png';

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
 
//  write handle api function 
const handleSubmit = () => {
  setLoading(true);
  // Show loading message for 2 seconds
  setTimeout(() => {
    setLoading(false);
    fetch('http://localhost:5000/api/v1/sabre/bundles-catalogue', {
      method: 'POST',
      body: JSON.stringify(userInputs),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('API response:', data);
      setApiResponse(data); // Set the API response here
    })
    .catch(error => {
      console.error('API error:', error);
    });
  }, 2000);
};

 const imagesdata = [image1, image2, image3, image4];
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
         <MenuItem value="city a">CITY X</MenuItem>
         <MenuItem value="city b">CITY Y</MenuItem>
         <MenuItem value="city c">CITY Z</MenuItem>
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
       <input type="checkbox" id="breakfast" name="breakfast" checked={userInputs.breakfast} onChange={handleInputChange} />
        <label htmlFor="breakfast">Breakfast</label>
      <input type="checkbox" id="laundry" name="laundry" checked={userInputs.laundry} onChange={handleInputChange} />
        <label htmlFor="laundry">Laundry</label>
     </div> 
 
     <br></br>
 
     {loading ? (
      <p>Hold tight, we're finding the best deals for you...</p>
     ) : (
       <button onClick={handleSubmit} style={{ backgroundColor: '#e50000', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Submit</button>
     )}
 
 {apiResponse && (
  <div className="package-list">
    {Object.keys(apiResponse.packages).map((key, index) => {
      const packageData = apiResponse.packages[key];
      return (
        <div key={key} className={`package-box ${index % 2 === 0 ? 'highlight' : ''}`}>
          <div className="image-container">
            <img src={imagesdata[index]} alt={`Hotel ${index + 1}`} style={{ height: '380px', width: '380px' }} />
          </div>
          <div className="details-container">
            <h3 className="title">Name: {packageData.property.name}</h3>
            <p className="highlight">Location: {packageData.property.location.address}</p>
            <p className="highlight">Room Type: {packageData.room.type}</p>
            <p className="highlight">Amenities:</p>
            <ul>
              {packageData.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
            <p className="highlight">Total Amount: {packageData.totalAmount}</p>
            <p className="highlight">Discount: {packageData.Discount}</p>
            <p className="highlight">Net Amount: {packageData.NetAmount}</p>
          </div>
        </div>
      );
    })}
  </div>
)}







 
   </div>
 );
};
 
export default DataFetcher;
 