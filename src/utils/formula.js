const symbol = ['#', '(', '+', '-', '*', '/', ')']
const symbolPriority = {
  '#': 0,
  '(': 1,
  '+': 2,
  '-': 2,
  '*': 3,
  '/': 3,
  ')': 4
}
// 如果遇到左括号则直接入栈
// 如果遇到右括号,则弹出站内只到出现左括号为止
// 如果站外操作符的优先级高于站内的优先级则入栈
// 如果栈外的操作符优先级低于或等于栈内的优先级，输出栈内的符号，并入栈栈外的符号
// 中缀表达式遍历完成，但是栈中还有符号存在，一一出栈输出
function operaSymbol(char, symArr, resArr) {
  let lastChar = symArr[symArr.length - 1]
  if (!lastChar) {
    symArr.push(char)
    return
  }
  if (char === '(') {
    symArr.push(char)
  } else if (char === ')') {
    let curChar = symArr.pop()
    while (curChar !== '(' && curChar !== null) {
      resArr.push(curChar)
      curChar = symArr.pop()
    }
  } else if (symbolPriority[char] > symbolPriority[lastChar]) {
    symArr.push(char)
  } else if (symbolPriority[char] <= symbolPriority[lastChar]) {
    while (lastChar && (symbolPriority[char] <= symbolPriority[lastChar])) {
      const curChar1 = symArr.pop()
      resArr.push(curChar1)
      lastChar = symArr[symArr.length - 1]
    }
    symArr.push(char)
  } else {
    symArr.push(char)
  }
}

function toSuffixExpre(str) {
  var resArr = []
  var symArr = []
  // 用于记录数字
  var substr = ''
  for (var i = 0, len = str.length; i < len; i++) {
    // 判断是否是符号
    if (symbol.includes(str[i])) {
      resArr.push(substr)
      substr = ''
      operaSymbol(str[i], symArr, resArr)
    } else {
      substr += str[i]
      // resArr.push(str[i])
    }
  }
  resArr.push(substr)
  while (symArr.length > 0) {
    var curChar = symArr.pop()
    resArr.push(curChar)
  }
  var result = resArr.join(' ')
  return result
}
//  运算符计算
function count(opera, num1, num2) {
  switch (opera) {
    case '+':
      return Number(Number(num2) + Number(num1)).toFixed(2)
    case '-':
      return Number(Number(num2) - Number(num1)).toFixed(2)
    case '*':
      return Number(Number(num2) * Number(num1)).toFixed(2)
    case '/':
      return (Number(num1) === 0) ? 0 : Number(Number(num2) / Number(num1)).toFixed(4)
  }
}
// 字符串计算，输入参数为表达式
export function calcStr(str) {
  const expr = toSuffixExpre(str)
  if (!expr) {
    return 0
  }
  // 字符串为空，返回0
  let arr = expr.split(' ')
  arr = arr.filter(function(val) {
    return !(!val || val === '')
  })
  const elems = []
  let item = arr.shift()
  while (item) {
    if (!isNaN(item)) {
      elems.push(item)
    } else {
      const res = count(item, elems.pop(), elems.pop())
      elems.push(res)
    }
    item = arr.shift()
  }
  return elems.pop()
}
// type: 1: planamount, 2: planpercent 3: actualamount 4:actualpercent
function getformula(data, i, type) {
  if (type === 1 || type === 3) {
    // console.log(data[i].itemname + '=' + data[i].itemformula)
    return toSuffixExpre(data[i].itemformula)
  } else if (type === 2 || type === 4) {
    // console.log(data[i].itemname + '=' + data[i].itemformula)
    return toSuffixExpre(data[i].itempercentformula)
  } else {
    return null
  }
}
export function calc(data, i, type) {
  const expr = getformula(data, i, type)
  if (!expr) {
    return data
  }
  // 字符串为空，返回0
  let arr = expr.split(' ')
  arr = arr.filter(function(val) {
    return !(!val || val === '')
  })
  // arr中的数字转换成data中的amount
  // arr = arr.filter(function(val) {
  //   if (symbol.includes(val)) {
  //     // return val
  //     return 1
  //   } else {
  //     console.log(val)
  //     const a = data.find((element) => (element.itemid === Number(val)))
  //     console.log('found ===========================')
  //     console.log(a)
  //     // return a.planamount
  //     return 2
  //   }
  // })
  for (let i = 0; i < arr.length; i++) {
    if (!symbol.includes(arr[i])) {
      const a = data.find((element) => (element.itemid === Number(arr[i])))
      if (type === 1 || type === 2) {
        arr[i] = Number(a.planamount)
      } else {
        arr[i] = Number(a.actualamount)
      }
    }
  }
  // 计算
  const elems = []
  let item = arr.shift()
  while (typeof (item) !== 'undefined') {
    if (!isNaN(item)) {
      elems.push(item)
    } else {
      const res = count(item, elems.pop(), elems.pop())
      elems.push(res)
    }
    item = arr.shift()
  }
  const poped = elems.pop()
  if (type === 1) {
    data[i].planamount = poped
  } else if (type === 2) {
    data[i].planpercent = poped
  } else if (type === 3) {
    data[i].actualamount = poped
  } else if (type === 4) {
    data[i].actualpercent = poped
  }
  return data
}
