import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://blockchain.info',
  headers: {
    'Content-Type': 'application/json',
  },
});
