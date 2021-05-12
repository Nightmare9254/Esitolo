import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './stylesheets/css/main.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

(async () => {
  const stripeKey = loadStripe(
    'pk_test_51HsQd3GcgNCxlQIE46SF2RyIfDLdqWlrAUhLgK0Dr3kHFlq8seUgRu7GWkXDBA0DtJIfkMS8DXhducML1EIqRq7t00WeClg7Gw'
  );
  ReactDOM.render(
    <Elements stripe={stripeKey}>
      <App />
    </Elements>,
    document.getElementById('root')
  );
})();
