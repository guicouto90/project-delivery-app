import React from 'react';

function CheckoutItemsInTable(item, index) {
  const { name, price, salesProducts } = item;
  const testId = 'seller_order_details__element-';

  return (
    <tr key={ index }>
      <td
        data-testid={ `${testId}order-table-item-number-${index}` }
      >
        {index + 1}
      </td>
      <td
        data-testid={ `${testId}order-table-name-${index}` }
      >
        {name}
      </td>
      <td
        data-testid={ `${testId}order-table-quantity-${index}` }
      >
        {salesProducts.quantity}
      </td>
      <td
        data-testid={ `${testId}order-table-unit-price-${index}` }
      >
        {price.replace('.', ',')}
      </td>
      <td
        data-testid={ `${testId}order-table-sub-total-${index}` }
      >
        {(price * salesProducts.quantity).toFixed(2).replace('.', ',')}
      </td>
    </tr>
  );
}

export default CheckoutItemsInTable;
