
export * from './shapeFlags'
export * from './normalizeProp'

export const EMPTY_OBJ: { readonly [key: string]: any } = {}

export const isString = (val: unknown) => typeof val === 'string'

/**
 * 判断是否为一个数组
 */
export const isArray = Array.isArray

/**
 * 判断是否为一个对象
 */
export const isObject = (value: unknown) => {
  return value !== null && typeof value === 'object'
}

/**
 * 判断是否为一个函数
 */
export const isFunction = (value: unknown) => {
  return typeof value === 'function'
}

/**
 * 对比两个数据是否发生了改变
 */
export const hasChanged = (value: any, oldValue: any): boolean =>
  !Object.is(value, oldValue)

/**
 * Object.assign
 */
export const extend = Object.assign

const onRE = /^on[^a-z]/
/**
 * 是否 on 开头
 */
export const isOn = (key: string) => onRE.test(key)

