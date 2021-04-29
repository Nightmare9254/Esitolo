import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import HeaderTitle from '../SingleComponents/HeaderTitle';
import blik from '../../assets/images/blik.png';
import payu from '../../assets/images/payu.png';
import { useState } from 'react';
import { useLocal } from '../../hooks/cart';
import Product from '../Product/Product';
import { ScrollToTop } from '../SingleComponents/ScrollToTop';
import Menu from '../Menu/Menu';

const OrderSummary = () => {
  const [cookies] = useCookies();
  const { user } = cookies;

  const [method, setMethod] = useState(0);

  const chooseMethod = (arg) => {
    setMethod(arg);
  };

  const [, , calculate, , , cartItems] = useLocal();

  let subTotal = calculate();
  let discount = 0;
  let total = 0;
  if (user) {
    discount = subTotal * 0.05;
  }
  total = subTotal - discount;

  return (
    <>
      <div className="order">
        <ScrollToTop />
        <HeaderTitle title="Order confirmation" />
        <div className="order__shipping-container">
          {user && (
            <div>
              <p className="order__shipping">
                Shipping address{' '}
                <Link className="order__shipping-change" to="/account">
                  Change
                </Link>
              </p>
              <p className="order__address-user">
                John Deep, Rzeszów 34/1, PL-12-213,+48-123123123
              </p>
            </div>
          )}
          {!user && (
            <div className="order__shipping-data">
              {/* There will be FORMIK */}
              <p className="order__enter">Enter your shipping address</p>
              <form className="order__form">
                <label className="order__label">
                  Name:
                  <input className="order__input" type="text" />
                </label>
                <label className="order__label">
                  City:
                  <input className="order__input" type="text" />
                </label>
                <label className="order__label">
                  Street name / Number:
                  <input className="order__input" type="text" />
                </label>
                <label className="order__label">
                  Phone:
                  <input className="order__input" type="text" />
                </label>
              </form>
            </div>
          )}
        </div>
        <div className="order__payment-container">
          <p className="order__payment-method">Payment method</p>
          <div className="order__container-methods">
            <div
              onClick={() => chooseMethod(1)}
              className={`order__method ${
                method === 1 ? 'order__method--active' : null
              }`}
            >
              <img className="order__method-img" src={blik} alt="method" />
            </div>
            <div
              onClick={() => chooseMethod(2)}
              className={`order__method ${
                method === 2 ? 'order__method--active' : null
              }`}
            >
              <img className="order__method-img" src={payu} alt="method" />
            </div>
          </div>
        </div>
        <div className="order__items">
          <p className="order__title">The items you buy</p>
          {cartItems.map(({ id, price, productName, quantity, image }) => {
            return (
              <Product
                id={id}
                key={id}
                price={price}
                productName={productName}
                quantity={quantity}
                image={image}
                isInOrder={true}
              />
            );
          })}
        </div>
        <div className="order__summary">
          <p className="order__title">
            Order summary ({cartItems.length} items)
          </p>
          <p className="order__info">
            Subtotal <span>{subTotal.toFixed(2)}$</span>
          </p>
          {user && (
            <p className="order__info">
              Discount - you are logged in
              <span>{discount.toFixed(2)}$</span>
            </p>
          )}
          {!user && (
            <p className="order__info">
              Discount
              <span>{discount}$</span>
            </p>
          )}
          <p className="order__info order__total">
            Total
            <span>{total.toFixed(2)}$</span>
          </p>
        </div>
        <div className="order__bar">
          <p>USD: {total.toFixed(2)}$</p>
          <Link className="order__btn">Pay now</Link>
        </div>
      </div>
      <Menu />
    </>
  );
};

export default OrderSummary;
