import React, { useState } from 'react';
import Input from './input';
import postUsers from '../../axios/postUsers';
import './Login.css';

function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [loginValidated, setValid] = useState(false);

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

  function creatUser() {
    const minimuPassword = 5;
    const minimun = 12;
    if (password.length >= minimuPassword && name.length >= minimun) {
      setValid(true);
    }
  }

  return (
    <div className="login">
      <fieldset>
        <h1 className="title">Nome</h1>
        <Input
          className="inputEmail"
          value={ name }
          onChange={ ({ target }) => {
            setName(target.value);
            creatUser();
          } }
          // id=""
          data-testid="common_register__input-name"
          type="text"
        />

        <h1 className="title">Email</h1>
        <Input
          className="inputEmail"
          value={ email }
          onChange={ ({ target }) => {
            setEmail(target.value);
            creatUser();
          } }
          // id=""
          data-testid="common_register__input-email"
          type="email"
        />

        <h1 className="title">Senha</h1>
        <Input
          className="inputSenha"
          value={ password }
          onChange={ ({ target }) => {
            setPassword(target.value);
            creatUser();
          } }
          // id=""
          data-testid="common_register__input-password"
          type="password"
        />

        <button
          className="loginButton"
          onClick={ () => postUsers(name, email, password) }
          data-testid="common_register__button-register"
          type="button"
          disabled={ !loginValidated || !emailValidated() }
        >
          Cadastrar
        </button>

        <br data-testid="common_register__element-invalid_register" />
      </fieldset>
    </div>
  );
}

export default Cadastro;
