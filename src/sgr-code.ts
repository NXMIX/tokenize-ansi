import { CodeTable, ParamType } from './common'

const SgrRe = /\x1b\[((?:\d*)(?:;\d*)*)(?:m)/

const SGRTable: CodeTable = {
  '0': { name: 'reset' },
  '1': { name: 'bold' },
  '2': { name: 'faint' },
  '3': { name: 'italic' },
  '4': { name: 'underline' },
  '5': { name: 'slowBlink' },
  '6': { name: 'rapidBlink' },
  '7': { name: 'reverse' },
  '8': { name: 'conceal' },
  '9': { name: 'crossedOut' },
  '10': { name: 'primaryFont' },
  '11': { name: 'altFont1' },
  '12': { name: 'altFont2' },
  '13': { name: 'altFont3' },
  '14': { name: 'altFont4' },
  '15': { name: 'altFont5' },
  '16': { name: 'altFont6' },
  '17': { name: 'altFont7' },
  '18': { name: 'altFont8' },
  '19': { name: 'altFont9' },
  '20': { name: 'fraktur' },
  '21': { name: 'boldOff' },
  '22': { name: 'normal' },
  '23': { name: 'italicOff' },
  '24': { name: 'underlineOff' },
  '25': { name: 'blinkOff' },
  '27': { name: 'inverseOff' },
  '28': { name: 'reveal' },
  '29': { name: 'notCrossedOut' },
  '30': { name: 'black' },
  '31': { name: 'red' },
  '32': { name: 'green' },
  '33': { name: 'yellow' },
  '34': { name: 'blue' },
  '35': { name: 'magenta' },
  '36': { name: 'cyan' },
  '37': { name: 'white' },
  '38': { name: 'moreColor' },
  '39': { name: 'fgDefault' },
  '40': { name: 'bgBlack' },
  '41': { name: 'bgRed' },
  '42': { name: 'bgGreen' },
  '43': { name: 'bgYellow' },
  '44': { name: 'bgBlue' },
  '45': { name: 'bgMagenta' },
  '46': { name: 'bgCyan' },
  '47': { name: 'bgWhite' },
  '48': { name: 'bgMoreColor' },
  '49': { name: 'bgDefault' },
  '51': { name: 'framed' },
  '52': { name: 'encircled' },
  '53': { name: 'overlined' },
  '54': { name: 'notFramed' },
  '55': { name: 'notOverlined' },
  '90': { name: 'brightBlack' },
  '91': { name: 'brightRed' },
  '92': { name: 'brightGreen' },
  '93': { name: 'brightYellow' },
  '94': { name: 'brightBlue' },
  '95': { name: 'brightMagenta' },
  '96': { name: 'brightCyan' },
  '97': { name: 'brightWhite' },
  '100': { name: 'bgBrightBlack' },
  '101': { name: 'bgBrightRed' },
  '102': { name: 'bgBrightGreen' },
  '103': { name: 'bgBrightYellow' },
  '104': { name: 'bgBrightBlue' },
  '105': { name: 'bgBrightMagenta' },
  '106': { name: 'bgBrightCyan' },
  '107': { name: 'bgBrightWhite' }
}

enum ColorMode {
  bit256 = 5,
  trueColor = 2
}

const process = (str: string) => {
  const matched = str.match(SgrRe)
  const result: ParamType[] = []
  if (matched) {
    if (matched.index! > 0) {
      result.push(['text', str.slice(0, matched.index)])
    }
    let [key, colorMode, p2, p3, p4] = matched[1].split(';')
    // If no codes are given, CSI m is treated as CSI 0 m
    if (!key) {
      key = '0'
    }
    const codeDef = SGRTable[key]
    if (codeDef) {
      if (codeDef.name === 'moreColor' || codeDef.name === 'bgMoreColor') {
        if (Number(colorMode) === ColorMode.bit256) {
          result.push([codeDef.name, Number(colorMode), Number(p2)])
        } else if (Number(colorMode) === ColorMode.trueColor) {
          result.push([codeDef.name, Number(colorMode), Number(p2), Number(p3), Number(p4)])
        } else {
          result.push(['unknown-more-color', colorMode, p2, p3, p4])
        }
      } else {
        result.push([codeDef.name])
      }
    } else {
      result.push(['unknown', key])
    }
  }
  const left = matched ? str.slice(matched.index! + matched[0].length) : str
  return { result, left }
}

export default process
