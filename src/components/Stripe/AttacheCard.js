import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { useCookies } from 'react-cookie';
import { style } from '../../assets/Consts/cardStyles';
import { useState } from 'react';
import { setUpNewCard } from '../../functions/stripeCard';
import UserCardList from './UserCardList';
import { useCounter } from '../../store/sub';
import { ScaleButtonClick } from '../../framer/Transitions';

const AttachCard = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cookies] = useCookies();
  const { user } = cookies;
  const [state, actions] = useCounter();
  const [cardSetup, setCardSetup] = useState('');

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
    //await getCard(user.stripeUserId);
  };

  return (
    <>
      <section className="payment__attach">
        <h2 className="payment__heading">Add new Payment Method</h2>
        <ScaleButtonClick>
          <button
            className="payment__button"
            onClick={() => {
              actions.attachCardForm(true);
              setUpNewCard(user.stripeUserId, setCardSetup);
              actions.showCard(false);
              actions.toggleDropDown(false);
            }}
          >
            Attach a new card
          </button>
        </ScaleButtonClick>

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
                className="payment__button payment__button--gray"
                type="button"
                onClick={() => actions.attachCardForm(false)}
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
      <UserCardList />
    </>
  );
};

export default AttachCard;