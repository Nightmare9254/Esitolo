import { fetchFrom } from '../hooks/fetchFrom';

export const setUpNewCard = async (stripeUserId, setCardSetup) => {
  const body = { stripeUserId };
  const intent = await fetchFrom('payment/attach-card', {
    body,
  });
  return setCardSetup(intent);
};
// export const getCard = async ({ stripeUserId, wallet }) => {
//   const body = { stripeUserId };
//   if (stripeUserId) {
//     const creditCards = await fetchFrom('payment/get-cards', {
//       body,
//     });
//     return wallet(creditCards);
//   }
// };
