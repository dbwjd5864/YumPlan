import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Meal from './components/meals/Meals';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import MealPlanner from './components/meals/MealPlanner/MealPlanner';
import MealWeeklyPlanner from './components/meals/MealWeeklyPlanner/MealWeeklyPlanner';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';

import { isLoggedIn } from './actions/userActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  return (
    <Router>
      <Navbar />
      <main className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/meal" component={Meal} />
          <PrivateRoute exact path="/meal/planner" component={MealPlanner} />
          <PrivateRoute
            exact
            path="/meal/planner/weekly-plan"
            component={MealWeeklyPlanner}
          />
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
