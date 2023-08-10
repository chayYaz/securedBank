import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the ReactDOM library for rendering components
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"; // Import the BrowserRouter from react-router-dom for routing
 
// Create a root element for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within the BrowserRouter
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
