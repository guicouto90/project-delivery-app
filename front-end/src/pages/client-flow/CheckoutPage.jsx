import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import newSale from '../../axios/utils';
import DeliveryContext from '../../context/DeliveryContext';
import CheckoutItemsInTable from './utils/CheckoutItemsTable';
import ClientNavBar from '../components/ClientNavBar';

function CheckoutPage() {
  const {
    itemsInCart, setUser,
    user, sellers, setSale, orders, setOrders } = useContext(DeliveryContext);

  const history = useHistory();

  useEffect(() => {}, [itemsInCart]);

  let total = 0;

  return (
    <>
      <ClientNavBar />
      <h4 className="totalPrice">Finalizar Pedido</h4>
      <table className="tableItens">
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
          return CheckoutItemsInTable(item, index);
        })}
      </table>
      <h3 className="totalPrice">
        {'Total: R$ '}
        <span data-testid="customer_checkout__element-order-total-price">
          {total.toFixed(2).replace('.', ',')}
        </span>
      </h3>
      <h4 className="totalPrice">Detalhes e Endereço para Entrega</h4>
      <table className="tableItens">
        <tr>
          <th>P. Vendedora Responsável</th>
          <th>Endereço</th>
          <th>Número</th>
        </tr>
        <tr>
          <td>
            <select
              data-testid="customer_checkout__select-seller"
              name=""
              id=""
            >
              {sellers.map((seller) => (
                <option
                  key={ seller.id }
                >
                  {seller.name}
                </option>
              ))}
            </select>
          </td>
          <td>
            <input
              data-testid="customer_checkout__input-address"
              onChange={ ({ target }) => setUser(
                { ...user, deliveryAddress: target.value },
              ) }
              type="text"
            />
          </td>
          <td>
            <input
              data-testid="customer_checkout__input-addressNumber"
              onChange={ ({ target }) => setUser(
                { ...user, deliveryNumber: target.value },
              ) }
              type="number"
            />
          </td>
        </tr>
      </table>
      <button
        className="buttonSubmit"
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ async () => {
          const result = await newSale(itemsInCart, user, total);
          result.products = [...itemsInCart];
          result.products = result.products
            .map((product) => (
              { ...product, salesProducts: { quantity: product.quantity } }));
          setOrders([...orders, result]);
          setSale(result);
          history.push(`/customer/orders/${result.id}`);
        } }
      >
        Finalizar Pedido
      </button>
    </>
  );
}

export default CheckoutPage;
