import request from '@/utils/request'

export function listOpenActivities() {
  return request({
    url: '/api/marketing/listOpenActivities',
    method: 'get',
    params: {}
  })
}
export function listAllActivities() {
  return request({
    url: '/api/marketing/listAllActivities',
    method: 'get',
    params: {}
  })
}

export function listActivity(status, name) {
  return request({
    url: '/api/marketing/listActivity',
    method: 'get',
    params: {
      status,
      name
    }
  })
}

export function listAllGoods(activityid, pagenum, pagesize) {
  return request({
    url: '/api/marketing/listAllGoods',
    method: 'get',
    params: {
      activityid,
      pagenum,
      pagesize
    }
  })
}
