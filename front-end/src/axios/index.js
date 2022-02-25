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
<<<<<<< HEAD
    console.error(error.message);
=======
    console.error(error);
>>>>>>> f223b72a0860aab9295a6d706aa20382f5a44852
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
    console.log(response);
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

<<<<<<< HEAD
export { postLogin, postUsers, getAllProducts };
=======
const getAllProducts = async () => {
  try {
    const response = await axios.get(`${url}/products`);
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

export { postLogin, getAllProducts };
>>>>>>> f223b72a0860aab9295a6d706aa20382f5a44852
