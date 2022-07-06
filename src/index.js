import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {  ThemeProvider } from '@mui/material/styles';
import theme from '../src/Theme/Theme';
import { BrowserRouter as Router } from 'react-router-dom';
// import 'react-data-table-component-extensions/dist/index.css';
import store from './Store';
import { Provider } from 'react-redux';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </Provider>
    </Router>
  </React.StrictMode>
);

