import React, { useState } from 'react';
import PropTypes from 'prop-types';
import postLogin from '../../axios/index';
import './Login.css';
import Input from './input';

function Login(props) {
  const { history } = props;
  const [loginValue, setLoginValue] = useState();
  const [passwordValue, setPasswordValue] = useState('');
  const [errorInfo, setError] = useState('');

  // function emailValidated() {
  //   const re = /\S+@\S+\.\S+/;
  //   const valid = re.test(loginValue);
  //   return valid;
  // }

  //robervaldo@email.com
  //123456

  function redirectRegister() {
    history.push('/register');
  }

  async function validPage() {
    const user = await postLogin(loginValue, passwordValue);
    if (!user.error) {
      localStorage.user = JSON.stringify(user.data);
      history.push('/products');
      console.log(user)
    }
    setError(user.error);
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
        onClick={ validPage }
        data-testid="common_login__button-login"
        type="button"
        // disabled={ !loginValue || !emailValidated() }
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
