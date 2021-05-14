import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
} from '@stripe/react-stripe-js';
import { useElements } from '@stripe/react-stripe-js';
import { useCookies } from 'react-cookie';
import { useLocal } from '../../hooks/cart';

const StripeTest = () => {
  const elements = useElements();
  const stripe = useStripe();

  const [cookies] = useCookies();
  const { user } = cookies;

  const [, , calculate, , ,] = useLocal();
  const totalToPay = calculate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!elements || !stripe) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    console.log(paymentMethod);
    if (error) {
      console.log(error);
    } else {
      console.log(paymentMethod);
    }
    fetch('/payment/instance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        const payload = stripe.confirmCardPayment(json.clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });
      });
  };

  return (
    <div>
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

export default StripeTest;
