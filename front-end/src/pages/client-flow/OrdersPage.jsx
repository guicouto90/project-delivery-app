import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllSales } from '../../axios';
import DeliveryContext from '../../context/DeliveryContext';
import CustomNavBar from '../components/CustomNavBar';

const formatedDate = require('../utils');

function OrdersPage() {
  const { orders, setSale, setOrders } = useContext(DeliveryContext);
  const history = useHistory();

  useEffect(() => {
    const getSales = async () => {
      const salesList = await getAllSales();
      setOrders(salesList.data);
    };
    getSales();
  }, []);

  return (
    <>
      <CustomNavBar />
      <div className="productsTable">
        { orders.map((order, index) => (
          <div
            className="productCard"
            key={ index }
            aria-hidden="true"
            onClick={ () => {
              setSale(order);
              history.push(`/customer/orders/${order.id}`);
            } }
          >
            <h3
              className="titlecard"
              data-testid={ `customer_orders__element-order-id-${order.id}` }
            >
              {`Pedido: ${order.id}`}
            </h3>
            <p
              className="title"
              data-testid={ `customer_orders__element-delivery-status-${order.id}` }
            >
              {order.status}
            </p>
            <p
              className="title"
              data-testid={ `customer_orders__element-order-date-${order.id}` }
            >
              {formatedDate(order.sale_date)}
            </p>
            <p
              className="title"
              data-testid={ `customer_orders__element-card-price-${order.id}` }
            >
              {'R$ '}
              {order.total_price.replace('.', ',')}
            </p>
            <p
              className="title"
              data-testid={ `customer_orders__element-card-address-${order.id}` }
            >
              {order.delivery_address}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default OrdersPage;
