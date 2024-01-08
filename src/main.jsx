// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { ThemeProvider, createMuiTheme } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/storage';
import { Provider } from 'react-redux';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Lexend', 'sans-serif'
    ].join(','),
  }
});

if (process.env.NODE_ENV === 'production') {
  console.log = function() {};
  console.warn = function() {};
  console.error = function() {};
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
    <ToastContainer
      position='top-right'
      autoClose={4000}
      pauseOnHover />
  </BrowserRouter>
)