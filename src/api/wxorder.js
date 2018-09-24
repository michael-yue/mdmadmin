import request from '@/utils/request'

export function listOrder() {
  return request({
    url: '/api/listWxOrder',
    method: 'get'
  })
}