import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import Header from './Header/Header';
import Body from './Body/Body';

function App() {
  return (
    <Box className="app">
      <Header/>
      <Body/>
    </Box>
  );
}

export default App;
