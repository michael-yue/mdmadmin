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
