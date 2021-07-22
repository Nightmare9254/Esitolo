import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import HeaderTitle from '../SingleComponents/HeaderTitle';
import { useEffect, useState } from 'react';
import { useLocal } from '../../hooks/cart';
import { ScrollToTop } from '../SingleComponents/ScrollToTop';
import Menu from '../Menu/Menu';
import { Formik, Form } from 'formik';
import TextField from '../Formik/TextField';
import { AnimateContainer, ScaleButtonClick } from '../../framer/Transitions';
import { shippingAddressAnonymous } from '../Formik/YupValidation';
import Anonymous from '../../functions/Anonymous';
import CartProduct from '../Product/CartProduct';
import Footer from '../Footer/Footer';

const OrderSummary = () => {
  const [cookies] = useCookies();
  const { user } = cookies;
  const [isAddress, setIsAddress] = useState({
    address: false,
    message: '',
  });

  const [, , calculate, , , cartItems] = useLocal();

  let subTotal = calculate();
  let discount = 0;
  let total = 0;

  if (user) {
    discount = subTotal * 0.05;
  }
  total = subTotal - discount;

  const checkUserAddress = () => {
    if (anonymous && !user) {
      return true;
    }
    if (user && user.shippingAddress.city.length > 2) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setIsAddress({ ...isAddress, address: checkUserAddress() });
  }, []);

  const anonymous = JSON.parse(localStorage.getItem('anonymous-address'));

  return (
    <>
      <HeaderTitle title="Order confirmation" />
      <div className="order">
        <ScrollToTop />
        <div className="order__shipping-container">
          {user && (
            <div>
              <p className="order__shipping">
                Shipping address{' '}
                <Link className="order__shipping-change" to="/account">
                  {user.shippingAddress.street.length > 1
                    ? 'Change'
                    : 'Set address'}
                </Link>
              </p>
              {user.shippingAddress.street.length > 1 && (
                <ul style={{ listStyle: 'none' }}>
                  <li className="order__address-user">Name: {user?.name}</li>
                  <li className="order__address-user">
                    City / Street: {user?.shippingAddress.city},{' '}
                    {user?.shippingAddress.street}{' '}
                    {user?.shippingAddress.apartment}
                  </li>
                  <li className="order__address-user">
                    Zip-Code: {user?.shippingAddress.zipCode}
                  </li>
                  <li className="order__address-user">
                    Phone: {user?.shippingAddress.phone}
                  </li>
                </ul>
              )}
            </div>
          )}
          {!user && (
            <div className="order__shipping-data">
              <p className="order__payment-method">
                {anonymous
                  ? 'Your shipping address'
                  : 'Add your shipping address'}
              </p>
              <Formik
                initialValues={{
                  name: anonymous?.name,
                  email: anonymous?.email,
                  state: anonymous?.state,
                  city: anonymous?.city,
                  street: anonymous?.street,
                  apartment: anonymous?.apartment,
                  zipCode: anonymous?.zipCode,
                  phone: anonymous?.phone,
                }}
                validationSchema={shippingAddressAnonymous}
                onSubmit={values => {
                  localStorage.setItem(
                    'anonymous-address',
                    JSON.stringify(values)
                  );
                  setIsAddress({
                    address: true,
                    message: 'Address saved successfully',
                  });
                }}
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
                      key="email"
                      placeholder="Email"
                      icon="fas fa-envelope"
                      name="email"
                      type="email"
                    />
                    <TextField
                      key="state"
                      placeholder="State e.g Podkarpackie"
                      icon="fas fa-mountain"
                      name="state"
                      type="text"
                    />
                    <TextField
                      key="city"
                      placeholder="City e.g Warszawa"
                      icon="fas fa-city"
                      name="city"
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
                  {isAddress.message.length > 1 && (
                    <p className="order__message--saved">{isAddress.message}</p>
                  )}
                  <button type="submit" className="order__save-btn">
                    Save
                  </button>
                </Form>
              </Formik>
            </div>
          )}
        </div>
        <div className="order__items">
          <p className="order__title">Products you will buy</p>
          {cartItems.map(({ id, price, productName, quantity, image }) => {
            return (
              <CartProduct
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
          {isAddress.address && (
            <>
              {user && (
                <ScaleButtonClick>
                  <Link to="/basket/pay-now" role="link" className="order__btn">
                    Next
                  </Link>
                </ScaleButtonClick>
              )}
              {!user && <Anonymous />}
            </>
          )}
        </div>
      </div>
      <Footer />
      <Menu />
    </>
  );
};

export default OrderSummary;
