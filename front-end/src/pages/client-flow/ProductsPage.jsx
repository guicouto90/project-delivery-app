import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllProducts } from '../../axios';

import DeliveryContext from '../../context/DeliveryContext';
import CustomNavBar from '../components/CustomNavBar';

function ProductsPage() {
  const { products, setProducts, setItemsInCart } = useContext(DeliveryContext);
  const history = useHistory();

  useEffect(() => {
    const getProducts = async () => {
      const result = await getAllProducts();
      setProducts(result.data);
    };
    if (!products[0]) getProducts();
  }, [products]);

  const productsAux = [...products];
  productsAux.forEach((product) => { if (!product.quantity) product.quantity = 0; });

  const calculatePrice = (productsArray) => {
    const price = productsArray
      .reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    return price;
  };

  return (
    <>
      <CustomNavBar />
      <div className="productsTable">
        { products.map((product, index) => {
          const prefix = 'customer_products__';
          return (
            <div className="productCard" key={ index }>
              <h1 data-testid={ `${prefix}element-card-price-${product.id}` }>
                {`R$ ${product.price.replace(/\./, ',')}`}
              </h1>
              <img
                className="productimg"
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
                  value={ product.quantity }
                  onChange={ (e) => {
                    const filteredInput = Number(e.target.value.replace(/\D/g, ''));
                    product.quantity = filteredInput;
                    setProducts([...productsAux]);
                  } }
                  data-testid={ `${prefix}input-card-quantity-${product.id}` }
                />
                <button
                  type="button"
                  data-testid={ `${prefix}button-card-add-item-${product.id}` }
                  onClick={ () => {
                    product.quantity += 1;
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
        className="totalprice"
        type="button"
        data-testid="customer_products__button-cart"
        disabled={ calculatePrice(products) === 0 }
        onClick={ () => {
          const cartItems = products.filter((product) => product.quantity !== 0);
          setItemsInCart(cartItems);
          history.push('/customer/checkout');
        } }
      >
        R$
        {' '}
        <p
          data-testid="customer_products__checkout-bottom-value"
        >
          {`${calculatePrice(products).toFixed(2).replace(/\./, ',')}`}

        </p>
      </button>
    </>
  );
}

export default ProductsPage;
