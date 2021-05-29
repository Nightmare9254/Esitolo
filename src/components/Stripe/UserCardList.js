import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { fetchFrom } from '../../hooks/fetchFrom';
import { useCounter } from '../../store/sub';

const UserCardList = () => {
  const [state, actions] = useCounter();
  const [cookies] = useCookies();
  const { user } = cookies;
  const [prevWallet, setPrevWallet] = useState('');

  const getCard = async () => {
    const body = { stripeUserId: user.stripeUserId };
    if (user.stripeUserId) {
      const creditCards = await fetchFrom('payment/get-cards', {
        body,
      });
      return actions.wallet(creditCards);
    }
  };

  const removeCard = async (id, stripeUserId) => {
    const { deleted } = await fetchFrom('payment/remove-card', {
      body: { paymentMethodId: id },
    });
    if (deleted) getCard();
  };

  const displayCard = () => {
    if (prevWallet.length > 1) return prevWallet;
    let cardPreview;

    if (state.wallet[0]?.card.brand.length > 1) {
      cardPreview = `${state.wallet[0]?.card.brand} **** **** ****  ${state.wallet[0]?.card.last4} expires ${state.wallet[0]?.card.exp_month}/${state.wallet[0]?.card.exp_year}`;
      return cardPreview;
    } else {
      cardPreview = 'Select your card';
      return cardPreview;
    }
  };

  return (
    <section className="payment__select-wrapper">
      <div className="payment__select">
        <div
          className="payment__select-trigger"
          onClick={() => {
            actions.attachCardForm(false);
            actions.toggleDropDown(!state.toggleDD);
          }}
          onKeyDown={e => {
            if (e.key === 'Tab') return;
            actions.toggleDropDown(!state.toggleDD);
          }}
          tabIndex={0}
        >
          <p>{displayCard(prevWallet, state.wallet)}</p>
          <div className="arrow"></div>
        </div>
        <ul
          className={`payment__select-options ${
            state.toggleDD ? 'payment__select-options--open' : ''
          }`}
        >
          {state.wallet.map(({ card, id }, index) => (
            <>
              <li
                tabIndex={0}
                key={index}
                className="payment__select-option"
                value={index}
                onClick={e => {
                  setPrevWallet(
                    `${card.brand} **** **** ****  ${card.last4} expires ${card.exp_month}/${card.exp_year}`
                  );

                  actions.cardId(e.target.value);
                  actions.toggleDropDown(false);
                }}
                onKeyDown={e => {
                  if (e.key === 'Tab') return;

                  actions.cardId(e.target.value);
                  actions.toggleDropDown(false);
                }}
              >
                {card.brand} **** **** **** {card.last4} expires{' '}
                {card.exp_month}/{card.exp_year}
              </li>
              <button
                className="payment__button payment__remove"
                onClick={() => removeCard(id, user.stripeUserId)}
              >
                Remove
              </button>
            </>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default UserCardList;
