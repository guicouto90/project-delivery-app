import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ClientNavBar from './utils/ClientNavBar';

/*
saleObjectFormat =  {
id: 1,
userId: 1,
sellerId: 1,
deliveryAddress: 'Rua dois, nº 0',
totalPrice: 100,
deliveryNumber: '0',
saleDate: '2020-05-01T00:00:00.000Z',
status: 'PENDING',
}
*/

const saleObjectFormat = [
  {
    id: 1,
    userId: 1,
    sellerId: 1,
    totalPrice: '100.00',
    deliveryAddress: 'Rua dois, nº 0',
    deliveryNumber: '0',
    saleDate: '2020-05-01T00:00:00.000Z',
    status: 'PENDENTE',
  },
  {
    id: 2,
    userId: 2,
    sellerId: 2,
    totalPrice: '200.00',
    deliveryAddress: 'Rua tres, nº 0',
    deliveryNumber: '1',
    saleDate: '2020-05-02T00:00:00.000Z',
    status: 'ENTREGUE',
  },
  {
    id: 3,
    userId: 3,
    sellerId: 3,
    totalPrice: '300.00',
    deliveryAddress: 'Rua quatro, nº 0',
    deliveryNumber: '2',
    saleDate: '2020-05-03T00:00:00.000Z',
    status: 'PREPARANDO',
  },
];

function OrdersPage() {
  const history = useHistory();
  return (
    <>
      <ClientNavBar />
      {saleObjectFormat.map((saleObject, index) => (
        <div
          key={ index }
          className="productsTable"
          aria-hidden="true"
          onClick={ () => { history.push(`/customer/orders/${saleObject.id}`); } }
        >
          <h3>{`Pedido: ${saleObject.id}`}</h3>
          <p>{saleObject.status}</p>
          <p>{saleObject.saleDate}</p>
          <p>{`R$ ${saleObject.totalPrice}`}</p>
        </div>
      ))}
    </>
  );
}

export default OrdersPage;
