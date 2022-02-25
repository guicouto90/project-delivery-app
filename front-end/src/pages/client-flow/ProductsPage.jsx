import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import DeliveryContext from '../../context/DeliveryContext';
import ClientNavBar from './utils/ClientNavBar';

function ProductsPage() {
  const { products, setProducts, setItemsInCart } = useContext(DeliveryContext);
  const history = useHistory();

  useEffect(() => {}, [products]);
  const productsAux = [...products];
  productsAux.forEach((product) => { if (!product.quantity) product.quantity = 0; });

  const calculatePrice = (productsArray) => {
    const price = productsArray
      .reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    return price;
  };

  return (
    <>
      <ClientNavBar />
      <div className="productsTable">
        { products.map((product, index) => {
          const prefix = 'customer_products__';
          // const newPrice = product.price.replace(/\./, ',');
          return (
            <div className="productCard" key={ index }>
              <h1 data-testid={ `${prefix}element-card-price-${product.id}` }>
                {product.price.replace(/\./, ',')}
              </h1>
              <img
                src={ product.url_image }
                alt={ product.name }
                data-testid={ `${prefix}img-card-bg-image-${product.id}` }
              />
              <p data-testid={ `${prefix}element-card-title-${product.id}` }>
                {product.name}
              </p>
              <div className="productsTable">
                <button
                  type="button"
                  data-testid={ `${prefix}button-card-rm-item-${product.id}` }
                  disabled={ product.quantity === 0 }
                  onClick={ () => {
                    product.quantity -= 1;
                    setProducts([...productsAux]);
                  } }
                >
                  -
                </button>
                <input
                  className="cardInput"
                  defaultValue={ product.quantity }
                  onChange={ () => {
                    setProducts([...productsAux]);
                  } }
                  data-testid={ `${prefix}input-card-quantity-${product.id}` }
                />
                <button
                  type="button"
                  data-testid={ `${prefix}button-card-add-item-${product.id}` }
                  onClick={ () => {
                    productsAux[index].quantity += 1;
                    setProducts([...productsAux]);
                  } }
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        data-testid="customer_products__checkout-bottom-value"
        onClick={ () => {
          const cartItems = products.filter((product) => product.quantity !== 0);
          setItemsInCart(cartItems);
          history.push('/customer/checkout');
        } }
      >
        {`${calculatePrice(products).toFixed(2).replace(/\./, ',')}`}
      </button>
    </>
  );
}

export default ProductsPage;
