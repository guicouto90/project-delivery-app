import axios from 'axios';

const url = 'http://localhost:3001';

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

export default postUsers;
