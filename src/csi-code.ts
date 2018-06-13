import { CodeTable, ParamType } from './common'

const CursorMoveRe = /\x1b\[((?:\d*)(?:;\d*)*)([ABCDEFGHJKSTf])/

const CSITable: CodeTable = {
  A: { name: 'up', maxParams: 1, default: 1 },
  B: { name: 'down', maxParams: 1, default: 1 },
  C: { name: 'forward', maxParams: 1, default: 1 },
  D: { name: 'back', maxParams: 1, default: 1 },
  E: { name: 'nextLine', maxParams: 1, default: 1 },
  F: { name: 'prevLine', maxParams: 1, default: 1 },
  G: { name: 'h-abs', maxParams: 1, default: 1 },
  H: { name: 'pos', maxParams: 2, default: 1 },
  J: { name: 'eraseInDis', maxParams: 1, default: 0 },
  K: { name: 'eraseInLine', maxParams: 1, default: 0 },
  S: { name: 'scrollUp', maxParams: 1, default: 1 },
  T: { name: 'scrollDown', maxParams: 1, default: 1 },
  f: { name: 'pos', maxParams: 2, default: 1 }
}

const parsePos = (def: number, x: string) => {
  const parsed = parseInt(x, 10)
  return isNaN(parsed) || parsed === 0 ? def : parsed
}

const process = (str: string) => {
  const matched = str.match(CursorMoveRe)
  const result: ParamType[] = []
  if (matched) {
    if (matched.index! > 0) {
      result.push(['text', str.slice(0, matched.index)])
    }
    const key = matched[2]
    const codeDef = CSITable[key]
    const { name, default: def, maxParams } = codeDef
    if (maxParams! > 1) {
      const [x, y] = matched[1].split(';')
      result.push([name, parsePos(def!, x), parsePos(def!, y)])
    } else {
      result.push([name, parsePos(def!, matched[1])])
    }
  }
  const left = matched ? str.slice(matched.index! + matched[0].length) : str
  return { result, left }
}

export default process
