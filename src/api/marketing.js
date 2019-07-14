import request from '@/utils/request'

export function listActivity(status, name) {
  return request({
    url: '/api/listActivity',
    method: 'get',
    params: {
      status,
      name
    }
  })
}

export function listAllGoods(status, name) {
  return request({
    url: '/api/listActivity',
    method: 'get',
    params: {
      status,
      name
    }
  })
}
