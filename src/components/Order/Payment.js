import {
  CardElement,
  CardCvcElement,
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
import HeaderTitle from '../SingleComponents/HeaderTitle';

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
  const [payFrom, setPayfrom] = useState();

  const [attached, setAttached] = useState(false);

  const totalToPay = calculate() * 0.95;

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

    const cardElement = elements.getElement(CardNumberElement);

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

  const choosePayment = (argument) => {
    const cardElement = elements.getElement(CardNumberElement);

    if (argument === 0) {
      return {
        payment_method: { card: cardElement },
      };
    }
    return {
      payment_method: wallet[cardId].id,
    };
  };

  const handleSubmitPayment = async (e, index) => {
    e.preventDefault();

    if (!stripe && !elements) return;

    const { paymentIntent: paymentStatus, error } =
      await stripe.confirmCardPayment(paymentIntent, choosePayment(payFrom));

    setPaymentIntent(paymentStatus.status);
  };

  if (paymentIntent === 'succeeded') {
    history.push('/');
    localStorage.removeItem('cart-items');
  }

  const style = {
    base: {
      backgroundColor: '#23252f',
      color: '#fff',
    },
  };

  return (
    <div className="payment">
      <HeaderTitle title="Payment" />
      <section className="payment__attach">
        <h2 className="payment__heading">Add new Payment Mehod</h2>
        <button
          className="payment__button"
          onClick={() => {
            setAttached(true);
            setupNewCard();
          }}
        >
          Attach New Card
        </button>

        {attached && (
          <form
            className="payment__attach-form"
            onSubmit={handleSubmitCard}
            hidden={!cardSetup || paymentIntent === 'succeeded'}
          >
            <div className="payment__parent-card">
              <CardNumberElement options={{ style }} />
            </div>
            <div className="payment__card-flex">
              <div className="payment__parent-card">
                <CardExpiryElement options={{ style }} />
              </div>
              <div className="payment__parent-card">
                <CardCvcElement options={{ style }} />
              </div>
            </div>
            <div className="payment__action">
              <button
                className="payment__button payment__button--gray"
                type="button"
                onClick={() => setAttached(false)}
              >
                Cancel
              </button>
              <button
                className="payment__button payment__button--add"
                type="submit"
              >
                Attach
              </button>
            </div>
          </form>
        )}
      </section>
      <div className="payment__select-wrapper">
        <div className="payment__select">
          <div className="payment__select-trigger">
            <span>Chooose one cardddd</span>
            <i className="fas fa-sort-down payment__select-icon"></i>
          </div>
          <div className="payment__options">
            {wallet.map(({ card }, index) => (
              <span
                className="payment__option"
                onClick={(e) => setCardId(e.target.value)}
                value={index}
                key={index}
              >
                {card.brand} **** **** **** {card.last4} expires{' '}
                {card.exp_month}/{card.exp_year}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* <select
        className="payment__choose-card"
        onChange={}
      >
       
        ))}
      </select>
      
      <span className=" payment__drop-icon"></span> */}

      <section className="payment__method">
        <h2 className="payment__heading">Choose payment Method</h2>
        <div className="payment__method-wrapper">
          <form className="payment__form-card" onSubmit={handlePaymentIntent}>
            <button
              className="payment__button payment__button--border"
              type="submit"
              disabled={wallet.length <= 0}
              onClick={() => {
                setPayfrom(1);
                setShowCard(false);
              }}
            >
              Pay with selected card {totalToPay}$
            </button>
            <button
              className="payment__button payment__button--fully"
              type="submit"
              disabled={!stripe}
              onClick={() => {
                setPayfrom(0);
                setShowCard(true);
              }}
            >
              Pay with Credit Card {totalToPay}$
            </button>
          </form>
          {showCard && (
            <div className="payment__card-container">
              <div className="payment__parent-card">
                <CardNumberElement options={{ style }} />
              </div>
              <div className="payment__card-flex">
                <div className="payment__parent-card">
                  <CardExpiryElement options={{ style }} />
                </div>
                <div className="payment__parent-card">
                  <CardCvcElement options={{ style }} />
                </div>
              </div>
            </div>
          )}
        </div>
        {paymentIntent && (
          <div className="payment__action">
            <button className="button" onClick={handleSubmitPayment}>
              PAY NOW
            </button>
          </div>
        )}
      </section>
      <section className="payment__intent"></section>
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
