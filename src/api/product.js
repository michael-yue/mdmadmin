import request from '@/utils/request'

export function listProduct(currentpage, limit) {
  return request({
    url: '/api/listProduct?t=' + Date.now(),
    method: 'get',
    params: {
      currentpage,
      limit
    }
  })
}

export function updateProduct() {
  return request({
    url: '/api/updateProduct?t=' + Date.now(),
    method: 'post'
  })
}
