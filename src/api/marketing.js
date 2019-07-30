import request from '@/utils/request'

export function listOpenActivities() {
  return request({
    url: '/api/marketing/listOpenActivities',
    method: 'get',
    params: {}
  })
}

export function listAllActivities(pagenum, pagesize) {
  return request({
    url: '/api/marketing/listAllActivities',
    method: 'get',
    params: {
      pagenum,
      pagesize
    }
  })
}

export function listActivity(status, name) {
  return request({
    url: '/api/marketing/listActivity',
    method: 'get',
    params: {
      status,
      name
    }
  })
}

export function listAllGoods(activityid, pagenum, pagesize) {
  return request({
    url: '/api/marketing/listAllGoods',
    method: 'get',
    params: {
      activityid,
      pagenum,
      pagesize
    }
  })
}

export function createActivity(param) {
  return request({
    url: '/api/marketing/createActivity',
    method: 'post',
    data: {
      param
    }
  })
}

export function updateActivity(param) {
  return request({
    url: '/api/marketing/updateActivity',
    method: 'post',
    data: {
      param
    }
  })
}

export function startActivity(param) {
  return request({
    url: '/api/marketing/startActivity',
    method: 'post',
    data: {
      param
    }
  })
}
export function stopActivity(param) {
  return request({
    url: '/api/marketing/stopActivity',
    method: 'post',
    data: {
      param
    }
  })
}
export function closeActivity(param) {
  return request({
    url: '/api/marketing/closeActivity',
    method: 'post',
    data: {
      param
    }
  })
}

export function createGoods(param) {
  return request({
    url: '/api/marketing/createGoods',
    method: 'post',
    data: {
      param
    }
  })
}

export function updateGoods(param) {
  return request({
    url: '/api/marketing/updateGoods',
    method: 'post',
    data: {
      param
    }
  })
}

export function listActivitiesReport(activityId) {
  return request({
    url: '/api/marketing/listActivitiesReport',
    method: 'get',
    params: {
      activityId
    }
  })
}

export function saveBranchGoods(param) {
  return request({
    url: '/api/marketing/saveBranchGoods',
    method: 'post',
    data: {
      param
    }
  })
}

export function listAllGoodsByBranch(branchId, activityId) {
  return request({
    url: '/api/marketing/listAllGoodsByBranch',
    method: 'get',
    params: {
      branchId,
      activityId
    }
  })
}
