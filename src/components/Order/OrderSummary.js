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
import { Formik, Form } from 'formik';
import TextField from '../Formik/TextField';
import { AnimateContainer } from '../../framer/Transitions';
import { shippingAddress } from '../Formik/YupValidation';

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
              <ul style={{ listStyle: 'none' }}>
                <li className="order__address-user">Name: {user?.name}</li>
                <li className="order__address-user">
                  City / Street: {user?.shippingAddress.city},{' '}
                  {user?.shippingAddress.street}{' '}
                  {user?.shippingAddress.streetNumber}
                </li>
                <li className="order__address-user">
                  Zip-Code: {user?.shippingAddress.zipCode}
                </li>
                <li className="order__address-user">
                  Phone: {user?.shippingAddress.phone}
                </li>
              </ul>
            </div>
          )}
          {!user && (
            <div className="order__shipping-data">
              <Formik
                initialValues={{
                  name: '',
                  street: '',
                  apartment: '',
                  zipCode: '',
                  phone: '',
                }}
                validationSchema={shippingAddress}
                onSubmit={(values) => console.log(values)}
              >
                <Form>
                  <AnimateContainer>
                    <TextField
                      key="name"
                      placeholder="Name"
                      icon="fas fa-user"
                      name="name"
                      type="text"
                    />
                    <TextField
                      key="street"
                      placeholder="Street"
                      icon="fas fa-road"
                      name="street"
                      type="text"
                    />
                    <TextField
                      key="apartment"
                      placeholder="Apartment"
                      icon="fas fa-map-marker"
                      name="apartment"
                      type="text"
                    />
                    <TextField
                      key="zipCode"
                      placeholder="Postal code e.g - 00-000"
                      icon="fas fa-envelope"
                      name="zipCode"
                      type="text"
                    />
                    <TextField
                      key="phone"
                      placeholder="Phone +42-122-512-613"
                      icon="fas fa-phone-alt"
                      name="phone"
                      type="tel"
                    />
                  </AnimateContainer>
                </Form>
              </Formik>
            </div>
          )}
        </div>
        <div className="order__payment-container">
          <p className="order__payment-method">Payment method</p>
          <div className="order__container-methods">
            <div
              onClick={() => chooseMethod(1)}
              className={`order__method ${
                method === 1 ? 'order__method--active' : ''
              }`}
            >
              <img className="order__method-img" src={blik} alt="method" />
            </div>
            <div
              onClick={() => chooseMethod(2)}
              className={`order__method ${
                method === 2 ? 'order__method--active' : ''
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
          <Link to="/pay-now" className="order__btn">
            Pay now
          </Link>
        </div>
      </div>
      <Menu />
    </>
  );
};

export default OrderSummary;
