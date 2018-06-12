import { CSI } from './common'
import scan from '../src'

describe('sgr', () => {
  it('unknown code', () => {
    expect(scan(CSI + '70m' + 'a')).toEqual([['unknown', '70'], ['text', 'a']])
  })

  it('code is empty=', () => {
    expect(scan(CSI + 'm')).toEqual([['reset']])
  })

  it('red foreground color', () => {
    expect(scan(CSI + '31m' + 'a')).toEqual([['red'], ['text', 'a']])
  })

  it('plain text + red foreground color', () => {
    expect(scan('a' + CSI + '31m')).toEqual([['text', 'a'], ['red']])
  })

  it('256bit foreground color', () => {
    expect(scan(CSI + '38;5;10m' + 'a')).toEqual([['moreColor', 5, 10], ['text', 'a']])
  })

  it('true-color foreground color', () => {
    expect(scan(CSI + '38;2;127;127;127m' + 'a')).toEqual([
      ['moreColor', 2, 127, 127, 127],
      ['text', 'a']
    ])
  })

  it('unknown more color foreground color', () => {
    expect(scan(CSI + '38;1;127;127;127m' + 'a')).toEqual([
      ['unknown-more-color', '1', '127', '127', '127'],
      ['text', 'a']
    ])
  })
})
