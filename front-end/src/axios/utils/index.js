import { postSale } from '../index';

const newSale = async (itemInCart, user, total) => {
  const productsDetails = itemInCart.map((item) => ({
    productId: item.id,
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

  const response = await postSale(body, config);

  return response.data;
};

export default newSale;
