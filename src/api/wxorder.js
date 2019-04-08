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
export function listWxOrderPage(branchid, transdate, pagesize, pagenum) {
  return request({
    url: '/api/listWxOrderPage',
    method: 'get',
    params: {
      branchid,
      transdate,
      pagesize,
      pagenum
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

export function wxRefund(branchid, billid, prodid, prodzf, refundnum) {
  return request({
    url: '/api/wxRefund',
    method: 'post',
    data: {
      branchid,
      billid,
      prodid,
      prodzf,
      refundnum
    }
  })
}
export function listMeituanOrder(branchid, transdate) {
  return request({
    url: '/api/listMtOrder',
    method: 'get',
    params: {
      branchid,
      transdate
    }
  })
}
