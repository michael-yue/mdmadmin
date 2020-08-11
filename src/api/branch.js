import request from '@/utils/request'

export function getPOSBranch() {
  return request({
    url: '/api/listPOSbranch?t=' + Date.now(),
    method: 'get'
  })
}

export function getWxBranch() {
  return request({
    url: '/api/listwxbranch?t=' + Date.now(),
    method: 'get'
  })
}

export function getMtBranch() {
  return request({
    url: '/api/listmtbranch?t=' + Date.now(),
    method: 'get'
  })
}

export function getBranch(branchid) {
  return request({
    url: '/api/getBranch?t=' + Date.now(),
    method: 'get',
    params: {
      branchid
    }
  })
}

export function updateMtAutoRecieve(branchid, flag) {
  return request({
    url: '/api/updateMtAutoRecieve?t=' + Date.now(),
    method: 'get',
    params: {
      branchid,
      flag
    }
  })
}

export function updateMtRecieveOrder(branchid, flag) {
  return request({
    url: '/api/updateMtRecieveOrder?t=' + Date.now(),
    method: 'get',
    params: {
      branchid,
      flag
    }
  })
}
