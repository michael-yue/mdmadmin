import request from '@/utils/request'
export function getReportData(fromyear, frommonth, toyear, tomonth, branchid, type) {
  return request({
    url: '/api/listProfileReport',
    method: 'get',
    params: {
      fromyear,
      frommonth,
      toyear,
      tomonth,
      branchid,
      type
    }
  })
}

export function getProfileMonthData(year, month, branchid) {
  return request({
    url: '/api/listProfileMonth',
    method: 'get',
    params: {
      year,
      month,
      branchid
    }
  })
}

export function saveProfileMonthData(year, month, branchid, monthdata) {
  return request({
    url: '/api/saveProfileMonthData',
    method: 'post',
    data: {
      year,
      month,
      branchid,
      monthdata
    }
  })
}
