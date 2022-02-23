import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function ClientNavBar() {
  const history = useHistory();
  const location = useLocation();
  return (
    <nav>
      <button
        data-testId="customer_products__element-navbar-link-products"
        type="button"
      >
        Produtos
      </button>
      <button
        data-testId="customer_products__element-navbar-link-orders"
        type="button"
      >
        Meus Pedidos
      </button>
      <p
        data-testId="customer_products__element-navbar-user-full-name"
      >
        Nome de Usuário
      </p>
      <button
        date-testId="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ () => {
          console.log(location);
          history.push('/login');
        } }
      >
        Sair
      </button>
    </nav>
  );
}

export default ClientNavBar;
