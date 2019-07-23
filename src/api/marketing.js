import request from '@/utils/request'

export function listOpenActivities() {
  return request({
    url: '/api/listOpenActivities',
    method: 'get',
    params: {}
  })
}
export function listAllActivities() {
  return request({
    url: '/api/listAllActivities',
    method: 'get',
    params: {}
  })
}

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
