import request from '@/utils/request'

export function listAllProductType(currentpage, limit) {
  return request({
    url: '/api/listAllProductType?t=' + Date.now(),
    method: 'get',
    params: {
      currentpage,
      limit
    }
  })
}

export function listAllProduct() {
  return request({
    url: '/api/listProduct?t=' + Date.now(),
    method: 'get',
    params: {}
  })
}

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

export function createProduct(param) {
  return request({
    url: '/api/createProduct?t=' + Date.now(),
    method: 'post',
    data: {
      param
    }
  })
}

export function updateProduct(param) {
  return request({
    url: '/api/updateProduct?t=' + Date.now(),
    method: 'post',
    data: {
      param
    }
  })
}

export function createProductType(param) {
  return request({
    url: '/api/createProductType?t=' + Date.now(),
    method: 'post',
    data: {
      param
    }
  })
}

export function updateProductType(param) {
  return request({
    url: '/api/updateProductType?t=' + Date.now(),
    method: 'post',
    data: {
      param
    }
  })
}
