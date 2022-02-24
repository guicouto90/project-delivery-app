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
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  function redirectRegister() {
    history.push('/register');
  }

  async function validPage() {
    const user = await postLogin(loginValue, passwordValue);
    if (!user) {
      setError(true);
      setMessage('Usuario ou senha invalidos');
    } else {
      localStorage.user = JSON.stringify(user.data);
      history.push('/customer/products');
    }
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
    <div className="main">
      <div className="form">
        Login
        <Input
          value={ loginValue }
          onChange={ ({ target }) => {
            setLoginValue(target.value);
            passwordValidated();
          } }
          id="common_login__input-email"
          data-testid="common_login__input-email"
          type="email"
        />

        Senha
        <Input
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
          onClick={ validPage }
          data-testid="common_login__button-login"
          type="button"
          disabled={ !loginValidated || !emailValidated() }
        >
          Login
        </button>

        <button
          onClick={ redirectRegister }
          data-testid="common_login__button-register"
          type="button"
        >
          Ainda não tenho conta
        </button>
        {!error ? ''
          : <p data-testid="common_login__element-invalid-email">{message}</p>}
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;
