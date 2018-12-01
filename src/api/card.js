import request from '@/utils/request'

export function listAll(branchid) {
  return request({
    url: '/api/listCardsAll',
    method: 'get',
    params: {
      branchid
    }
  })
}
