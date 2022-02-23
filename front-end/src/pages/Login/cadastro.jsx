import React, { useState } from 'react';
import Input from './input';
import postUsers from '../../axios/postUsers';

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
    <div>
      Nome
      <Input
        value={ name }
        onChange={ ({ target }) => {
          setName(target.value);
          creatUser();
        } }
        // id=""
        data-testid="common_register__input-name"
        type="text"
      />

      Email
      <Input
        value={ email }
        onChange={ ({ target }) => {
          setEmail(target.value);
          creatUser();
        } }
        // id=""
        data-testid="common_register__input-email"
        type="email"
      />

      Senha
      <Input
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
        onClick={ () => postUsers(name, email, password) }
        data-testid="common_register__button-register"
        type="button"
        disabled={ !loginValidated || !emailValidated() }
      >
        Cadastrar
      </button>

      <br data-testid="common_register__element-invalid_register" />

    </div>
  );
}

export default Cadastro;
