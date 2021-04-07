import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import FormAdd from './components/Form/FormAdd';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          {/* <Route exact route="/pond" component={Pond} /> */}
          <Route exact path="/" component={Main} />
          <Route exact path="/form" component={FormAdd} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
