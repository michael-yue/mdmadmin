import request from '@/utils/request'
export function getReportData(fromyear, frommonth, toyear, tomonth, branchid, type) {
  return request({
    url: '/api/listProfileReport?t=' + Date.now(),
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
    url: '/api/listProfileMonth?t=' + Date.now(),
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

export function getProfileReportItems() {
  return request({
    url: '/api/getProfileReportItems?t=' + Date.now(),
    method: 'get',
    params: { }
  })
}
// 营运报表API
export function getCashReportData(branchid, repdatefrom, repdateto) {
  return request({
    url: '/api/getCashReport?t=' + Date.now(),
    method: 'get',
    params: {
      branchid,
      repdatefrom,
      repdateto
    }
  })
}
export function getCashPeriodReportData(branchid, repdatefrom, repdateto) {
  return request({
    url: '/api/getCashPeriodReport?t=' + Date.now(),
    method: 'get',
    params: {
      branchid,
      repdatefrom,
      repdateto
    }
  })
}
export function getSalesReportData(branchid, repdatefrom, repdateto) {
  return request({
    url: '/api/getSalesReport?t=' + Date.now(),
    method: 'get',
    params: {
      branchid,
      repdatefrom,
      repdateto
    }
  })
}
