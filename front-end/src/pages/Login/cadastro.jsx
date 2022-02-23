import React from 'react';
import Input from './input';

function Cadastro() {
  return (
    <div>

      Nome
      <Input
      // value={ }
      // onChange={  }
      // id=""
      // data-testid=""
        type="text"
      />

      Email
      <Input
      // value={ }
      // onChange={  }
      // id=""
      // data-testid=""
        type="email"
      />

      Senha
      <Input
      // value={ }
      // onChange={  }
      // id=""
        data-testid="common_register__button-register"
        type="password"
      />

      <button
        data-testid="common_register__button-register"
        type="button"
      >
        Cadastrar
      </button>

      {/* common_register__element-invalid_register */}
    </div>
  );
}

export default Cadastro;
