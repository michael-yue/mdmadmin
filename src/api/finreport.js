import request from '@/utils/request'
export function getReportData() {
  return request({
    url: '/api/listProfileReport',
    method: 'get'
  })
}

export function getProfileMonthData() {
  return request({
    url: '/api/listProfileMonth',
    method: 'get'
  })
}

export function saveProfileMonthData(month, branchid, monthdata) {
  console.log(month)
  console.log(branchid)
  console.log(monthdata)
  return request({
    url: '/api/saveProfileMonthData',
    method: 'post',
    data: {
      month,
      branchid,
      monthdata
    }
  })
}
