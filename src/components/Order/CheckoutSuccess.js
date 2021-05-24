import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { fetchFrom } from '../../hooks/fetchFrom';
import { Link } from 'react-router-dom';
import HeaderTitle from '../SingleComponents/HeaderTitle';
import { PulsingAnimation } from '../../framer/Transitions';

const CheckoutSuccess = () => {
  const [cookies] = useCookies();
  const { user } = cookies;
  const [orderId, setOrderId] = useState(null);

  const url = window.location.href;
  const sessionId = new URL(url).searchParams.get('session_id');

  const getProductNames = () => {
    const items = JSON.parse(localStorage.getItem('cart-items'));
    const nameOfProducts = [];

    items.forEach(element => {
      nameOfProducts.push({
        name: element.productName,
        quantity: element.quantity,
      });
    });

    return nameOfProducts;
  };

  const newOrder = async details => {
    const { orderId } = await fetchFrom('payment/create-order', {
      body: {
        userId: user ? user._id : 'anonymous',
        price: details.amount_total,
        items: getProductNames(),
        shippingAddress: JSON.parse(localStorage.getItem('anonymous-address')),
        checkOutId: sessionId,
      },
    });
    setOrderId(orderId);
  };

  const checkPayment = async () => {
    if (!sessionId) return;

    const { checkout } = await fetchFrom('payment/check-payment', {
      body: { id: sessionId },
    });

    newOrder(checkout);

    localStorage.removeItem('cart-items');
  };

  useEffect(() => {
    checkPayment();
  }, [sessionId]);

  return (
    <div className="checkout">
      <HeaderTitle title="Payment successful" />
      <div className="checkout__wrapper">
        <main className="checkout__main">
          <p className="checkout__desc">
            Thank you for your purchase. You can find your order information in
            shopping history or in mailbox
          </p>
          <Link className="checkout__link" to={`/order/${orderId}`}>
            ORDER NUMBER{' '}
            <span className="checkout__link--highlight">{orderId}</span>
          </Link>
          {user && (
            <p className="checkout__history">
              Order <Link className="checkout__history-link">history</Link>
            </p>
          )}
        </main>
      </div>

      {/* {!orderId && <PulsingAnimation />} */}
      <p className="checkout__footer">All payments are realize by Stripe</p>
    </div>
  );
};

export default CheckoutSuccess;
