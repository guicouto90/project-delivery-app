import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryContext from '../../context/DeliveryContext';
import ClientNavBar from './utils/ClientNavBar';

const formatedDate = require('./utils');

function OrdersPage() {
  const { orders, setSale } = useContext(DeliveryContext);
  const history = useHistory();
  console.log(orders);

  return (
    <>
      <ClientNavBar />
      { orders.map((order, index) => (
        <div
          key={ index }
          className="productsTable"
          aria-hidden="true"
          onClick={ () => {
            console.log(order);
            setSale(order);
            history.push(`/customer/orders/${order.id}`);
          } }
        >
          <h3 data-testid={ `customer_orders__element-order-id-${order.id}` }>
            {`Pedido: ${order.id}`}
          </h3>
          <p data-testid={ `customer_orders__element-delivery-status-${index}` }>
            {order.status}
          </p>
          <p data-testid={ `customer_orders__element-order-date-${index}` }>
            {formatedDate(order.sale_date)}
          </p>
          <p>{`R$ ${order.total_price}`}</p>
        </div>
      ))}
    </>
  );
}

export default OrdersPage;
