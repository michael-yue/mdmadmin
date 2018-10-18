import request from '@/utils/request'

export function listProductByBranch(branchid) {
  return request({
    url: '/api/listWxProductsByBranch?t=' + Date.now(),
    method: 'get',
    params: {
      branchid
    }
  })
}
export function updateWxProductOnsale(branchid, productid, onsaleflag) {
  return request({
    url: '/api/updateWxProductOnsale',
    method: 'post',
    data: {
      branchid,
      productid,
      onsaleflag
    }
  })
}

export function listMtProductByBranch(branchid) {
  return request({
    url: '/api/listMtProductsByBranch?t=' + Date.now(),
    method: 'get',
    params: {
      branchid
    }
  })
}
export function mapMtProductsByBranch(branchid, products) {
  return request({
    url: '/api/mapMtProductsByBranch',
    method: 'post',
    data: {
      branchid,
      products
    }
  })
}
