import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getAllProducts, getSellersUsers } from '../axios';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]); // Global State to the items in cart.
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const result = await getAllProducts();
      setProducts(result.data);
    };
    getProducts();

    const getSellers = async () => {
      const sellersList = await getSellersUsers();
      console.log(sellersList);
      setSellers(sellersList);
    };

    getSellers();
  }, []);

  const contextValue = {
    itemsInCart,
    setItemsInCart,
    products,
    setProducts,
    user,
    setUser,
    sellers,
    setSellers };

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
