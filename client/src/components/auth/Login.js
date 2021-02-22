import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';
import { clearErrors } from '../../actions/errorActions';

const Login = () => {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const error = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setErrMsg(error.msg.errors);
    } else {
      setErrMsg(null);
    }

    if (isAuthenticated) {
      history.push('/meal');
    }
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [errMsg, setErrMsg] = useState(null);

  const { email, password } = user;

  const changeForLogIn = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitForLogIn = (e) => {
    e.preventDefault();
    if (errMsg !== null) {
      dispatch(clearErrors());
    }

    dispatch(
      login({
        email,
        password,
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
    <div className="login form-container">
      <div className="login__header">
        <h2 className="login__header-heading heading-1">Log In</h2>
      </div>

      <form onSubmit={submitForLogIn}>
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
          />
          <div className="errorWrapper">
            {errMsg
              ? errMsg.map((err) => {
                  return mapError(err, 'email');
                })
              : null}
          </div>
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
          />
          <div className="errorWrapper">
            {errMsg
              ? errMsg.map((err) => {
                  return mapError(err, 'password');
                })
              : null}
          </div>
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
