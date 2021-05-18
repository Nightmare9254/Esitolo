import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useElements } from '@stripe/react-stripe-js';
import { useCookies } from 'react-cookie';
import { useLocal } from '../../hooks/cart';
import { Link } from 'react-router-dom';
import { fetchFrom } from '../../hooks/fetchFrom';
import { useHistory } from 'react-router-dom';

const Payment = () => {
  const elements = useElements();
  const stripe = useStripe();
  const [cookies] = useCookies();
  const { user } = cookies;
  const [, , calculate, , , cartItems] = useLocal();
  const history = useHistory();

  const [cardSetup, setCardSetup] = useState();
  const [wallet, setWallet] = useState([]);
  const [paymentIntent, setPaymentIntent] = useState();
  const [showCard, setShowCard] = useState(false);
  const [cardId, setCardId] = useState(0);

  const totalToPay = calculate();
  useEffect(() => {
    getCard();
  }, []);

  const setupNewCard = async () => {
    const body = { stripeUserId: user.stripeUserId };
    const intent = await fetchFrom('payment/attach-card', {
      body,
    });
    setCardSetup(intent);
  };

  const getCard = async () => {
    const body = { stripeUserId: user.stripeUserId };
    if (user) {
      const creditCards = await fetchFrom('payment/get-cards', {
        body,
      });
      setWallet(creditCards);
    }
  };

  const handleSubmitCard = async (e) => {
    e.preventDefault();

    if (!elements || !stripe) return;

    const cardElement = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardSetup(
      cardSetup.client_secret,
      {
        payment_method: { card: cardElement },
      }
    );

    if (error) {
      console.log(error);
      return;
    }

    setCardSetup(paymentIntent);
    await getCard();
  };

  const handlePaymentIntent = async (e) => {
    e.preventDefault();

    const { paymentIntent } = await fetchFrom('payment/payment-intent', {
      body: {
        amount: (totalToPay * 100).toFixed(0),
        stripeUserId: user.stripeUserId,
      },
    });

    setPaymentIntent(paymentIntent.client_secret);
  };

  const handleSubmitPayment = async (e, index) => {
    e.preventDefault();

    if (!stripe && !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { paymentIntent: paymentStatus, error } =
      await stripe.confirmCardPayment(paymentIntent, {
        // payment_method: { card: cardElement },
        payment_method: wallet[cardId].id,
      });

    setPaymentIntent(paymentStatus.status);
  };

  if (paymentIntent === 'succeeded') {
    history.push('/');
    localStorage.removeItem('cart-items');
  }

  return (
    <div>
      <Link to="/">Back to main</Link>
      <section>
        <h2>Add new Payment Mehod</h2>

        <button onClick={setupNewCard}>Attach New Credit Card</button>

        {!showCard && (
          <form
            onSubmit={handleSubmitCard}
            hidden={!cardSetup || paymentIntent === 'succeeded'}
          >
            <p>Credit Card Information</p>
            <p>
              Normal Card: <code>4242424242424242</code>
            </p>
            <p>
              3D Secure Card: <code>4000002500003155</code>
            </p>

            <hr />

            <CardElement />
            <button type="submit">Attach</button>
          </form>
        )}
      </section>
      <section>
        <h2>Choose payment Method</h2>
        <select onChange={(e) => setCardId(e.target.value)}>
          {wallet.map(({ card }, index) => (
            <option value={index} key={index}>
              {card.brand} **** **** **** {card.last4} expires {card.exp_month}/
              {card.exp_year}
            </option>
          ))}
        </select>
      </section>
      <section>
        <form onSubmit={handlePaymentIntent}>
          <button
            type="submit"
            disabled={!stripe}
            onClick={() => setShowCard(true)}
          >
            Ready to Pay {totalToPay}$
          </button>
        </form>

        {paymentIntent && (
          <div>
            <button onClick={handleSubmitPayment}>PAY NOW</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Payment;

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!elements || !stripe) return;

//   const cardElement = elements.getElement(CardElement);

//   const { error, paymentMethod } = await stripe.createPaymentMethod({
//     type: 'card',
//     card: cardElement,
//   });

//   const userPayment = () => {
//     if (user) {
//       return {
//         paymentMethod: paymentMethod,
//         stripeUserId: user.stripeUserId,
//         userData: {
//           name: user.name,
//           email: user.email,
//           address_city: user.shippingAddress.city,
//           address_street: user.shippingAddress.street,
//           address_apartment: user.shippingAddress.apartment,
//           address_zipCode: user.shippingAddress.zipCode,
//           address_state: user.shippingAddress.state,
//           phone: user.shippingAddress.phone,
//         },
//         itemsPrice: totalToPay * 100,
//       };
//     }
//     return {
//       annonymus: true,
//       paymentMethod: paymentMethod,
//       userData: JSON.parse(localStorage.getItem('anonymous-adress')),
//       itemsPrice: totalToPay * 100,
//     };
//   };

//   const createOrder = () => {
//     if (user) {
//       return {
//         userId: user.id,
//         shippingAddress: user.shippingAddress,
//         items: cartItems,
//         price: totalToPay,
//       };
//     }
//     return {
//       shippingAddress: JSON.parse(localStorage.getItem('anonymous-adress')),
//       items: cartItems,
//       price: totalToPay,
//     };
//   };

//   const order = createOrder();

//   fetch('/payment/new-order', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(order),
//   })
// };
