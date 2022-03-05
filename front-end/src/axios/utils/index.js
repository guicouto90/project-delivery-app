import { postSale } from '../index';

const tokenA = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ';
const tokenB = '1c2VyIjoiYWxsYW5AZ21haWwuY29tIiwiaWF0IjoxNjQ2NDIxNTY';
const tokenC = 'zLCJleHAiOjE2NDcwMjYzNjN9.5fn2RV70cUgZoSDH8FN5Msiv_bAgrgBx4-frsg7KIsQ';

const newSale = async (itemInCart, input, total) => {
  console.log(total);
  let { user } = localStorage;
  if (user) user = JSON.parse(user);
  if (!user) {
    user = {
      id: 3,
      deliveryAddress: 'Rua do xablau',
      deliveryNumber: 171,
      token: `${tokenA}${tokenB}${tokenC}` };
  }

  const productsDetails = itemInCart.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
  }));
  const body = {
    userId: user.id,
    sellerId: 2,
    totalPrice: total,
    deliveryAddress: input.deliveryAddress,
    deliveryNumber: Number(input.deliveryNumber),
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
