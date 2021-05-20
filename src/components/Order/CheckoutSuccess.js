import { useEffect } from 'react';

const CheckoutSuccess = () => {
  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem('cart-items');
    }, 1000);
  }, []);

  const url = window.location.href;
  const sessionId = new URL(url).searchParams.get('session-id');

  return <h3>CheckOut successful! {sessionId}</h3>;
};

export default CheckoutSuccess;
