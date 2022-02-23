import React, { useContext, useEffect } from 'react';
import DeliveryContext from '../../context/DeliveryContext';

const productsMock = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: '2.20',
    url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: '7.50',
    url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
    price: '2.49',
    url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
  },
  {
    id: 4,
    name: 'Brahma 600ml',
    price: '7.50',
    url_image: 'http://localhost:3001/images/brahma_600ml.jpg',
  },
  {
    id: 5,
    name: 'Skol 269ml',
    price: '2.19',
    url_image: 'http://localhost:3001/images/skol_269ml.jpg',
  },
  {
    id: 6,
    name: 'Skol Beats Senses 313ml',
    price: '4.49',
    url_image: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
  },
  {
    id: 7,
    name: 'Becks 330ml',
    price: '4.99',
    url_image: 'http://localhost:3001/images/becks_330ml.jpg',
  },
  {
    id: 8,
    name: 'Brahma Duplo Malte 350ml',
    price: '2.79',
    url_image: 'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg',
  },
  {
    id: 9,
    name: 'Becks 600ml',
    price: '8.89',
    url_image: 'http://localhost:3001/images/becks_600ml.jpg',
  },
  {
    id: 10,
    name: 'Skol Beats Senses 269ml',
    price: '3.57',
    url_image: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
  },
  {
    id: 11,
    name: 'Stella Artois 275ml',
    price: '3.49',
    url_image: 'http://localhost:3001/images/stella_artois_275ml.jpg',
  },
];
productsMock.forEach((product) => { product.quantity = 0; });

function ProductsPage() {
  const { products, setProducts } = useContext(DeliveryContext);

  useEffect(() => {
    setProducts(productsMock);
  }, [products, setProducts]);

  const calculatePrice = (productsArray) => {
    const price = productsArray
      .reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    return price;
  };

  return (
    <>
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
                    setProducts([...productsMock]);
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
                    productsMock[index].quantity += 1;
                    setProducts([...productsMock]);
                  } }
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button type="button">
        {`Ver Carrinho: R$ ${calculatePrice(products).toFixed(2)}`}
      </button>
    </>
  );
}

export default ProductsPage;
