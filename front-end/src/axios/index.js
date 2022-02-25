import axios from 'axios';

const url = 'http://localhost:3001';

// LOGIN
const postLogin = async (email, password) => {
  try {
    console.log('xablau1');
    const response = await axios.post(`${url}/login`, {
      email,
      password,
    });
    console.log(response);
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
    console.log(response);
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

export { postLogin, postUsers };
