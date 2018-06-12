import { CSI } from './common'
import scan from '../src'

describe('csi', () => {
  it('cursor up', () => {
    expect(scan(CSI + '1A')).toEqual([['up', 1]])
  })

  it('use default in cursor up', () => {
    expect(scan(CSI + 'A')).toEqual([['up', 1]])
  })

  it('plain text + cursor up', () => {
    expect(scan('a' + CSI + '1A')).toEqual([['text', 'a'], ['up', 1]])
  })

  it('two params', () => {
    expect(scan(CSI + '1;1H')).toEqual([['pos', 1, 1]])
  })
})
