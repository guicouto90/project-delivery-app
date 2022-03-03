import { getSaleById, postSale } from '../index';

const newSale = async (itemInCart, user, total) => {
  // const user = JSON.parse(localStorage.getItem('user'));
  console.log(itemInCart);
  const productsDetails = itemInCart.map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
  }));
  const body = {
    userId: user.id,
    sellerId: 2,
    totalPrice: total,
    deliveryAddress: user.deliveryAddress,
    deliveryNumber: Number(user.deliveryNumber),
    productsDetails,
  };
  // REF: https://blog.logrocket.com/using-axios-set-request-headers/
  const config = {
    headers: {
      authorization: user.token,
    },
  };
  console.log(user);
  const response = await postSale(body, config);
  const teste = await getSaleById(response.data.id);
  console.log(teste);
  return response.data;
};

export default newSale;
