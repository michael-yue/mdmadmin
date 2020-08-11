import request from '@/utils/request'

export function portalSales(branchid) {
  return request({
    url: '/api/portalSales?t=' + Date.now(),
    method: 'get',
    params: {
      branchid
    }
  })
}

export function queryStatictisCount(branchid) {
  return request({
    url: '/api/portalStatictis?t=' + Date.now(),
    method: 'get',
    params: {
      branchid
    }
  })
}
