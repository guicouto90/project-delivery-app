/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import DeliveryContext from '../../context/DeliveryContext';
import CheckoutItemsInTable from './utils/CheckoutItemsTable';
import ClientNavBar from './utils/ClientNavBar';

const formatedDate = require('./utils');

function OrderDetails() {
  const { sale, sellers } = useContext(DeliveryContext);
  const { id, seller_id: sellerId } = sale;
  const sellerName = sellers.find((seller) => seller.id === sellerId).name;
  const testId = 'customer_order_details__element-order-';
  console.log(sale);

  return (
    <>
      <ClientNavBar />
      <h3>Detalhes do Pedido</h3>
      <div>
        <h4>
          {'Pedido '}
          <span
            data-testid={
              `${testId}details-label-order-id`
            }
          >
            {id}
          </span>
        </h4>
        <p>
          {'P. Vend: '}
          <span
            data-testid={ `${testId}details-label-seller-name` }
          >
            {sellerName}
          </span>
        </p>
        <p data-testid={ `${testId}details-label-order-date` }>
          {formatedDate(sale.sale_date)}
        </p>
        <p
          data-testid={ `${testId}details-label-delivery-status` }
        >
          {sale.status}

        </p>
        <button
          type="button"
          disabled={ sale.status !== 'Em Trânsito' }
          data-testid="customer_order_details__button-delivery-check"
        >
          MARCAR COMO ENTREGUE

        </button>
      </div>
      <table>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
        {sale.products.map((item, index) => CheckoutItemsInTable(item, index))}
      </table>
      <h2>
        {'Total R$ '}
        <span data-testid="customer_order_details__element-order-total-price">
          {sale.total_price.replace('.', ',')}
        </span>
      </h2>
    </>
  );
}

export default OrderDetails;
