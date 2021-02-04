import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const changeForSignup = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signup form-container">
      <div className="signup__header">
        <h2 className="signup__header-heading heading-1">Sign Up</h2>
        <h4 className="signup__header-heading heading-2">
          Already a Member?{' '}
          <Link to="/login" className="signup__header-link">
            Log In
          </Link>
        </h4>
      </div>

      <form onSubmit={submitSignUp}>
        <div className="signup__group">
          <label htmlFor="name" className="signup__label">
            Name
          </label>
          <input
            className="signup__input"
            type="text"
            name="name"
            value={name}
            onChange={changeForSignup}
            required
          />
        </div>

        <div className="signup__group">
          <label htmlFor="email" className="signup__label">
            Email Address
          </label>
          <input
            className="signup__input"
            type="email"
            name="email"
            value={email}
            onChange={changeForSignup}
            required
          />
        </div>

        <div className="signup__group">
          <label htmlFor="password" className="signup__label">
            Password
          </label>
          <input
            className="signup__input"
            type="password"
            name="password"
            value={password}
            onChange={changeForSignup}
            required
            minLength="6"
          />
        </div>

        <div className="signup__group">
          <label htmlFor="password2" className="signup__label">
            Confirm Password
          </label>
          <input
            className="signup__input"
            type="password"
            name="password2"
            value={password2}
            onChange={changeForSignup}
            required
            minLength="6"
          />
        </div>

        <input type="submit" value="Register" className="signup__button" />
      </form>
    </div>
  );
};

export default Signup;
