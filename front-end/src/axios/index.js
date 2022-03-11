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
const postUsers = async (name, email, password, role = 'customer') => {
  try {
    const response = await axios.post(`${url}/users`, {
      name,
      email,
      password,
      role,
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
// REF: https://blog.logrocket.com/using-axios-set-request-headers/
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
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status: 'Pendente',
      productsDetails,
    }, headers);

    return response;
  } catch (error) {
    console.error(error.message);
  }
};

const getAllSales = async () => {
  try {
    const response = await axios.get(`${url}/sales`);
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

// PUT SALE STATUS
const putSaleStatus = async (id, status) => {
  try {
    const response = await axios.put(`${url}/sales/${id}`, {
      status,
    });

    return response;
  } catch (error) {
    console.error(error.message);
  }
};

// GET SELLERS USERS
const getSellersUsers = async () => {
  try {
    const response = await axios.get(`${url}/users/seller`);

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

// GET SELLERS AND CUTOMER USERS WITH A VALID TOKEN
const getUsersToAdmin = async (token) => {
  console.log('aoba');
  try {
    const response = await axios.get(`${url}/users/admin`, {
      headers: {
        authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

// DELETE USER BY ID WITH A VALID TOKEN
const deleteUserById = async (id, token) => {
  try {
    const response = await axios.delete(`${url}/users/${id}`, {
      headers: {
        authorization: token,
      },
    });

    return response;
  } catch (error) {
    console.error(error.message);
  }
};

export {
  postLogin,
  postUsers,
  getAllProducts,
  getAllSales,
  postSale,
  getSaleById,
  putSaleStatus,
  getSellersUsers,
  getUsersToAdmin,
  deleteUserById,
};
