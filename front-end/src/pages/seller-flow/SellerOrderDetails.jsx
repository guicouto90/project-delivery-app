import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSaleById, putSaleStatus } from '../../axios';
import DeliveryContext from '../../context/DeliveryContext';
import SellerCheckoutItemsInTable from './utils/SellerCheckoutItemsTable';
import ClientNavBar from '../components/ClientNavBar';

const formatedDate = require('../utils');

function OrderDetails() {
  const { sale, setSale, sellers } = useContext(DeliveryContext);
  const { pathname } = useLocation();
  const pageId = pathname.replace('/seller/orders/', '');
  const { id, seller_id: sellerId, total_price: totalPrice } = sale;
  const testId = 'seller_order_details__element-order-';

  useEffect(() => {
    const loadSale = async (saleId) => {
      const newSale = await getSaleById(saleId);
      setSale(newSale.data);
    };

    loadSale(pageId);
  }, [pageId, setSale]);

  if (!sellers.length || !sellerId) return <h1>JEQUITI...</h1>;

  return (
    <>
      <ClientNavBar />
      <h3>Detalhes do Pedido</h3>
      <div>
        <h4>
          {'Pedido '}
          <span data-testid={ `${testId}details-label-order-id` }>
            {id}
          </span>
        </h4>
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
          disabled={ sale.status !== 'Pendente' }
          data-testid="seller_order_details__button-preparing-check"
          onClick={ () => {
            putSaleStatus(id, 'Preparando');
          } }
        >
          PREPARANDO PEDIDO
        </button>
        <button
          type="button"
          disabled={ sale.status !== 'Preparando' }
          data-testid="seller_order_details__button-dispatch-check"
          onClick={ () => {
            putSaleStatus(id, 'Em Trânsito');
          } }
        >
          SAIU PARA ENTREGA
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
        {sale.products.map((item, index) => SellerCheckoutItemsInTable(item, index))}
      </table>
      <h2>
        {'Total R$ '}
        <span data-testid="seller_order_details__element-order-total-price">
          {totalPrice.replace('.', ',')}
        </span>
      </h2>
    </>
  );
}

export default OrderDetails;
