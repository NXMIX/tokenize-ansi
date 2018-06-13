import { CodeTable, ParamType } from './common'

const EffectRe = /\x1b\[\?((?:\d+)(?:[hl]))/

const EffectTable: CodeTable = {
  '25h': { name: 'cursorOn' },
  '25l': { name: 'cursorOff' },
  '1049h': { name: 'altScrBufOn' },
  '1049l': { name: 'altScrBufOff' },
  '2004h': { name: 'bracketedPasteOn' },
  '2004l': { name: 'bracketedPasteOff' }
}

const process = (str: string) => {
  const matched = str.match(EffectRe)
  const result: ParamType[] = []
  if (matched) {
    if (matched.index! > 0) {
      result.push(['text', str.slice(0, matched.index)])
    }
    const key = matched[1]
    const codeDef = EffectTable[key]
    if (codeDef) {
      result.push([codeDef.name])
    } else {
      result.push(['unknown', key])
    }
  }
  const left = matched ? str.slice(matched.index! + matched[0].length) : str
  return { result, left }
}

export default process
