import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { fetchFrom } from '../../../hooks/fetchFrom';
import { useLocal } from '../../../hooks/cart';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

//stripe listen --forward-to localhost://8000

const TestPaymentIntent = () => {
  const [cookies] = useCookies();
  const { user } = cookies;

  const stripe = useStripe();
  const elements = useElements();

  const [paymentIntentCS, setPaymentIntentCS] = useState();
  const [responseStripe, setResponseStripe] = useState();

  const [, , calculate, , cartItems] = useLocal();
  const total = calculate(cartItems);

  const handleIntent = async (e) => {
    const { paymentIntent } = await fetchFrom('payment/test-payment-intent', {
      body: { amount: total * 100 },
    });

    setPaymentIntentCS(paymentIntent.client_secret);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe && !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      paymentIntentCS,
      {
        payment_method: { card: cardElement },
      }
    );

    if (error) {
      console.log(error);
      error.payment_intent && setPaymentIntentCS(error.payment_intent);
    } else {
      console.log(paymentIntent);
    }
  };

  return (
    <div>
      <h3>Payment intent</h3>
      <p>Total to pay {total}$</p>
      <h4>3d card</h4>
      <p>4000 0025 0000 3155</p>
      <button type="button" onClick={handleIntent}>
        Pay total of ${total}
      </button>

      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default TestPaymentIntent;
