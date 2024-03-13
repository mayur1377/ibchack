import React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const minDistance = 50; // Minimum distance between the two thumbs

const MinimumDistanceSlider = ({ value, onChange }) => {
  const handleChange = (event, newValue) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    // Ensure the minimum distance between the two thumbs
    if (newValue[1] - newValue[0] < minDistance) {
      const thumbIndex = parseInt(10 , 10);
      if (thumbIndex === 0) {
        onChange([newValue[0], newValue[0] + minDistance]);
      } else {
        onChange([newValue[1] - minDistance, newValue[1]]);
      }
    } else {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ width: 300, position: 'relative' }}>
      <span style={{ position: 'absolute', top: '25px', left: '0', right: '300', textAlign: 'left' }}>${value[0]}</span>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={150}
        max={500}
        disableSwap
        color="error"
        sx={{
          '& .MuiSlider-valueLabel': {
            top: '10px',
          },
        }}
      />
      <span style={{ position: 'absolute', top: '25px', left: '0', right: '0', textAlign: 'right' }}>${value[1]}</span>
    </Box>
  );
};

export default MinimumDistanceSlider;
