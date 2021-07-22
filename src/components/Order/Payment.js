import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocal } from '../../hooks/cart';
import { fetchFrom } from '../../hooks/fetchFrom';
import { useHistory } from 'react-router-dom';
import HeaderTitle from '../SingleComponents/HeaderTitle';
import AttacheCard from '../Stripe/AttacheCard';
import { useCounter } from '../../store/sub';
import { ScaleButtonClick } from '../../framer/Transitions';
import UserCardList from '../Stripe/UserCardList';
import Footer from '../Footer/Footer';

const style = {
  base: {
    backgroundColor: '#1a1d22',
    color: '#fff',
  },
};

const Payment = () => {
  const elements = useElements();
  const stripe = useStripe();
  const [cookies] = useCookies();
  const { user } = cookies;
  const [, , calculate, , ,] = useLocal();
  const history = useHistory();
  const [state, actions] = useCounter();
  const [errorMessage, setErrorMessage] = useState('');

  const [paymentIntent, setPaymentIntent] = useState('');
  const [payFrom, setPayFrom] = useState();

  const totalToPay = calculate() * 0.95;

  const handlePaymentIntent = async e => {
    e.preventDefault();

    const { paymentIntent } = await fetchFrom('payment/payment-intent', {
      body: {
        amount: (totalToPay * 100).toFixed(0),
        stripeUserId: user.stripeUserId,
      },
    });

    setPaymentIntent(paymentIntent);
  };

  const handleSubmitPayment = async e => {
    e.preventDefault();

    if (!stripe && !elements) return;

    const { paymentIntent: paymentStatus, error } =
      await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        choosePayment(payFrom)
      );

    if (error) {
      setErrorMessage(error.message);
      setPaymentIntent('');
      actions.showCard(false);
    }

    setPaymentIntent(paymentStatus);
  };

  const choosePayment = argument => {
    const cardElement = elements.getElement(CardNumberElement);

    if (argument === 0) {
      return {
        payment_method: { card: cardElement },
      };
    }
    return {
      payment_method: state.wallet[state.cardId].id,
    };
  };

  if (paymentIntent?.status === 'succeeded') {
    history.push(`/basket/pay-now/success?session_id=${paymentIntent.id}`);
  }

  return (
    <>
      <HeaderTitle title="Payment" hideBasket={true} />
      <div className="payment">
        <main className="payment__main">
          <div className="payment__wrapper">
            <AttacheCard headerTitle="Add new Payment Method" />
          </div>
          <div className="payment__wrapper">
            <section className="payment__method">
              <h2 className="payment__heading">Choose payment Method</h2>
              <UserCardList />
              <div className="payment__method-wrapper">
                <form
                  className="payment__form-card"
                  onSubmit={handlePaymentIntent}
                >
                  <ScaleButtonClick>
                    <button
                      className="payment__button--empty"
                      type="submit"
                      disabled={state.wallet <= 0}
                      onClick={() => {
                        setPayFrom(1);
                        actions.showCard(false);
                        actions.attachCardForm(false);
                      }}
                    >
                      Pay with selected card
                    </button>
                  </ScaleButtonClick>
                  <ScaleButtonClick>
                    <button
                      className="payment__button--full"
                      type="submit"
                      disabled={!stripe}
                      onClick={() => {
                        setPayFrom(0);
                        actions.attachCardForm(false);
                        actions.showCard(true);
                        setErrorMessage('');
                      }}
                    >
                      Pay with Credit Card
                    </button>
                  </ScaleButtonClick>
                </form>
                {state.showCard && (
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
              {paymentIntent && !state.attached && (
                <div className="payment__action">
                  {state.attached && (
                    <p className="payment__warning">
                      Add new card or Choose Card
                    </p>
                  )}
                  <button
                    className="payment__button--full payment__button--next"
                    disabled={state.attached}
                    onClick={e => {
                      handleSubmitPayment(e);
                    }}
                  >
                    PAY NOW
                    <span className="payment__price">
                      {' '}
                      {totalToPay.toFixed(2)}$
                    </span>
                  </button>
                </div>
              )}
              {errorMessage && (
                <p className="payment__warning">
                  {errorMessage} please try again
                </p>
              )}
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
