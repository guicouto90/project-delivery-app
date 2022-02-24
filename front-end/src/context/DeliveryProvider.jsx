import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DeliveryContext from './DeliveryContext';

function DeliveryProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [products, setProducts] = useState([]);

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
