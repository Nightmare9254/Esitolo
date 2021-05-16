const CheckoutSuccess = () => {
  const url = window.location.href;
  const sessionId = new URL(url).searchParams.get('session-id');

  return <h3>CheckOut successful! {sessionId}</h3>;
};

export default CheckoutSuccess;
