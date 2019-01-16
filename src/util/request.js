import axios from 'axios';
import { getToken } from '@/util/auth';
import store from '@/store';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});

// request interceptor
service.interceptors.request.use(
  config => {
    // AUTH TOKEN
    if (store.getters.token) {      
      config.headers['Authorization'] = 'Bearer ' + getToken();
    }

    // EMPRESA ACTUAL
    if (store.getters.empresa) {      
      const empresa = store.getters.empresa;   
      config.headers['empresa'] = empresa.id;
    }

    return config;
  },
  error => {    
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => response,  
  error => {    
    return Promise.reject(error);
  }
);

export default service;
