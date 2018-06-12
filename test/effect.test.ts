import { CSI } from './common'
import scan from '../src'

describe('effect', () => {
  it('unknown code', () => {
    expect(scan(CSI + '?30h')).toEqual([['unknown', '30h']])
  })

  it('invalid code', () => {
    expect(scan(CSI + '?h')).toEqual([['text', CSI + '?h']])
  })

  it('cursor show', () => {
    expect(scan(CSI + '?25h')).toEqual([['cursor-on']])
  })

  it('plain text + cursor show', () => {
    expect(scan('a' + CSI + '?25h')).toEqual([['text', 'a'], ['cursor-on']])
  })
})
