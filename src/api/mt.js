import request from '@/utils/request'

export function bindBranch(branchid) {
  return request({
    url: '/api/bindMTBranch',
    method: 'get',
    params: {
      branchid
    }
  })
}

export function listAllCatByBranch(branchid) {
  return request({
    url: '/api/listAllCatByBranch',
    method: 'get',
    params: {
      branchid
    }
  })
}

export function listAllProductByBranch(branchid) {
  return request({
    url: '/api/listAllProductByBranch',
    method: 'get',
    params: {
      branchid
    }
  })
}

export function updateFoodCode(branchid, name, categoryName, appFoodCode) {
  return request({
    url: '/api/updateFoodCode',
    method: 'get',
    params: {
      branchid,
      name,
      categoryName,
      appFoodCode
    }
  })
}
