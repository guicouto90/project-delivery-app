import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { getAllProducts, getAllSales, getSellersUsers } from '../axios';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [sale, setSale] = useState({});
  const [delivery, setDelivery] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [dispatch, setDispatch] = useState(false);

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
    delivery,
    setDelivery,
    preparing,
    setPreparing,
    dispatch,
    setDispatch,
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
