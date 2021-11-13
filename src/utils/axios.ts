import axios from 'axios';
import envConfig from '../config/index';

export const post = async (url: string, data: object) => {
  return axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${envConfig.JETTI_BEARER_TOKEN}`
    }
  });
};

export const get = async (url: string) => {
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${envConfig.JETTI_BEARER_TOKEN}`
      }
    });
  };
  
