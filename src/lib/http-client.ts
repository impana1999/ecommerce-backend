import Axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com/';

const axios = Axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

export default axios;
