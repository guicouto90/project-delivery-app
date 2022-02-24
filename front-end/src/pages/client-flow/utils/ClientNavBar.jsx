import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function ClientNavBar() {
  const history = useHistory();
  const { pathname } = useLocation();
  const user = JSON.parse(localStorage.user);

  return (
    <nav>
      <button
        data-testId="customer_products__element-navbar-link-products"
        type="button"
        disabled={ pathname === '/customer/products' }
        onClick={ () => history.push('/customer/products') }
      >
        Produtos
      </button>
      <button
        data-testId="customer_products__element-navbar-link-orders"
        type="button"
        disabled={ pathname === '/customer/orders' }
        onClick={ () => history.push('/customer/orders') }
      >
        Meus Pedidos
      </button>
      <p
        data-testId="customer_products__element-navbar-user-full-name"
      >
        {user.name || 'Jhon Doe'}
      </p>
      <button
        date-testId="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ () => {
          history.push('/login');
        } }
      >
        Sair
      </button>
    </nav>
  );
}

export default ClientNavBar;
