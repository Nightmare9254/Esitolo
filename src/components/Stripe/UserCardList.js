import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { getCard } from '../../functions/stripeCard';
import { fetchFrom } from '../../hooks/fetchFrom';
import { useCounter } from '../../store/sub';

const UserCardList = () => {
  const [state, actions] = useCounter();
  const [cookies] = useCookies();
  const { user } = cookies;
  const [prevWallet, setPrevWallet] = useState('');

  const removeCard = async id => {
    const { deleted } = await fetchFrom('payment/remove-card', {
      body: { paymentMethodId: id },
    });
    if (deleted) getCard(user.stripeUserId, actions.wallet);
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
          role="list"
          className="payment__select-trigger"
          tabIndex={0}
          aria-label="Open list of attached cards"
          onClick={() => {
            actions.attachCardForm(false);
            actions.toggleDropDown(!state.toggleDD);
          }}
          onKeyDown={e => {
            if (e.key === 'Tab') return;
            actions.toggleDropDown(!state.toggleDD);
          }}
        >
          <p role="listitem">{displayCard(prevWallet, state.wallet)}</p>
          <div role="listitem" className="arrow"></div>
        </div>
        <ul
          className={`payment__select-options ${
            state.toggleDD ? 'payment__select-options--open' : ''
          }`}
        >
          {state.wallet.map(({ card, id }, index) => (
            <div role="listitem" key={index} className="payment__single-card">
              <li
                className="payment__select-option"
                value={index}
                tabIndex={0}
                aria-label={`Choose card: ${card.brand} **** **** ****  ${card.last4} expires ${card.exp_month}/${card.exp_year}`}
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
                className="payment__remove-btn"
                onClick={() => removeCard(id)}
              >
                Remove
              </button>
            </div>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default UserCardList;
