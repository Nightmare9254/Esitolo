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

  useEffect(() => {
    cartItems.map((item) => {
      setProducts([
        {
          name: item.productName,
          description: 'Item from esitolo',
          images: item.image,
          amount: 899,
          currency: 'usd',
          quantity: item.quantity,
        },
      ]);
      return products;
    });
  }, []);

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
  };

  return (
    <div style={{ background: '#171717', color: '#fff' }}>
      <h2>Stripe Checkout</h2>
      <p>Testing stripe 123</p>
      {products.map((product, index) => (
        <div key={index}>
          <h3>{product.name}</h3>
          <h4>Stripe Amount: {product.amount}</h4>

          <img src={product.images[0]} alt="product" />
          <button onClick={() => changeQuantity(-1, index)}>-</button>
          <span>{product.quantity}</span>
          <button onClick={() => changeQuantity(1, index)}>+</button>
        </div>
      ))}

      <button onClick={handleSubmit} disabled={cartItems[0].quantity < 1}>
        Start Checkout
      </button>
    </div>
  );
};

export default TestCheckout;
