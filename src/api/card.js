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

