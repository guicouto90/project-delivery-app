import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../axios';
import state01 from '../pages/client-flow/utils/state01';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]); // Global State to the items in cart.
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const result = await getAllProducts();
      setProducts(result.data);
    };
    getProducts();
  }, []);

  const contextValue = { itemsInCart, setItemsInCart, products, setProducts };

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
