import request from '@/utils/request'

export function listOrder(branchid, transdate) {
  return request({
    url: '/api/listWxOrder',
    method: 'get',
    params: {
      branchid,
      transdate
    }
  })
}
