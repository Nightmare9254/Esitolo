import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useElements } from '@stripe/react-stripe-js';
import { useCookies } from 'react-cookie';
import { useLocal } from '../../hooks/cart';
import { Link } from 'react-router-dom';

const Payment = () => {
  const elements = useElements();
  const stripe = useStripe();
  const [paymentStatus, setPaymentStatus] = useState();

  const [cookies] = useCookies();
  const { user } = cookies;

  const [, , calculate, , , cartItems] = useLocal();

  const totalToPay = calculate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!elements || !stripe) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    const userPayment = () => {
      if (user) {
        return {
          paymentMethod: paymentMethod,
          stripeUserId: user.stripeUserId,
          userData: {
            name: user.name,
            email: user.email,
            address_city: user.shippingAddress.city,
            address_street: user.shippingAddress.street,
            address_apartment: user.shippingAddress.apartment,
            address_zipCode: user.shippingAddress.zipCode,
            address_state: user.shippingAddress.state,
            phone: user.shippingAddress.phone,
          },
          itemsPrice: totalToPay * 100,
        };
      }
      return {
        annonymus: true,
        paymentMethod: paymentMethod,
        userData: JSON.parse(localStorage.getItem('anonymous-adress')),
        itemsPrice: totalToPay * 100,
      };
    };

    fetch('https://esitolo-backend.herokuapp.com/payment/instance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userPayment()),
    })
      .then((res) => res.json())
      .then((json) => {
        const payload = stripe.confirmCardPayment(json.clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });
      });

    const createOrder = () => {
      if (user) {
        return {
          userId: user.id,
          shippingAddress: user.shippingAddress,
          items: cartItems,
          price: totalToPay,
        };
      }
      return {
        shippingAddress: JSON.parse(localStorage.getItem('anonymous-adress')),
        items: cartItems,
        price: totalToPay,
      };
    };

    const order = createOrder();

    fetch('https://esitolo-backend.herokuapp.com/payment/new-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    }).then(() => {
      localStorage.removeItem('cart-items');
    });
  };

  return (
    <div>
      <Link to="/">Back to main</Link>
      <form onSubmit={handleSubmit}>
        <p style={{ fontSize: '20px' }}>To pay: {totalToPay}$</p>
        <CardElement />

        <br />
        <button type="submit" disabled={!stripe}>
          PAY
        </button>
      </form>
      <br />
      {/* <form onSubmit={updatePayment}>
        <h1>defaul payment</h1>
        <CardElement />
        <button type="submit">ADD DEFAULTPAYMENT</button>
      </form> */}
    </div>
  );
};

export default Payment;
