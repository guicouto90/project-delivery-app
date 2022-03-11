import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Input from './input';
import { postUsers } from '../../axios/index';
import DeliveryContext from '../../context/DeliveryContext';
import './Login.css';

function Register(props) {
  const { history } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginValidated, setValid] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const { setUser } = useContext(DeliveryContext);

  function emailValidated() {
    const re = /\S+@\S+\.\S+/;
    const valid = re.test(email);
    return valid;
  }

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

  async function validPage() {
    const user = await postUsers({ name, email, password, role: 'customer' });
    if (!user) {
      setError(true);
      setMessage('Email ou nome já cadastrados');
    } else {
      setUser(user.data);
      localStorage.user = JSON.stringify(user.data);
      history.push('/customer/products');
    }
  }

  useEffect(() => {
    enableButton();
  }, [name, email, password, enableButton]);

  return (
    <div className="login">
      <fieldset>
        <h1 className="title">Nome</h1>
        <Input
          className="inputEmail"
          value={ name }
          name="name"
          onChange={ ({ target }) => {
            setName(target.value);
          } }
          id="common_register__input-name"
          data-testid="common_register__input-name"
          type="text"
        />

        <h1 className="title">Email</h1>
        <Input
          className="inputEmail"
          value={ email }
          name="email"
          onChange={ ({ target }) => {
            setEmail(target.value);
          } }
          id="common_register__input-email"
          data-testid="common_register__input-email"
          type="email"
        />

        <h1 className="title">Senha</h1>
        <Input
          className="inputSenha"
          value={ password }
          name="password"
          onChange={ ({ target }) => {
            setPassword(target.value);
          } }
          id="common_register__input-password"
          data-testid="common_register__input-password"
          type="password"
        />

        <button
          className="loginButton"
          onClick={ validPage }
          data-testid="common_register__button-register"
          type="button"
          disabled={ loginValidated }
        >
          Cadastrar
        </button>
        {!error ? ''
          : <p data-testid="common_register__element-invalid_register">{message}</p>}
      </fieldset>
    </div>
  );
}

Register.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Register;
