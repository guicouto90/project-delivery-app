import React, { useContext, useEffect } from 'react';
import { postSale } from '../../axios';
import DeliveryContext from '../../context/DeliveryContext';
import CheckoutItemsInTable from './utils/CheckoutItemsTable';
import ClientNavBar from './utils/ClientNavBar';

function CheckoutPage() {
  const { itemsInCart } = useContext(DeliveryContext);
  const sellers = ['VendedorA', 'VendedorB', 'VendedorC'];

  useEffect(() => {}, [itemsInCart]);

  let total = 0;
  const newSale = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const productsDetails = itemsInCart.map((item) => (
      { product_id: item.id, quantity: item.quantity }
    ));
    const body = {
      userId: user.id,
      sellerId: 2,
      totalPrice: total,
      deliveryAddress: 'Rua do teste',
      deliveryNumber: 150,
      productsDetails,
    };
    // REF: https://blog.logrocket.com/using-axios-set-request-headers/
    const config = {
      headers: {
        authorization: user.token,
      },
    };
    const response = await postSale(body, config);

    return response;
  };

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
      <h3>
        {'Total: R$ '}
        <span data-testid="customer_checkout__element-order-total-price">
          {total.toFixed(2).replace('.', ',')}
        </span>

      </h3>
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
        onClick={ newSale }
      >
        Finalizar Pedido
      </button>
    </>
  );
}

export default CheckoutPage;
