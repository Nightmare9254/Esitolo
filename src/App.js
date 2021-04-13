import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import FormAdd from './components/Form/FormAdd';
import Products from './components/Products/Products';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/form" component={FormAdd} />

          <Route exacth path="/products" component={Products} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
