import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import FormAdd from './components/Form/FormAdd';
import Products from './components/Products/Products';
import Auth from './components/Auth/Auth';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/form" component={FormAdd} />
          <Route exact path="/auth" component={Auth} />
          <Route exacth path="/products" component={Products} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
