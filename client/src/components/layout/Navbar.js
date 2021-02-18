import React, { Fragment, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);

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
    const name = user.name[0].toUpperCase() + user.name.split(' ')[0].slice(1);
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

  const plannerSubMenu = () => {
    return (
      <ul className="nav__submenu">
        <li className="nav__submenu-item ">
          <Link to="/meal/planner">Show all</Link>
        </li>
        <li className="nav__submenu-item ">
          <Link to="/meal/planner/weekly-plan">Weekly Planner</Link>
        </li>
      </ul>
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
            <li
              className="nav__meal-item"
              onMouseLeave={() => setShowMenu(false)}
            >
              <Link to="/meal/planner" onMouseEnter={() => setShowMenu(true)}>
                Planner
              </Link>
              {showMenu && plannerSubMenu()}
            </li>
            <li className="nav__meal-item">
              <Link to="/meal/favorites">Favorite</Link>
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
