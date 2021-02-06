import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/userActions';
import { clearErrors } from '../../actions/errorActions';

const Signup = () => {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const error = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
      setErrMsg(error.msg.errors);
    } else {
      setErrMsg(null);
    }

    if (isAuthenticated) {
      history.push('/recipes');
    }
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const [errMsg, setErrMsg] = useState(null);

  const { name, email, password, password2 } = user;

  const changeForSignup = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitSignUp = (e) => {
    e.preventDefault();
    if (errMsg !== null) {
      dispatch(clearErrors());
    }

    dispatch(
      signup({
        name,
        email,
        password,
        password2,
      })
    );
  };

  const mapError = (err, type) => {
    if (err.param === type) {
      return (
        <p key={err.id} className="error">
          {err.msg}
        </p>
      );
    }
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
          />
          <div className="errorWrapper">
            {errMsg
              ? errMsg.map((err) => {
                  return mapError(err, 'name');
                })
              : null}
          </div>
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
          />
          <div className="errorWrapper">
            {errMsg
              ? errMsg.map((err) => {
                  return mapError(err, 'email');
                })
              : null}
          </div>
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
          />
          <div className="errorWrapper">
            {errMsg
              ? errMsg.map((err) => {
                  return mapError(err, 'password');
                })
              : null}
          </div>
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
          />
          <div className="errorWrapper">
            {errMsg
              ? errMsg.map((err) => {
                  return mapError(err, 'password2');
                })
              : null}
          </div>
        </div>

        <input type="submit" value="Register" className="signup__button" />
      </form>
    </div>
  );
};

export default Signup;
