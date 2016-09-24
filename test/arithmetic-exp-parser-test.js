const assert = require('assert')
const {parse, makeTree} = require('../lib/arithmetic-exp-parser')

describe('arithmetic-exp-parser', () => {
  it('(x + 1)', () => {
    let term = '(x + 1)'
    let parsed = parse(term)
    let tree = makeTree(parsed)
    assert.deepEqual(
      parsed,
      ['x', '1', '+']
    )
    assert.deepEqual(
      tree,
      { operator: '+', left: 'x', right: '1' }
    )
  })

  it('(a + (9 * b))', () => {
    let term = '(a + (9 * b))'
    let parsed = parse(term)
    let tree = makeTree(parsed)
    assert.deepEqual(
      parsed,
      ['a', '9', 'b', '*', '+']
    )
    assert.deepEqual(
      tree,
      {
        operator: '+',
        left: 'a',
        right: {
          operator: '*',
          left: '9',
          right: 'b'
        }
      }
    )
  })

  it('(1 + (((x / 3) - 6) + (j + (k * n))))', () => {
    let term = '(1 + (((x / 3) - 6) + (j + (k * n))))'
    let parsed = parse(term)
    let tree = makeTree(parsed)
    assert.deepEqual(
      parsed,
      ['1', 'x', '3', '/', '6', '-', 'j', 'k', 'n', '*', '+', '+', '+']
    )
    assert.deepEqual(
      tree,
      {
        operator: '+',
        left: '1',
        right: {
          operator: '+',
          left: {
            operator: '-',
            right: '6',
            left: {
              operator: '/',
              left: 'x',
              right: '3'
            }
          },
          right: {
            operator: '+',
            left: 'j',
            right: {
              operator: '*',
              left: 'k',
              right: 'n'
            }
          }
        }
      }
    )
  })
})

/* global describe it */
