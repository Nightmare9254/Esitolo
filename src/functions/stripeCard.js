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

export const cancelOrder = async (paymentId, orderId, price) => {
  console.log('ddd');
  const body = { paymentId, orderId, price: price * 100 };

  const res = await fetchFrom('orders/cancel', { body });

  // if (user) {
  window.location = '/';
  return;
  // }
  // window.location = '/';
};
