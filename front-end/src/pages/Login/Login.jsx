import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import Input from './input';

function Login(props) {
  const { history } = props;
  const [loginValue, setLoginValue] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');

  function emailValidated() {
    const re = /\S+@\S+\.\S+/;
    const valid = re.test(loginValue);
    return valid;
  }

  function redirectRegister() {
    history.push('/register');
  }

  function loginHandleChange({ target }) {
    const { value } = target;
    setLoginValue(value);
  }

  function passwordHandleChange({ target }) {
    const { value } = target;
    setPasswordValue(value);
  }

  return (
    <div>
      Login
      <Input
        value={ loginValue }
        onChange={ loginHandleChange }
        id="common_login__input-email"
        data-testid="common_login__input-email"
        type="email"
      />

      Senha
      <Input
        value={ passwordValue }
        onChange={ passwordHandleChange }
        id="common_login__input-password"
        data-testid="common_login__input-password"
        type="password"
      />

      <button
        // onClick={ }
        data-testid="common_login__button-login"
        type="button"
        disabled={ !loginValue || !emailValidated() }
      >
        LOGIN
      </button>

      <button
        onClick={ redirectRegister }
        data-testid="common_login__button-register"
        type="button"
      >
        Ainda não tenho conta
      </button>
      <p data-testid="common_login__element-invalid-email">error</p>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;
