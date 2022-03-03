import axios from 'axios';

const url = 'http://localhost:3001';

// LOGIN
const postLogin = async (email, password) => {
  try {
    const response = await axios.post(`${url}/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

// NEW USER
const postUsers = async (name, email, password) => {
  try {
    const response = await axios.post(`${url}/users`, {
      name,
      email,
      password,
      role: 'customer',
    });
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

// GET PRODUCTS
const getAllProducts = async () => {
  try {
    const response = await axios.get(`${url}/products`);
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

// POST SALE
const postSale = async (body, headers) => {
  const {
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    productsDetails } = body;
  try {
    const response = await axios.post(`${url}/sales`, {
      user_id: userId,
      seller_id: sellerId,
      total_price: totalPrice,
      delivery_address: deliveryAddress,
      delivery_number: deliveryNumber,
      status: 'Pendente',
      productsDetails,
    }, headers);

    return response;
  } catch (error) {
    console.error(error.message);
  }
};

// GET SALE BY ID
// https://axios-http.com/ptbr/docs/example
const getSaleById = async (id) => {
  try {
    const response = await axios.get(`${url}/sales/${id}`, {
      params: {
        id,
      },
    });
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

export { postLogin, postUsers, getAllProducts, postSale, getSaleById };
