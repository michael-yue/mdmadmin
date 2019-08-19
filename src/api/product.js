import request from '@/utils/request'

export function listProductType(currentpage, limit) {
  return request({
    url: '/api/listProductType?t=' + Date.now(),
    method: 'get',
    params: {
      currentpage,
      limit
    }
  })
}

export function listProduct() {
  return request({
    url: '/api/listProduct?t=' + Date.now(),
    method: 'get',
    params: {}
  })
}

export function listProductByType(typeId) {
  return request({
    url: '/api/listProductByType?t=' + Date.now(),
    method: 'get',
    params: {
      typeId
    }
  })
}

// export function listProduct(currentpage, limit) {
//   return request({
//     url: '/api/listProduct?t=' + Date.now(),
//     method: 'get',
//     params: {
//       currentpage,
//       limit
//     }
//   })
// }

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
