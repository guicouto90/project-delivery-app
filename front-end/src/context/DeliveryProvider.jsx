import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getAllProducts, getAllSales, getSellersUsers } from '../axios';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [sale, setSale] = useState({});
  const [orderId, setOrderId] = useState(0);
  const [updateStatus, setUpdateStatus] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const result = await getAllProducts();
      setProducts(result.data);
    };
    getProducts();

    const getSellers = async () => {
      const sellersList = await getSellersUsers();
      setSellers(sellersList);
    };

    getSellers();

    const getSales = async () => {
      const salesList = await getAllSales();
      setOrders(salesList.data);
    };
    getSales();
  }, []);

  const contextValue = {
    itemsInCart,
    setItemsInCart,
    products,
    setProducts,
    user,
    setUser,
    sellers,
    setSellers,
    orders,
    setOrders,
    sale,
    setSale,
    orderId,
    setOrderId,
    updateStatus,
    setUpdateStatus,
  };

  return (
    <DeliveryContext.Provider value={ contextValue }>
      { children }
    </DeliveryContext.Provider>
  );
}
DeliveryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DeliveryProvider;
