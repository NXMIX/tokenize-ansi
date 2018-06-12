export interface CodeDefine {
  name: string
  maxParams?: number
  default?: number
}

export interface CodeTable {
  [key: string]: CodeDefine
}

export type ParamType = (number | string)[]
