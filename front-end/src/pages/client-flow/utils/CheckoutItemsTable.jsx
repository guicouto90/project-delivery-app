import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import DeliveryContext from '../../../context/DeliveryContext';

function CheckoutItemsInTable(item, index) {
  const { name, quantity, price, salesProducts } = item;
  const { itemsInCart, setItemsInCart } = useContext(DeliveryContext);
  const { pathname } = useLocation();
  const orderId = 'order_details';
  const checkoutId = 'checkout';
  const checkoutPath = '/customer/checkout';
  console.log(item);

  const buttonTable = (productIndex) => (
    <td>
      <button
        type="button"
        data-testid={ `customer_checkout__element-order-table-remove-${productIndex}` }
        onClick={ () => {
          setItemsInCart(
            [...itemsInCart.slice(0, productIndex),
              ...itemsInCart.slice(productIndex + 1)],
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
        {pathname === checkoutPath ? quantity : salesProducts.quantity}
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
        {(price * (pathname === checkoutPath ? quantity : salesProducts.quantity))
          .toFixed(2).replace('.', ',')}
      </td>
      {pathname === checkoutPath ? buttonTable(index) : null}
    </tr>
  );
}

export default CheckoutItemsInTable;
