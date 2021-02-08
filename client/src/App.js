import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Meal from './components/meals/Meals';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/meal" component={Meal} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/about" component={About} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
