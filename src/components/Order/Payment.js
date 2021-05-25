import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useElements } from '@stripe/react-stripe-js';
import { useCookies } from 'react-cookie';
import { useLocal } from '../../hooks/cart';
import { fetchFrom } from '../../hooks/fetchFrom';
import { useHistory } from 'react-router-dom';
import HeaderTitle from '../SingleComponents/HeaderTitle';
import { style } from '../../assets/Consts/CardStyles';

const Payment = () => {
  const elements = useElements();
  const stripe = useStripe();
  const [cookies] = useCookies();
  const { user } = cookies;
  const [, , calculate, , ,] = useLocal();
  const history = useHistory();
  const [cardSetup, setCardSetup] = useState();
  const [wallet, setWallet] = useState([]);
  const [paymentIntent, setPaymentIntent] = useState();
  const [showCard, setShowCard] = useState(false);
  const [cardId, setCardId] = useState(0);
  const [payFrom, setPayFrom] = useState();
  const [attached, setAttached] = useState(false);
  const [toggleList, setToggleList] = useState(false);

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

  const handleSubmitCard = async e => {
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

  const handlePaymentIntent = async e => {
    e.preventDefault();

    const { paymentIntent } = await fetchFrom('payment/payment-intent', {
      body: {
        amount: (totalToPay * 100).toFixed(0),
        stripeUserId: user.stripeUserId,
      },
    });

    setPaymentIntent(paymentIntent.client_secret);
  };

  const choosePayment = argument => {
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

  const handleSubmitPayment = async e => {
    e.preventDefault();

    if (!stripe && !elements) return;

    const { paymentIntent: paymentStatus, error } =
      await stripe.confirmCardPayment(paymentIntent, choosePayment(payFrom));

    setPaymentIntent(paymentStatus);

    if (error) {
      console.log(error);
    }
  };

  const removeCard = async id => {
    // const { deletedCard } = await fetchFrom('payment/remove-card', {
    //   body: { stripeUserId: wallet[id].customer, cardId: wallet[id].id },
    // });
    // console.log(deletedCard);
  };

  if (paymentIntent?.status === 'succeeded') {
    history.push(`/basket/pay-now/success?session_id=${paymentIntent.id}`);
  }

  const [prevWallet, setPrevWallet] = useState('');

  const displayCard = () => {
    if (prevWallet.length > 1) return prevWallet;

    let test;
    if (wallet[0]?.card.brand.length > 1) {
      test = `${wallet[0]?.card.brand} **** **** ****  ${wallet[0]?.card.last4} expires ${wallet[0]?.card.exp_month}/${wallet[0]?.card.exp_year}`;
      return test;
    } else {
      test = 'Select your card';
      return test;
    }
  };

  return (
    <div className="payment">
      <HeaderTitle title="Payment" />
      <section className="payment__attach">
        <h2 className="payment__heading">Add new Payment Method</h2>
        <button
          className="payment__button"
          onClick={() => {
            setAttached(true);
            setupNewCard();
            setShowCard(false);
          }}
        >
          Attach a new card
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

      <section className="payment__select-wrapper">
        <div className="payment__select">
          <div
            className="payment__select-trigger"
            onClick={() => setToggleList(!toggleList)}
            onKeyDown={e => {
              if (e.key === 'Tab') return;
              setToggleList(!toggleList);
            }}
            tabIndex={0}
          >
            <p>{displayCard()}</p>
            <div className="arrow"></div>
          </div>
          <ul
            className={`payment__select-options ${
              toggleList ? 'payment__select-options--open' : ''
            }`}
          >
            {wallet.map(({ card }, index) => (
              <li
                tabIndex={0}
                key={index}
                className={`payment__select-option `}
                value={index}
                onClick={e => {
                  setPrevWallet(
                    `${card.brand} **** **** ****  ${card.last4} expires ${card.exp_month}/${card.exp_year}`
                  );
                  setCardId(e.target.value);
                  setToggleList(false);
                }}
                onKeyDown={e => {
                  if (e.key === 'Tab') return;

                  setCardId(e.target.value);
                  setToggleList(false);
                }}
              >
                {card.brand} **** **** **** {card.last4} expires{' '}
                {card.exp_month}/{card.exp_year}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="payment__method">
        <h2 className="payment__heading">Choose payment Method</h2>
        <div className="payment__method-wrapper">
          <form className="payment__form-card" onSubmit={handlePaymentIntent}>
            <button
              className="payment__button payment__button--border"
              type="submit"
              disabled={wallet.length <= 0}
              onClick={() => {
                setPayFrom(1);
                setShowCard(false);
                setAttached(false);
              }}
            >
              Pay with selected card
            </button>
            <button
              className="payment__button payment__button--fully"
              type="submit"
              disabled={!stripe}
              onClick={() => {
                setPayFrom(0);
                setAttached(false);
                setShowCard(true);
              }}
            >
              Pay with Credit Card
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
            {attached && (
              <p className="payment__warning">Add new card or Choose Card</p>
            )}
            <button
              className="payment__button-toPay button"
              disabled={attached}
              onClick={e => {
                handleSubmitPayment(e);
              }}
            >
              PAY NOW{' '}
              <span className="payment__price">{totalToPay.toFixed(2)}$</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Payment;
