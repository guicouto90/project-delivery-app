import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import Input from './input';
import { postLogin } from '../../axios/index';
import DeliveryContext from '../../context/DeliveryContext';

function Login(props) {
  const { history } = props;
  const [loginValidated, setValid] = useState(true);
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const { setUser } = useContext(DeliveryContext);

  function redirectRegister() {
    history.push('/register');
  }

  async function validPage() {
    const user = await postLogin(loginValue, passwordValue);
    if (!user) {
      setError(true);
      setMessage('Usuario ou senha invalidos');
    } else {
      setUser(user.data);
      localStorage.user = JSON.stringify(user.data);
      history.push('/customer/products');
    }
  }

  function emailValidated() {
    const re = /\S+@\S+\.\S+/;
    const valid = re.test(loginValue);
    return valid;
  }

  const enableButton = () => {
    const minimuPassword = 6;
    const emailValid = emailValidated();
    if (emailValid && passwordValue.length >= minimuPassword) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  useEffect(() => {
    enableButton();
  }, [enableButton, loginValue, passwordValue]);

  return (
    <div className="login">
      <fieldset>
        <h1 className="title">Login</h1>
        <Input
          className="inputEmail"
          value={ loginValue }
          onChange={ ({ target }) => {
            setLoginValue(target.value);
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
          disabled={ loginValidated }
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
        {!error ? ''
          : <p data-testid="common_login__element-invalid-email">{message}</p>}
      </fieldset>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;
