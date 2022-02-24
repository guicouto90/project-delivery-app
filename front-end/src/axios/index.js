import axios from 'axios';

const url = 'http://localhost:3001';

/* import axios from "axios"
const URL = 'http://localhost:3001/tasks'

const getTasks = async () => {
  try {
    const response = await axios.get(URL);
    const tasks = await response.data;
    return tasks;
  } catch (error) {
    console.error(error);
  }
}; */

// adicionar infos
const postLogin = async (email, password) => {
  try {
    const response = await axios.post(`${url}/login`, {
      email,
      password,
    });
    console.log(response);
    return response;
  } catch (error) {
    // const error =
    console.error(error.message);
  }
};

/*
const editTask = async (id, status) => {
  try {
    const response = await axios.put(`${URL}/${id}`, {
      status,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}; */

const getAllProducts = async () => {
  try {
    const response = await axios.get(`${url}/products`);
    return response;
  } catch (error) {
    console.error(error.message);
  }
};

export { postLogin, getAllProducts };
