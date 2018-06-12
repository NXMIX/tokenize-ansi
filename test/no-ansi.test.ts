import scan from '../src'

describe('no-ansi', () => {
  it('empty string', () => {
    expect(scan('')).toEqual([['text', '']])
  })

  it('pure text', () => {
    expect(scan('a')).toEqual([['text', 'a']])
  })
})
