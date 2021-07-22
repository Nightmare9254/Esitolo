import { Suspense, lazy, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useLocal } from './hooks/cart';
import { PulsingAnimation } from './framer/Transitions';
import Main from './components/Main/Main';
import Auth from './components/Auth/Auth';
import SingleProduct from './components/Product/SingleProduct/SingleProduct';
import Cart from './components/Cart/Cart';
import axios from 'axios';

const Account = lazy(() => import('./components/UserAccount/Account'));
const FormAdd = lazy(() => import('./components/Form/FormAdd'));
const Products = lazy(() => import('./components/Products/Products'));
const OrderSummary = lazy(() => import('./components/Order/OrderSummary'));
const Payment = lazy(() => import('./components/Order/Payment'));
const CheckoutSuccess = lazy(() =>
  import('./components/Order/CheckoutSuccess')
);
const CheckoutFail = lazy(() => import('./components/Order/CheckoutFail'));
const OrderTracking = lazy(() =>
  import('./components/Order/Tracking/OrderTracking')
);

async function postImage({ image }) {
  const formData = new FormData();
  formData.append('image', image);

  const result = await axios.post('/multer', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result.data;
}

const Multer = () => {
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);

  const submit = async event => {
    event.preventDefault();
    const result = await postImage({ image: file });
    setImages([result.image, ...images]);
  };

  const fileSelected = event => {
    const file = event.target.files[0];
    setFile(file);
  };
  return (
    <div>
      <input type="file" onChange={fileSelected} accept="image/*" />
      <button onClick={submit}>SEND</button>
    </div>
  );
};

const App = () => {
  const [cookies] = useCookies(['user']);
  const { user } = cookies;

  useLocal();

  return (
    <div>
      <Router>
        <Suspense fallback={<PulsingAnimation />}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/form" component={FormAdd} />
            <Route exact path="/auth">
              {user && <Redirect to="/" />}
              {!user && <Auth />}
            </Route>
            <Route exact path="/products" component={Products} />
            <Route exact path="/product/:id" component={SingleProduct} />
            <Route exact path="/basket" component={Cart} />
            <Route exact path="/account">
              {user && <Account />}
              {!user && <Redirect to="/auth" />}
            </Route>
            <Route
              exact
              path="/basket/order-confirmation"
              component={OrderSummary}
            />

            <Route exact path="/basket/pay-now">
              {user ? (
                <Payment />
              ) : (
                <div
                  style={{
                    minHeight: '100vh',
                    background: '#31343a',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <PulsingAnimation />
                </div>
              )}
            </Route>

            <Route
              exact
              path="/basket/pay-now/failed"
              component={CheckoutFail}
            />
            <Route exact path="/order/:id" component={OrderTracking} />
            <Route
              exact
              path="/basket/pay-now/success"
              component={CheckoutSuccess}
            />
            <Route exact path="/multer" component={Multer} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
