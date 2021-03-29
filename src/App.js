import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './components/Main/Main';
const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact route="/" component={Main} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
