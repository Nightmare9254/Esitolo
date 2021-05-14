import React, { useEffect, useState } from 'react';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { useCookies } from 'react-cookie';
import { fetchFrom } from '../../hooks/fetchFrom';

const TestCheckout = () => {
  const [cookies] = useCookies();
  const { user } = cookies;
  const stripe = useStripe();
  const [sessionId, setSessionId] = useState();
  const [success, setSuccess] = useState(false);

  const [products, setProducts] = useState([
    {
      name: 'Hat',
      description: 'Pug hat. A hat your pug will love.',
      images: [
        'https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      ],
      amount: 799,
      currency: 'usd',
      quantity: 3,
    },
    {
      name: 'Cakrty',
      description: 'Pudsad',
      images: [
        'https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      ],
      amount: 799,
      currency: 'usd',
      quantity: 2,
    },
  ]);

  const changeQuantity = (e, index) => {
    setProducts(
      (products[index].quantity = Math.max(0, products[index].quantity + e))
    );
  };

  const handleSubmit = async () => {
    const body = { line_items: products };
    const { session } = await fetchFrom('payment/test-payment', {
      body,
    });

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    fetch('/payment/test-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => {
        setSuccess(true);
        setSessionId(json.session.id);
      });

    if (success) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    }
  };

  return (
    <div style={{ background: '#171717', color: '#fff' }}>
      <h2>Stripe Checkout</h2>
      <p>
        Shopping-cart scenario. Change the quantity of the products below, then
        click checkout to open the Stripe Checkout window.
      </p>
      {products.map((product, index) => (
        <div key={index}>
          <h3>{product.name}</h3>
          <h4>Stripe Amount: {product.amount}</h4>

          <img src={product.images[0]} width="250px" alt="product" />
          <button
            className="btn btn-sm btn-warning"
            onClick={() => changeQuantity(-1, index)}
          >
            -
          </button>
          <span style={{ margin: '20px', fontSize: '2em' }}>
            {product.quantity}
          </span>
          <button
            className="btn btn-sm btn-success"
            onClick={() => changeQuantity(1, index)}
          >
            +
          </button>
        </div>
      ))}

      <button onClick={handleSubmit} disabled={products[0].quantity < 1}>
        Start Checkout
      </button>
    </div>
  );
};

export const CheckoutSuccess = () => {
  const url = window.location.href;
  const sessionId = new URL(url).searchParams.get('session-id');
  return <h3>CheckOut successful! {sessionId}</h3>;
};

export function CheckoutFail() {
  return <h3>Checkout failed!</h3>;
}

export default TestCheckout;
