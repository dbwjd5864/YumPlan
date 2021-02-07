import React, { Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  const onLogout = () => {
    dispatch(logout());
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
    </header>
  );
};

export default Navbar;
