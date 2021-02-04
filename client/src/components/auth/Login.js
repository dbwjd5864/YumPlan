import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const changeForLogIn = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login form-container">
      <div className="login__header">
        <h2 className="login__header-heading heading-1">Log In</h2>
      </div>

      <form>
        <div className="login__group">
          <label htmlFor="email" className="login__label">
            Email Address
          </label>
          <input
            className="login__input"
            type="email"
            name="email"
            value={email}
            onChange={changeForLogIn}
            required
          />
        </div>

        <div className="login__group">
          <label htmlFor="password" className="login__label">
            Password
          </label>
          <input
            className="login__input"
            type="password"
            name="password"
            value={password}
            onChange={changeForLogIn}
            required
            minLength="6"
          />
        </div>

        <input type="submit" value="Log In" className="login__button" />
      </form>

      <div className="login__direction">
        <h4 className="login__direction--heading heading-2">
          No Account?{' '}
          <Link to="/signup" className="login__header-link">
            Create one here
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default Login;
