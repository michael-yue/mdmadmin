import request from '@/utils/request'

export function listWxOrder(branchid, transdate) {
  return request({
    url: '/api/listWxOrder',
    method: 'get',
    params: {
      branchid,
      transdate
    }
  })
}
export function resendOrder(billid) {
  return request({
    url: '/api/resendOrder',
    method: 'post',
    data: {
      billid
    }
  })
}

export function listMeituanOrder(branchid, transdate) {
  return request({
    url: '/api/listMeituanOrder',
    method: 'get',
    params: {
      branchid,
      transdate
    }
  })
}
