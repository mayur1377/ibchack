import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import logo from './logo.png'; // Import the logo image

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#e50000' }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          <img src={logo} alt="Hotel Logo" style={{ height: '80px', width: '80px' }} />
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1400px' }}>
        <Typography variant="body1" sx={{ color: 'white', marginLeft: '10px', fontWeight: 'bold' }}>
        Hello Mayur!
        </Typography>

          <IconButton>
            <Avatar alt="User Avatar" src="/path/to/dummy/avatar.jpg" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
