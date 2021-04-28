import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Main from './components/Main/Main';
import FormAdd from './components/Form/FormAdd';
import Products from './components/Products/Products';
import Auth from './components/Auth/Auth';
import Account from './components/UserAccount/Account';
import { useCookies } from 'react-cookie';
import SingleProduct from './components/Product/SingleProduct/SingleProduct';
import Cart from './components/Cart/Cart';
import { useLocal } from './hooks/cart';

const App = () => {
  const [cookies] = useCookies(['user']);
  const { user } = cookies;

  useLocal();

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/form" component={FormAdd} />
          <Route exact path="/auth">
            {user && <Redirect to="/" />}
            {!user && <Auth />}
          </Route>
          <Route exacth path="/products" component={Products} />
          <Route exacth path="/product/:id" component={SingleProduct} />
          <Route exacth path="/basket" component={Cart} />
          <Route exact path="/account">
            {user && <Account />}
            {!user && <Redirect to="/auth" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
