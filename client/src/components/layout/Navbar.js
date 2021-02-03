import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="navigation">
      <h1 className="navigation__header">
        <Link to="/">YumPlan</Link>
      </h1>
      <ul className="navigation__list">
        <li className="navigation__list-item">
          <Link to="/signup">SignUp</Link>
        </li>
        <li className="navigation__list-item">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
