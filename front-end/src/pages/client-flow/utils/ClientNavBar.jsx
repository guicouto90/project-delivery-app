import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function ClientNavBar() {
  const history = useHistory();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const loggoutUser = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <nav>
      <button
        data-testid="customer_products__element-navbar-link-products"
        type="button"
      >
        Produtos
      </button>
      <button
        data-testid="customer_products__element-navbar-link-orders"
        type="button"
      >
        Meus Pedidos
      </button>
      <p
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { user.name }
      </p>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ () => {
          console.log(location);
          loggoutUser();
        } }
      >
        Sair
      </button>
    </nav>
  );
}

export default ClientNavBar;
