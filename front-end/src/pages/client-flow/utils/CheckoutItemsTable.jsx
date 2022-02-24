import React, { useContext } from 'react';
import DeliveryContext from '../../../context/DeliveryContext';

function CheckoutItemsInTable(item, index) {
  const { name, quantity, price } = item;
  const { itemsInCart, setItemsInCart } = useContext(DeliveryContext);

  return (
    <tr key={ index }>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        {index + 1}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        {name}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        {quantity}
      </td>
      <td
        data-testid={
          `customer_checkout__element-order-table-unit-price-${index}`
        }
      >
        {price}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        {(price * quantity).toFixed(2)}
      </td>
      <td>
        <button
          type="button"
          data-testid={ `customer_checkout__element-order-table-remove-item-${index}` }
          onClick={ () => {
            setItemsInCart(
              [...itemsInCart.slice(0, index), ...itemsInCart.slice(index + 1)],
            );
          } }
        >
          Remover
        </button>
      </td>
    </tr>
  );
}

export default CheckoutItemsInTable;
