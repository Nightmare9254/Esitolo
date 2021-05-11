import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import Menu from '../Menu/Menu';
import HeaderTitle from '../SingleComponents/HeaderTitle';
import moment from 'moment';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import { shippingAddress } from '../Formik/YupValidation';
import { AnimateContainer } from '../../framer/Transitions';
import TextField from '../Formik/TextField';

const Account = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [openAddress, setOpenAddress] = useState(false);
  const { user } = cookies;
  const history = useHistory();

  const logout = () => {
    removeCookie('user');
    history.push('/');
  };

  const upadteAddress = (data) => {
    fetch('https://esitolo-backend.herokuapp.com/auth/address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (json) =>
          setCookie('user', json, {
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
          }),
        setTimeout(() => {
          window.location.reload();
        }, 500)
      );
  };

  return (
    <>
      {user && (
        <div className="settings">
          <HeaderTitle title="Account Settings" />

          <main className="settings__main">
            <section className="settings__section">
              <h4 className="settings__header-small">
                Good morning <span>{user.name}</span>
              </h4>
              <p className="settings__txt--dimmed">{user.email}</p>
            </section>
            <section className="settings__section">
              <h3 className="settings__header-medium">You have joined:</h3>
              <p className="settings__joined-date">
                {moment(user.createDate).fromNow()}
              </p>
            </section>
            <section className="settings__section">
              <h4 className="settings__header-small">Account settings</h4>
              <div>
                <div className="settings__shipping-address-header">
                  <p className="settings__txt--header">Shipping address</p>
                  <button
                    className="settings__change-btn"
                    type="button"
                    onClick={() => setOpenAddress(!openAddress)}
                  >
                    {openAddress ? 'Close' : 'Change'}
                  </button>
                </div>
                {!openAddress && (
                  <div className="settings__txt--dimmed">
                    <p>
                      City name: <span>{user?.shippingAddress.city}</span>
                    </p>
                    <p>
                      Street name: <span> {user?.shippingAddress.street}</span>
                    </p>
                    <p>
                      Apartment:
                      <span>{user?.shippingAddress.apartment}</span>
                    </p>
                    <p>
                      Zip-code: <span>{user?.shippingAddress.zipCode} </span>
                    </p>
                    <p>
                      Phone number: <span> {user?.shippingAddress.phone}</span>
                    </p>
                  </div>
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
                      phone: user?.shippingAddress.phone,
                    }}
                    validationSchema={shippingAddress}
                    onSubmit={(values) => upadteAddress(values)}
                  >
                    <Form>
                      <AnimateContainer>
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
                      <button className="button" type="submit">
                        Update
                      </button>
                    </Form>
                  </Formik>
                )}
              </div>
              <div className="settings__options">
                <p className="settings__txt--header">Order history</p>
              </div>
            </section>
          </main>
          <div style={{ textAlign: 'center' }}>
            <button onClick={logout} className="button settings__button">
              Logout
            </button>
          </div>
        </div>
      )}

      <Menu />
    </>
  );
};

export default Account;
