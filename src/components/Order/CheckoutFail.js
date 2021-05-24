import HeaderTitle from '../SingleComponents/HeaderTitle';
import { Link } from 'react-router-dom';
import error from '../../assets/images/error';

const CheckoutFail = () => {
  return (
    <div className="checkout">
      <HeaderTitle title="Payment failed" />
      <div className="checkout__img">{error}</div>
      <p className="checkout__status">
        Payment status: <span className="checkout__marked">failed</span>
      </p>
      <div className="checkout__information">
        <p>
          Something went wrong! <br />
          Please try again, click link below
        </p>
        <Link className="checkout__fail-link" to="/basket/order-confirmation">
          Try again <i className="fas fa-long-arrow-alt-right"></i>
        </Link>
      </div>
      <div className="checkout__back">
        <p>I don't want to try again</p>
        <Link className="checkout__fail-link" to="/">
          Back to main page <i className="fas fa-home"></i>
        </Link>
      </div>
      <div className="checkout__back">
        <p>Report an error </p>
        <Link className="checkout__fail-link" to="/">
          Contact us <i className="fas fa-envelope"></i>
        </Link>
      </div>
      <p className="checkout__footer">All payments are realize by Stripe</p>
    </div>
  );
};

export default CheckoutFail;
