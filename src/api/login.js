/* eslint-disable space-before-function-paren */
import request from '@/util/request';

export function login(email, password) {
  const data = {
    email,
    password
  };
  return request({
    url: '/auth/login',
    method: 'post',
    data
  });
}

/*
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  });
}


export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}
*/