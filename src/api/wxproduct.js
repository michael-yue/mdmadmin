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
