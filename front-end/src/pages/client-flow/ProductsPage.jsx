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
          return (
            <div className="productCard" key={ index }>
              <h1 data-testid={ `${prefix}element-card-price-${index}` }>
                R$
                {product.price}
              </h1>
              <img
                src={ product.url_image }
                alt={ product.name }
                data-testid={ `${prefix}img-card-bg-image-${index}` }
              />
              <p data-testid={ `${prefix}element-card-title-${index}` }>{product.name}</p>
              <div className="productsTable">
                <button
                  type="button"
                  data-testid={ `${prefix}button-card-rm-item-${index}` }
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
                  value={ product.quantity }
                  data-testid={ `${prefix}input-card-quantity-${index}` }
                />
                <button
                  type="button"
                  data-testid={ `${prefix}button-card-add-item-${index}` }
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
        data-testid="customer_products__button-checkout"
        onClick={ () => {
          const cartItems = products.filter((product) => product.quantity !== 0);
          setItemsInCart(cartItems);
          history.push('/customer/checkout');
        } }
      >
        {`Ver Carrinho: R$ ${calculatePrice(products).toFixed(2)}`}
      </button>
    </>
  );
}

export default ProductsPage;
