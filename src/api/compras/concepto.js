import request from '@/util/request';

export function fetchList(query) {
  return request({
    url: '/compras/conceptos',
    method: 'get',
    params: query
  });
}

export function fetchConcepto(id) {
  return request({
    url: '/compras/conceptos/' + id,
    method: 'get',
    // params: { id }
  });
}

export function createConcepto(data) {
  return request({
    url: '/compras/conceptos',
    method: 'post',
    data
  });
}

export function updateConcepto(data) {
  return request({
    url: '/compras/conceptos/' + data.id,
    method: 'post',
    data
  });
}

export function deleteConcepto(id) {
  return request({
    url: '/compras/conceptos/' + id,
    method: 'delete',    
  });
}
