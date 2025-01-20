import { Box, Typography } from '@mui/material';
import React from 'react';

const Home = () => {
  return (
    <Box 
      flex={1} 
      overflow={'auto'} 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh"
      bgcolor="#f9f9f9"
    >
      <Typography 
        variant="h4" 
        align="center" 
        color="primary" 
        fontWeight="bold"
      >
        Welcome to the Employee Management System
      </Typography>
    </Box>
  );
};

export default Home;
