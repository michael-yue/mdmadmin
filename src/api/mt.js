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
