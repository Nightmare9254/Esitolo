import React, { useEffect, useState } from 'react';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { useCookies } from 'react-cookie';
import { fetchFrom } from '../../../hooks/fetchFrom';
import { useLocal } from '../../../hooks/cart';

const TestCheckout = () => {
  const [cookies] = useCookies();
  const { user } = cookies;
  const stripe = useStripe();
  const [sessionId, setSessionId] = useState();
  const [success, setSuccess] = useState(false);

  const [, , , , , cartItems] = useLocal();

  const [products, setProducts] = useState([]);

  const fixedCartItems = [];
  cartItems.forEach((item) => {
    fixedCartItems.push({
      name: item.productName,
      description: 'Item from esitolo',
      images: item.image,
      amount: item.price,
      currency: 'usd',
      quantity: item.quantity,
    });
  });

  console.log(fixedCartItems);

  const changeQuantity = (e, index) => {
    setProducts(
      (products[index].quantity = Math.max(0, products[index].quantity + e))
    );
  };

  const handleSubmit = async () => {
    const body = { line_items: fixedCartItems };
    const { session } = await fetchFrom('payment/test-payment', {
      body,
    });

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  return (
    <div style={{ background: '#171717', color: '#fff' }}>
      <h2>Stripe Checkout</h2>
      <p>Testing stripe 123</p>
      {/* {products.map((product, index) => (
        <div key={index}>
          <h3>{product.name}</h3>
          <h4>Stripe Amount: {product.amount}</h4>

          <img style={{ width: '50px' }} src={product.image[0]} alt="product" />
          <button onClick={() => changeQuantity(-1, index)}>-</button>
          <span>{product.quantity}</span>
          <button onClick={() => changeQuantity(1, index)}>+</button>
        </div>
      ))} */}

      <button onClick={handleSubmit}>Start Checkout</button>
    </div>
  );
};

export default TestCheckout;
