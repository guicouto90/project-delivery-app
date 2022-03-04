import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import DeliveryContext from '../../../context/DeliveryContext';

function CheckoutItemsInTable(item, index) {
  const { name, quantity, price } = item;
  const { itemsInCart, setItemsInCart } = useContext(DeliveryContext);
  const { pathname } = useLocation();
  const orderId = 'order_details';
  const checkoutId = 'checkout';
  const checkoutPath = '/customer/checkout';

  const buttonTable = (pIndex) => (
    <td>
      <button
        type="button"
        data-testid={ `customer_checkout__element-order-table-remove-${pIndex}` }
        onClick={ () => {
          setItemsInCart(
            [...itemsInCart.slice(0, pIndex), ...itemsInCart.slice(pIndex + 1)],
          );
        } }
      >
        Remover
      </button>
    </td>
  );

  return (
    <tr key={ index }>
      <td
        data-testid={ `customer_${
          pathname === checkoutPath ? checkoutId : orderId
        }__element-order-table-item-number-${index}` }
      >
        {index + 1}
      </td>
      <td
        data-testid={ `customer_${
          pathname === checkoutPath ? checkoutId : orderId
        }__element-order-table-name-${index}` }
      >
        {name}
      </td>
      <td
        data-testid={ `customer_${
          pathname === checkoutPath ? checkoutId : orderId
        }__element-order-table-quantity-${index}` }
      >
        {quantity}
      </td>
      <td
        data-testid={
          `customer_${
            pathname === checkoutPath ? checkoutId : orderId
          }__element-order-table-unit-price-${index}`
        }
      >
        {price.replace('.', ',')}
      </td>
      <td
        data-testid={ `customer_${
          pathname === checkoutPath ? checkoutId : orderId
        }__element-order-table-sub-total-${index}` }
      >
        {(price * quantity).toFixed(2).replace('.', ',')}
      </td>
      {pathname === '/customer/checkout' ? buttonTable(index) : null}
    </tr>
  );
}

export default CheckoutItemsInTable;
