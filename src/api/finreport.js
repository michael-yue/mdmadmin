import request from '@/utils/request'
export function getReportData() {
  return request({
    url: '/api/listProfileReport',
    method: 'get'
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
  console.log(year)
  console.log(month)
  console.log(branchid)
  console.log(monthdata)
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
