import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { getCard, setUpNewCard } from '../../functions/stripeCard';
import { useCounter } from '../../store/sub';
import { ScaleButtonClick } from '../../framer/Transitions';

const style = {
  base: {
    backgroundColor: '#1a1d22',
    color: '#fff',
  },
};

const AttachCard = ({ headerTitle }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cookies] = useCookies();
  const { user } = cookies;
  const [state, actions] = useCounter();
  const [cardSetup, setCardSetup] = useState('');

  useEffect(() => {
    getCard(user.stripeUserId, actions.wallet);
  }, []);

  const handleSubmitCard = async e => {
    e.preventDefault();

    if (!elements || !stripe) return;

    const cardElementNumber = elements.getElement(CardNumberElement);
    const cardElementCVC = elements.getElement(CardCvcElement);
    const cardElementExp = elements.getElement(CardExpiryElement);

    const { setupIntent, error } = await stripe.confirmCardSetup(
      cardSetup.client_secret,
      {
        payment_method: { card: cardElementNumber },
      }
    );

    if (error) {
      console.log(error);
      return;
    }

    cardElementNumber.clear();
    cardElementCVC.clear();
    cardElementExp.clear();
    actions.attachCardForm(false);
    setCardSetup('');
    await getCard(user.stripeUserId, actions.wallet);
  };

  return (
    <section className="payment__attach">
      <h2 className="payment__heading">{headerTitle}</h2>

      <button
        className="payment__attach"
        onClick={() => {
          actions.attachCardForm(true);
          setUpNewCard(user.stripeUserId, setCardSetup);
          actions.showCard(false);
          actions.toggleDropDown(false);
        }}
      >
        Attach a new card
      </button>

      {state.attached && (
        <form
          className="payment__attach-form"
          onSubmit={handleSubmitCard}
          hidden={!cardSetup === 'succeeded'}
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
              className="payment__button--gray"
              type="button"
              onClick={() => actions.attachCardForm(false)}
            >
              Cancel
            </button>
            <button className="payment__button--add" type="submit">
              Attach
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default AttachCard;
