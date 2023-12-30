// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { ThemeProvider, createMuiTheme } from '@mui/material/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Lexend', 'sans-serif'
    ].join(','),
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    <ToastContainer
      position='top-right'
      autoClose={4000}
      pauseOnHover />
  </BrowserRouter>
)