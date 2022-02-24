import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Input from './input';
import postUsers from '../../axios/postUsers';

function Register(props) {
  const { history } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [loginValidated, setValid] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  function emailValidated() {
    const re = /\S+@\S+\.\S+/;
    const valid = re.test(email);
    return valid;
  }

  // function nameValidated() {
  //   const minimum = 12;
  //   if (name.length >= minimum) {
  //     setValid(true);
  //   }
  // }
  const enableButton = () => {
    const minimuPassword = 6;
    const minimun = 12;
    const emailValid = emailValidated();
    if (emailValid && password.length >= minimuPassword && name.length >= minimun) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  /* function creatUser() {
    const minimuPassword = 6;
    const minimun = 12;
    console.log(password.length);
    console.log('MINIMO:', minimuPassword);
    if (password.length > minimuPassword && name.length >= minimun) {
      setValid(true);
    }
  } */

  async function validPage() {
    const user = await postUsers(name, email, password);
    if (!user) {
      setError(true);
      setMessage('Email ou nome já cadastrados');
    } else {
      localStorage.user = JSON.stringify(user.data);
      history.push('/customer/products');
    }
  }

  useEffect(() => {
    enableButton();
  }, [name, email, password]);

  return (
    <div>
      Nome
      <Input
        value={ name }
        name="name"
        onChange={ ({ target }) => {
          setName(target.value);
          // creatUser();
        } }
        id="common_register__input-name"
        data-testid="common_register__input-name"
        type="text"
      />

      Email
      <Input
        value={ email }
        name="email"
        onChange={ ({ target }) => {
          setEmail(target.value);
          // creatUser();
        } }
        id="common_register__input-email"
        data-testid="common_register__input-email"
        type="email"
      />

      Senha
      <Input
        value={ password }
        name="password"
        onChange={ ({ target }) => {
          setPassword(target.value);
          // creatUser();
        } }
        id="common_register__input-password"
        data-testid="common_register__input-password"
        type="password"
      />

      <button
        onClick={ validPage }
        data-testid="common_register__button-register"
        type="button"
        disabled={ loginValidated }
      >
        Cadastrar
      </button>
      {!error ? ''
        : <p data-testid="common_register__element-invalid_register">{message}</p>}
    </div>
  );
}

Register.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Register;
