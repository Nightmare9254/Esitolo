import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import Menu from '../Menu/Menu';
import HeaderTitle from '../SingleComponents/HeaderTitle';
import moment from 'moment';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import { shippingAddress } from '../Formik/YupValidation';
import { AnimateContainer, AnimateItem } from '../../framer/Transitions';
import TextField from '../Formik/TextField';
import OrderHistory from './OrderHistory';
import AttackCard from '../Stripe/AttacheCard';
import UserCardList from '../Stripe/UserCardList';
import { AnimatePresence } from 'framer-motion';
import Footer from '../Footer/Footer';

const Account = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [openAddress, setOpenAddress] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const { user } = cookies;
  const history = useHistory();

  const logout = () => {
    removeCookie('user');
    history.push('/');
  };

  const updateAddress = data => {
    fetch(`${process.env.REACT_APP_API}/auth/address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(json => {
        setCookie('user', json, {
          path: '/',
          maxAge: 24 * 60 * 60 * 1000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
  };

  return (
    <>
      <HeaderTitle title="Account Settings" />
      {user && (
        <div className="settings">
          <main className="settings__main">
            <section className="settings__section settings__welcome">
              <h3 className="settings__header-small">
                Good morning <span>{user.name}</span>
              </h3>
              <p className="settings__txt--dimmed">{user.email}</p>
            </section>
            <section className="settings__section settings__joined">
              <h4 className="settings__header-medium">You have joined:</h4>
              <p className="settings__joined-date">
                {moment(user.createDate).fromNow()}
              </p>
            </section>
            <section className="settings__section settings__account-information">
              <h4 className="settings__header-small">Account settings</h4>
              <div>
                <div className="settings__shipping-address-header">
                  <p className="settings__txt--header">Shipping address</p>
                  <button
                    className="settings__change-btn"
                    type="button"
                    aria-label="Open change address settings"
                    onClick={() => setOpenAddress(!openAddress)}
                  >
                    {openAddress ? 'Close' : 'Change'}
                  </button>
                </div>
                <AnimatePresence>
                  {!openAddress && (
                    <AnimateContainer className="settings__txt--dimmed">
                      <AnimateItem align="left">
                        <p>
                          City name: <span>{user?.shippingAddress.city}</span>
                        </p>
                      </AnimateItem>
                      <AnimateItem align="left">
                        <p>
                          Street name:
                          <span> {user?.shippingAddress.street}</span>
                        </p>
                      </AnimateItem>
                      <AnimateItem align="left">
                        <p>
                          Apartment:
                          <span>{user?.shippingAddress.apartment}</span>
                        </p>
                      </AnimateItem>
                      <AnimateItem align="left">
                        <p>
                          State:
                          <span>{user?.shippingAddress.state}</span>
                        </p>
                      </AnimateItem>
                      <AnimateItem align="left">
                        <p>
                          Zip-code:
                          <span>{user?.shippingAddress.zipCode} </span>
                        </p>
                      </AnimateItem>
                      <AnimateItem align="left">
                        <p>
                          Phone number:
                          <span> {user?.shippingAddress.phone}</span>
                        </p>
                      </AnimateItem>
                    </AnimateContainer>
                  )}

                  {openAddress && (
                    <Formik
                      initialValues={{
                        id: user._id,
                        name: user?.name,
                        city: user?.shippingAddress.city,
                        street: user?.shippingAddress.street,
                        apartment: user?.shippingAddress.apartment,
                        zipCode: user?.shippingAddress.zipCode,
                        state: user?.shippingAddress.state,
                        phone: user?.shippingAddress.phone,
                        stripeUserId: user?.stripeUserId,
                      }}
                      validationSchema={shippingAddress}
                      onSubmit={values => updateAddress(values)}
                    >
                      <Form>
                        <AnimateContainer>
                          <TextField
                            key="state"
                            placeholder="State e.g Podkarpackie"
                            icon="fas fa-mountain"
                            name="state"
                            type="text"
                          />
                          <TextField
                            key="city"
                            placeholder="City"
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
                        <button
                          className="settings__button settings__button-update"
                          type="submit"
                        >
                          Update
                        </button>
                      </Form>
                    </Formik>
                  )}
                </AnimatePresence>
              </div>
            </section>
            <section className="settings__orders-history">
              <div className="settings__options">
                <p className="settings__txt--header">Order history</p>
                <button
                  type="button"
                  className="settings__change-btn"
                  onClick={() => setShowOrders(!showOrders)}
                  aria-label="Open order history"
                >
                  {showOrders ? ' Close' : 'Show'}
                </button>
              </div>
              {showOrders && <OrderHistory />}
            </section>
            <section className="settings__section settings__payments-methods">
              <AttackCard headerTitle="Remove or add credit card" />
              <UserCardList />
            </section>
            <div className="settings__container-logout">
              <button
                onClick={logout}
                className="settings__button"
                aria-label="Logout from your account"
              >
                Logout
              </button>
            </div>
          </main>
        </div>
      )}
      <Footer />
      <Menu />
    </>
  );
};

export default Account;
