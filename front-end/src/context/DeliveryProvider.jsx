import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../axios';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]); // Global State to the items in cart.
  const [products, setProducts] = useState([]);

  const contextValue = { itemsInCart, setItemsInCart, products, setProducts };

  useEffect(() => {
    getAllProducts().then((res) => setProducts(res.data));
  }, []);

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
