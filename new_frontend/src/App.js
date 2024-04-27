import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import ApplyLeave from './ApplyLeave';
import AllLeaves from './AllLeaves';
//import Updation from './UPdateNotWork';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/ApplyLeave" component={ApplyLeave} />
          <Route exact path="/AllLeaves" component={AllLeaves} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
