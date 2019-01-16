import request from '@/util/request';

export function fetchList(query) {
  return request({
    url: '/empresas',
    method: 'get',
    params: query
  });
}

export function fetchEmpresa(id) {
  return request({
    url: '/empresas/conceptos/' + id,
    method: 'get',
    // params: { id }
  });
}

export function createEmpresa(data) {
  return request({
    url: '/empresas',
    method: 'post',
    data
  });
}

export function updateEmpresa(data) {
  return request({
    url: '/empresas/' + data.id,
    method: 'post',
    data
  });
}