/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}
/**
 * 日期选择方法
 */
export function getYesterday() {
  const now = new Date()
  return new Date(now.getTime() - 1000 * 60 * 60 * 24)
}

export function getThisPeriodStart() {
  var today = new Date()
  var year = today.getFullYear()
  var month = today.getMonth()
  var day = 1
  if (today.getDate() > 20) {
    day = 21
  } else if (today.getDate() > 10) {
    day = 11
  } else {
    day = 1
  }
  var thisstart = new Date(year, month, day)
  return thisstart
}

export function getThisPeriodEnd() {
  var today = new Date()
  var year = today.getFullYear()
  var month = today.getMonth()
  var day = 1
  if (today.getDate() <= 10) {
    day = 10
  } else if (today.getDate() <= 20) {
    day = 20
  } else {
    month++
    if (month > 12) {
      month = 1
      year++
    }
    var new_date = new Date(year, month, 1)
    day = new Date(new_date.getTime() - 1000 * 60 * 60 * 24).getDate()
    month--
  }
  var thisend = new Date(year, month, day)
  return thisend
}

export function getLastPeriodStart() {
  var today = new Date()
  var year = today.getFullYear()
  var month = today.getMonth()
  var day = 1
  if (today.getDate() > 20) {
    day = 11
  } else if (today.getDate() > 10) {
    day = 1
  } else {
    day = 21
    if (month < 0) {
      return new Date(year - 1, 11, day)
    } else {
      return new Date(year, month - 1, day)
    }
  }
  return new Date(year, month, day)
}

export function getLastPeriodEnd() {
  var today = new Date()
  var year = today.getFullYear()
  var month = today.getMonth()
  var day = 1
  if (today.getDate() > 20) {
    day = 20
  } else if (today.getDate() > 10) {
    day = 10
  } else {
    var new_date = new Date(year, month, 1)
    var newday = new Date(new_date.getTime() - 1000 * 60 * 60 * 24).getDate()
    return new Date(year, month - 1, newday)
  }
  return new Date(year, month, day)
}

export function getThisMonthStart() {
  var today = new Date()
  var year = today.getFullYear()
  var month = today.getMonth()
  return new Date(year, month, 1)
}

export function getThisMonthEnd() {
  var today = new Date()
  var year = today.getFullYear()
  var month = today.getMonth()
  month++
  if (month > 12) {
    month = 1
    year++
  }
  var new_date = new Date(year, month, 1)
  var newday = new Date(new_date.getTime() - 1000 * 60 * 60 * 24).getDate()
  return new Date(year, today.getMonth(), newday)
}

export function getLastMonthStart() {
  var today = new Date()
  var year = today.getFullYear()
  var month = today.getMonth()
  if (month === 1) {
    month = 12
    year--
  } else {
    month--
  }
  return new Date(year, month, 1)
}

export function getLastMonthEnd() {
  var today = new Date()
  var year = today.getFullYear()
  var month = today.getMonth()
  if (month === 1) {
    month = 12
    year--
  } else {
    month--
  }
  var new_date = new Date(year, month + 1, 1)
  return new Date(new_date.getTime() - 1000 * 60 * 60 * 24)
}
