import React, { useState } from 'react';
import PropTypes from 'prop-types';
import postLogin from '../../axios/index';
import './Login.css';
import Input from './input';

function Login(props) {
  const { history } = props;
  const [loginValidated, setValid] = useState(false);
  const [loginValue, setLoginValue] = useState();
  const [passwordValue, setPasswordValue] = useState('');
  const [, setError] = useState(''); // error removed

  // robervaldo@email.com
  // 123456

  function redirectRegister() {
    history.push('/register');
  }

  async function validPage() {
    const user = await postLogin(loginValue, passwordValue);
    if (!user.error) {
      localStorage.user = JSON.stringify(user.data);
      history.push('/products');
    }
    setError(user.error);
  }

  function emailValidated() {
    const re = /\S+@\S+\.\S+/;
    const valid = re.test(loginValue);
    return valid;
  }

  function passwordValidated() {
    const minimum = 5;
    if (passwordValue.length >= minimum) {
      setValid(true);
    } else if (passwordValue.length < minimum) {
      setValid(false);
    }
  }

  return (
    <div className="login">
      <fieldset>
        <h1 className="title">Login</h1>
        <Input
          className="inputEmail"
          value={ loginValue }
          onChange={ ({ target }) => {
            setLoginValue(target.value);
            passwordValidated();
          } }
          id="common_login__input-email"
          data-testid="common_login__input-email"
          type="email"
        />

        <Input
          className="inputSenha"
          value={ passwordValue }
          onChange={ ({ target }) => {
            setPasswordValue(target.value);
            passwordValidated();
          } }
          id="common_login__input-password"
          data-testid="common_login__input-password"
          type="password"
        />

        <button
          className="loginButton"
          onClick={ validPage }
          data-testid="common_login__button-login"
          type="button"
          disabled={ !loginValidated || !emailValidated() }
        >
          Login
        </button>
        <br />
        <button
          className="loginButton"
          onClick={ redirectRegister }
          data-testid="common_login__button-register"
          type="button"
        >
          Ainda não tenho conta
        </button>

        <br data-testid="common_login__element-invalid-email" />
      </fieldset>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;
