import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function CustomNavBar() {
  const history = useHistory();
  const { pathname } = useLocation();
  const user = localStorage.user ? JSON.parse(localStorage.user) : 'Jhon Doe';

  const clientButton = () => (
    <div>
      <button
        data-testid="customer_products__element-navbar-link-products"
        type="button"
        className="productButton"
        disabled={ pathname === '/customer/products' }
        onClick={ () => history.push('/customer/products') }
      >
        Produtos
      </button>
      <button
        data-testid="customer_products__element-navbar-link-orders"
        type="button"
        className="myOrdersButton"
        disabled={ pathname === '/customer/orders' }
        onClick={ () => history.push('/customer/orders') }
      >
        Meus Pedidos
      </button>
    </div>
  );

  const sellerButton = () => (
    <div>
      <button
        data-testid="customer_products__element-navbar-link-orders"
        type="button"
        className="productButton"
        disabled={ pathname === '/seller/orders' }
        onClick={ () => history.push('/seller/orders') }
      >
        Pedidos
      </button>
    </div>

  );

  return (
    <nav>
      {pathname.includes('customer') && clientButton()}
      {pathname.includes('seller') && sellerButton()}
      <div>
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {user ? user.name : 'Jhon Doe'}
        </p>
        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ () => {
            localStorage.clear();
            history.push('/login');
          } }
        >
          Sair
        </button>

      </div>
    </nav>
  );
}

export default CustomNavBar;
