// Utilities
import effectProcess from './effect-code'
import csiProcess from './csi-code'
import sgrProcess from './sgr-code'
import { ParamType } from './common'

const scan = (str: string) => {
  let result: ParamType[] = []
  let params: (number | string)[]

  if (str.length === 0) {
    return [['text', str]]
  }

  let res
  while (str.length > 0) {
    res = effectProcess(str)
    if (res.result.length > 0) {
      result = result.concat(res.result)
      str = res.left
    } else {
      res = csiProcess(str)
      if (res.result.length > 0) {
        result = result.concat(res.result)
        str = res.left
      } else {
        res = sgrProcess(str)
        if (res.result.length > 0) {
          result = result.concat(res.result)
          str = res.left
        } else {
          result.push(['text', str])
          break
        }
      }
    }
  }
  return result
}

export default scan
