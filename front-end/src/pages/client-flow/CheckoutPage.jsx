import React, { useContext, useEffect } from 'react';
import DeliveryContext from '../../context/DeliveryContext';
import CheckoutItemsInTable from './utils/CheckoutItemsTable';
import ClientNavBar from './utils/ClientNavBar';

function CheckoutPage() {
  const { itemsInCart } = useContext(DeliveryContext);
  const sellers = ['VendedorA', 'VendedorB', 'VendedorC'];

  useEffect(() => {}, [itemsInCart]);

  let total = 0;
  return (
    <>
      <ClientNavBar />
      <h4>Finalizar Pedido</h4>
      <table>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>
        {itemsInCart.map((item, index) => {
          total += item.quantity * item.price;
          return (CheckoutItemsInTable(item, index));
        })}
      </table>
      <h3>{`Total: R$ ${total.toFixed(2)}`}</h3>
      <h4>Detalhes e Endereço para Entrega</h4>
      <table>
        <tr>
          <th>P. Vendedora Responsável</th>
          <th>Endereço</th>
          <th>Número</th>
        </tr>
        <tr>
          <td>
            <select name="" id="" data-testid="customer_checkout__select-seller">
              {sellers.map((seller) => <option key={ seller }>{seller}</option>)}
            </select>
          </td>
          <td><input data-testid="customer_checkout__input-address" type="text" /></td>
          <td>
            <input data-testid="customer_checkout__input-addressNumber" type="number" />
          </td>
        </tr>
      </table>
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
      >
        Finalizar Pedido
      </button>
    </>
  );
}

export default CheckoutPage;
