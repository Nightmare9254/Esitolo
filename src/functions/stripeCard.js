import { fetchFrom } from '../hooks/fetchFrom';

export const setUpNewCard = async (stripeUserId, setCardSetup) => {
  const body = { stripeUserId };
  const intent = await fetchFrom('payment/attach-card', {
    body,
  });
  return setCardSetup(intent);
};

export const getCard = async (stripeUserId, actions) => {
  const body = { stripeUserId };
  if (stripeUserId) {
    const creditCards = await fetchFrom('payment/get-cards', {
      body,
    });
    return actions(creditCards);
  }
};

export const cancelOrder = async (paymentId, orderId, price, history) => {
  const body = { paymentId, orderId, price };

  const { message, refund } = await fetchFrom('orders/cancel', { body });

  history.push('/');
};
