import request from '@/utils/request'

export function listAll(branchid, currentpage, limit) {
  return request({
    url: '/api/listCardsAll',
    method: 'get',
    params: {
      branchid,
      currentpage,
      limit
    }
  })
}
export function listStatByBranch(startdate, enddate, amount) {
  return request({
    url: '/api/listStatByBranch',
    method: 'get',
    params: {
      startdate,
      enddate,
      amount
    }
  })
}

export function listCardRechargeSum(branchid, startdate, enddate) {
  return request({
    url: '/api/listCardRechargeSum',
    method: 'get',
    params: {
      branchid,
      startdate,
      enddate
    }
  })
}

export function listCardRechargeGroup(branchid, startdate, enddate) {
  return request({
    url: '/api/listCardRechargeGroup',
    method: 'get',
    params: {
      branchid,
      startdate,
      enddate
    }
  })
}
