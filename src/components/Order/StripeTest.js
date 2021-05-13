import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
} from '@stripe/react-stripe-js';
import { useElements } from '@stripe/react-stripe-js';
import { useCookies } from 'react-cookie';

const StripeTest = () => {
  const elements = useElements();
  const stripe = useStripe();

  const [cookies] = useCookies();
  const { user } = cookies;

  console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!elements || !stripe) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      console.log(paymentMethod);
    }
    fetch('https://esitolo-backend.herokuapp.com/payment/instance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethod: paymentMethod,
        stripeUserId: 'cus_JTZ6ggbzNj977t',
        userData: {
          name: user.name,
          email: user.email,
          address_city: user.shippingAddress.city,
          address_street: user.shippingAddress.street,
          address_apartment: user.shippingAddress.apartment,
          address_zpiCode: user.shippingAddress.zipCode,
          phone: user.shippingAddress.phone,
        },
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const payload = stripe.confirmCardPayment(json.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          PAY
        </button>
      </form>
    </div>
  );
};

export default StripeTest;
