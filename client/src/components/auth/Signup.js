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

  return (
    <div className="signup">
      <div className="signup__header">
        <h2>Sign Up</h2>
        <h4>
          Already a Member?
          <Link to="/login">Log In</Link>
        </h4>
      </div>

      <form>
        <div className="signup__group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={changeForSignup}
            required
          />
        </div>

        <div className="signup__group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={changeForSignup}
            required
          />
        </div>

        <div className="signup__group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={changeForSignup}
            required
            minLength="6"
          />
        </div>

        <div className="signup__group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={changeForSignup}
            required
            minLength="6"
          />
        </div>

        <input type="submit" value="Sign Up" className="signup__button" />
      </form>
    </div>
  );
};

export default Signup;
