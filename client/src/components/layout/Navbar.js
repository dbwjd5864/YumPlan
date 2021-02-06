import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.users);

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
          <Link to="/logout">Logout</Link>
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
    </header>
  );
};

export default Navbar;
