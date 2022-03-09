import React, { useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { getSaleById } from '../../axios';
import DeliveryContext from '../../context/DeliveryContext';
import SellerCheckoutItemsInTable from './utils/SellerCheckoutItemsTable';
import ClientNavBar from '../components/ClientNavBar';
// import updateStatusSeller from '../utils/socket';

const formatedDate = require('../utils');

function OrderDetails() {
  const { sale,
    setSale,
    sellers,
    setPreparing,
    setDispatch,
  } = useContext(DeliveryContext);
  const socket = io('http://localhost:3001');
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

  useEffect(() => {
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

  return (
    <>
      <ClientNavBar />
      <h3 className="totalPrice">Detalhes do Pedido</h3>
      <div className="headerTable">
        <h4 className="subTitle">
          {'Pedido '}
          <span
            data-testid={ `${testId}details-label-order-id` }
          >
            {id}
          </span>
        </h4>
        <p
          className="subTitleBorder"
          data-testid={ `${testId}details-label-order-date` }
        >
          {formatedDate(sale.sale_date)}
        </p>
        <p
          className="subTitleBorder"
          data-testid={ `${testId}details-label-delivery-status` }
        >
          {sale.status}

        </p>
        <button
          className="delivered"
          type="button"
          disabled={ sale.status !== 'Pendente' }
          data-testid="seller_order_details__button-preparing-check"
          onClick={ () => {
            // putSaleStatus(id, 'Preparando');
            // setSocketStatus('Preparando');
            // setOrderId(orderId + 1);
            // const num = orderSeller + 1;
            // setOrderSeller(id);
            console.log('preparing');
            setPreparing(true);
            socket.emit('Preparando', id);
          } }
        >
          PREPARANDO PEDIDO
        </button>
        <button
          className="delivered"
          type="button"
          disabled={ sale.status !== 'Preparando' }
          data-testid="seller_order_details__button-dispatch-check"
          onClick={ () => {
            // putSaleStatus(id, 'Em Trânsito');
            // setSocketStatus('Em Trânsito');
            // setOrderId(orderId + 1);
            // const num = orderSeller + 1;
            setDispatch(true);
            socket.emit('Em Trânsito', id);
          } }
        >
          SAIU PARA ENTREGA
        </button>
      </div>
      <table className="tableItens">
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
        {sale.products.map((item, index) => SellerCheckoutItemsInTable(item, index))}
      </table>
      <h2 className="totalPrice">
        {'Total R$ '}
        <span data-testid="seller_order_details__element-order-total-price">
          {totalPrice.replace('.', ',')}
        </span>
      </h2>
    </>
  );
}

export default OrderDetails;
