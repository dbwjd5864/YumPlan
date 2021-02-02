import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/" component={Signup} />
            <Route exact path="/" component={Login} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
