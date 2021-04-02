import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import Pond from './components/Main/Pond';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          {/* <Route exact route="/pond" component={Pond} /> */}
          <Route exact route="/" component={Main} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
