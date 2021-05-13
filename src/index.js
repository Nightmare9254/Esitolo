import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './stylesheets/css/main.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

(async () => {
  const { REACT_APP_PK_STRIPE } = process.env;

  const stripeKey = loadStripe(REACT_APP_PK_STRIPE);
  ReactDOM.render(
    <Elements stripe={stripeKey}>
      <App />
    </Elements>,
    document.getElementById('root')
  );
})();
