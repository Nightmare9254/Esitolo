import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { fetchFrom } from '../../hooks/fetchFrom';
import { Link } from 'react-router-dom';
import HeaderTitle from '../SingleComponents/HeaderTitle';
import { PulsingAnimation } from '../../framer/Transitions';
import { useLocal } from '../../hooks/cart';

const CheckoutSuccess = () => {
  const [cookies] = useCookies();
  const { user } = cookies;
  const [orderId, setOrderId] = useState(null);

  const anonymousIntentId = JSON.parse(
    sessionStorage.getItem('anonymous-session-id')
  );

  const [, , calculate] = useLocal();

  const url = window.location.href;
  const sessionId = new URL(url).searchParams.get('session_id');
  const type = sessionId.substring(0, 2);
  const getProductNames = () => {
    const items = JSON.parse(localStorage.getItem('cart-items'));
    const nameOfProducts = [];

    items.forEach(element => {
      nameOfProducts.push({
        id: element.id,
        name: element.productName,
        quantity: element.quantity,
        price: element.price,
      });
    });

    return nameOfProducts;
  };

  const newOrder = async details => {
    const totalToPay = calculate() * 0.95;

    const userShippingAddress = {
      name: user?.name,
      email: user?.email,
      state: user?.shippingAddress.state,
      city: user?.shippingAddress.city,
      street: user?.shippingAddress.street,
      apartment: user?.shippingAddress.apartment,
      zipCode: user?.shippingAddress.zipCode,
      phone: user?.shippingAddress.phone,
    };

    const { orderId } = await fetchFrom('payment/create-order', {
      body: {
        userId: user ? user._id : 'anonymous',
        price: user ? totalToPay.toFixed(2) : details.amount_total,
        items: getProductNames(),
        shippingAddress: user
          ? userShippingAddress
          : JSON.parse(localStorage.getItem('anonymous-address')),
        checkOutId: user ? sessionId : anonymousIntentId,
      },
    });
    setOrderId(orderId);
  };

  const checkPayment = async () => {
    if (!sessionId) return;

    const { checkout } = await fetchFrom('payment/check-payment', {
      body: { id: sessionId, type },
    });

    newOrder(checkout);

    localStorage.removeItem('cart-items');
  };

  useEffect(() => {
    checkPayment();
  }, []);

  return (
    <div className="checkout">
      <HeaderTitle title="Payment successful" />
      {orderId && (
        <div className="checkout__wrapper">
          <main className="checkout__main">
            <p className="checkout__desc">
              Thank you for your purchase. You can find your order information
              in shopping history or in mailbox
            </p>
            <Link className="checkout__link" to={`/order/${orderId}`}>
              ORDER NUMBER{' '}
              <span className="checkout__link--highlight">{orderId}</span>
            </Link>
            {user && (
              <p className="checkout__history">
                Order{' '}
                <Link to="/account" className="checkout__history-link">
                  history
                </Link>
              </p>
            )}
          </main>
        </div>
      )}

      {!orderId && <PulsingAnimation />}
      <p className="checkout__footer">All payments are realize by Stripe</p>
    </div>
  );
};

export default CheckoutSuccess;
