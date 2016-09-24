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
        stack.push(token)
        break
      case 'RIGHT_BRACKET':
        {
          let operator = stack.pop()
          queue.push(operator)
          stack.pop() // ここで本当はエラー検知が必要
        }
        break
      case 'TERM':
        queue.push(token)
    }
  }
  return queue
}

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
