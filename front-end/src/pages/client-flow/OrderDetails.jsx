import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { getSaleById } from '../../axios';
import DeliveryContext from '../../context/DeliveryContext';
import CheckoutItemsInTable from './utils/CheckoutItemsTable';
import ClientNavBar from '../components/ClientNavBar';
// import updateStatusClient from '../utils/socket';

const formatedDate = require('../utils');

function OrderDetails() {
  const {
    sale,
    setSale,
    sellers,
    user,
    setDelivery,
  } = useContext(DeliveryContext);
  const socket = io('http://localhost:3001');
  const { pathname } = useLocation();
  const pageId = pathname.replace('/customer/orders/', '');
  const { id, seller_id: sellerId, total_price: totalPrice } = sale;
  const testId = 'customer_order_details__element-order-';
  console.log(user);

  useEffect(() => {
    const loadSale = async (saleId) => {
      const newSale = await getSaleById(saleId);
      setSale(newSale.data);
    };

    loadSale(pageId);
  }, [pageId, setSale]);

  useEffect(() => {
    // updateStatusClient(socketStatus, setSale, id);
    socket.on('refreshDelivery', (saleSocket) => {
      if (id === saleSocket.id) setSale({ ...saleSocket, status: 'Entregue' });
    });
    socket.on('refreshPreparing', (saleSocket) => {
      if (id === saleSocket.id) setSale({ ...saleSocket, status: 'Preparando' });
    });
    socket.on('refreshDispatch', (saleSocket) => {
      if (id === saleSocket.id) setSale({ ...saleSocket, status: 'Em Trânsito' });
    });
  }, [sale]);

  if (!sellers.length || !sellerId) return <h1>JEQUITI...</h1>;
  const sellerName = sellers.find((seller) => seller.id === sellerId).name;

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
          onClick={ () => {
            // setSale({ ...sale, status: 'Entregue' });
            // putSaleStatus(id, 'Entregue');
            // setSocketStatus('Entregue');
            setDelivery(true);
            socket.emit('Entregue', id);
          } }
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
          {totalPrice.replace('.', ',')}
        </span>
      </h2>
    </>
  );
}

export default OrderDetails;
