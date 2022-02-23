import React, { useContext } from 'react';
import DeliveryContext from '../../../context/DeliveryContext';

function CheckoutItemsInTable(item, index) {
  const { name, quantity, price } = item;
  const { itemsInCart, setItemsInCart } = useContext(DeliveryContext);
  return (
    <tr key={ index }>
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <td>{(price * quantity).toFixed(2)}</td>
      <td>
        <button
          type="button"
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
