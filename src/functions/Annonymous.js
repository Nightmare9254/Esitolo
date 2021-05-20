import { useStripe } from '@stripe/react-stripe-js';
import { useLocal } from '../hooks/cart';
import { Link } from 'react-router-dom';
import { fetchFrom } from '../hooks/fetchFrom';

const Annonymous = () => {
  const [, , , , , cartItems] = useLocal();
  const stripe = useStripe();

  const fixedCartItems = [];
  cartItems.forEach((item) => {
    fixedCartItems.push({
      name: item.productName,
      description: 'Item from esitolo',
      images: item.image,
      amount: item.price * 100,
      currency: 'usd',
      quantity: item.quantity,
    });
  });

  const handleSubmit = async () => {
    const body = { line_items: fixedCartItems };
    const { session } = await fetchFrom('payment/anon', {
      body,
    });

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  return (
    <Link to="/basket/pay-now" className="order__btn" onClick={handleSubmit}>
      Pay now
    </Link>
  );
};

export default Annonymous;
