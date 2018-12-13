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
