import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Recipes from './components/pages/Recipes';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <main className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/recipes" component={Recipes} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/about" component={About} />
          </Switch>
        </main>
        <Footer />
      </Fragment>
    </Router>
  );
};

export default App;
