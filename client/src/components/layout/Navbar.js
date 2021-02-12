import React, { Fragment } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const onLogout = () => {
    dispatch(logout());
    history.push('/');
    // dispatch(clearPlanner());
  };

  const guestLinks = (
    <Fragment>
      <li className="navigation__list-item">
        <Link to="/signup">SignUp</Link>
      </li>
      <li className="navigation__list-item">
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  const authLinks = () => {
    const name = user.name.toUpperCase();
    return (
      <Fragment>
        <li className="navigation__list-item user__name">
          {user && user.name ? `Hello ${name}` : ''}
        </li>
        <li className="navigation__list-item">
          <a onClick={onLogout} href="#!">
            Logout
          </a>
        </li>
      </Fragment>
    );
  };

  return (
    <header className="navigation">
      <h1 className="navigation__header">
        <Link to="/">YumPlan</Link>
      </h1>
      <ul className="navigation__list">
        {isAuthenticated ? authLinks() : guestLinks}
      </ul>

      <nav className="nav__container">
        {location.pathname !== '/' ? (
          <ul className="nav__background nav__meal">
            <li className="nav__meal-item">
              <Link to="/meal">Meals</Link>
            </li>
            <li className="nav__meal-item">
              <Link to="/meal/planner">Planner</Link>
            </li>
            <li className="nav__meal-item">
              <Link to="/meal/favorite/">Favorite</Link>
            </li>
          </ul>
        ) : (
          <h2 className="nav__background heading-1">Make Your Meal Plan</h2>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
