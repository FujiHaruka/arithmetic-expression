/**
 * トークンの種類を返す
 */
function kindOf (token) {
  switch (token) {
    case '+':
    case '-':
    case '*':
    case '/':
      return 'OPERATOR'
    case '(':
      return 'LEFT_BRACKET'
    case ')':
      return 'RIGHT_BRACKET'
    default:
      return 'TERM'
  }
}

/**
 * 文字列から逆ポーランド記法の配列を返す
 */
function parse (text) {
  let tokens = text.match(/[-+*/()]|\w+|\s+/g)
                   .filter((token) => !/\s/.test(token))
  let stack = []
  let queue = []

  for (let token of tokens) {
    let kind = kindOf(token)
    switch (kind) {
      case 'OPERATOR':
        stack.push(token)
        break
      case 'LEFT_BRACKET':
        break
      case 'RIGHT_BRACKET':
        {
          let operator = stack.pop()
          queue.push(operator)
        }
        break
      case 'TERM':
        queue.push(token)
    }
  }
  return queue
}

/**
 * parse() で作られた配列から構文木を作る
 */
function makeTree (parsed) {
  let queue = parsed.concat() // コピー
  let stack = []
  while (queue.length > 0) {
    let token = queue.shift()
    let kind = kindOf(token)
    switch (kind) {
      case 'OPERATOR':
        {
          let operator = token
          let right = stack.pop()
          let left = stack.pop()
          stack.push({
            operator, right, left
          })
        }
        break
      case 'TERM':
        stack.push(token)
    }
  }
  return stack[0]
}

module.exports = {
  parse,
  makeTree
}
