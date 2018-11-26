import request from '@/utils/request'

export function listProduct() {
  return request({
    url: '/api/listProduct?t=' + Date.now(),
    method: 'get'
  })
}

export function updateProduct() {
  return request({
    url: '/api/updateProduct?t=' + Date.now(),
    method: 'post'
  })
}
