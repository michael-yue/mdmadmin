import request from '@/utils/request'

export function getWxBranch() {
  return request({
    url: '/api/listwxbranch',
    method: 'get'
  })
}
export function listProductByBranch(branchid) {
  return request({
    url: '/api/listWxProductsByBranch',
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
