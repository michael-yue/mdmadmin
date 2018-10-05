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
  var lastChar = symArr[symArr.length - 1]
  if (!lastChar) {
    symArr.push(char)
    return
  }
  if (char === '(') {
    symArr.push(char)
  } else if (char === ')') {
    var curChar = symArr.pop()
    while (curChar !== '(' && curChar !== null) {
      resArr.push(curChar)
      curChar = symArr.pop()
    }
  } else if (symbolPriority[char] > symbolPriority[lastChar]) {
    symArr.push(char)
  } else if (symbolPriority[char] <= symbolPriority[lastChar]) {
    while (lastChar && (symbolPriority[char] <= symbolPriority[lastChar])) {
      var curChar1 = symArr.pop()
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
      return Number(num2) + Number(num1)
    case '-':
      return Number(num2) - Number(num1)
    case '*':
      return Number(num2) * Number(num1)
    case '/':
      return Number(num2) / Number(num1)
  }
}
export function calc(str) {
  var expr = toSuffixExpre(str)
  if (!expr) {
    return 0
  }
  // 字符串为空，返回0
  var arr = expr.split(' ')
  arr = arr.filter(function(val) {
    return !(!val || val === '')
  })
  var elems = []
  var item = arr.shift()
  while (item) {
    if (!isNaN(item)) {
      elems.push(item)
    } else {
      var res = count(item, elems.pop(), elems.pop())
      elems.push(res)
    }
    item = arr.shift()
  }
  return elems.pop()
}
