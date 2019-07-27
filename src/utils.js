export const assert = (condition, msg = '') => {
  if(!condition){
    throw new Error(`[FlyVuex]: ${msg}`)
  }
}

export const isObject = (obj) => {
  return obj !== null && typeof obj === 'object'
}

export const isOwn = (target, key) => {
  return {}.hasOwnProperty.call(target, key)
}

// {name: 'allen', age: 18} => [{key: 'name', val: 'allen'}, [{key: 'age', val: 18}]]
export const normalizeMap = (map) => {
  return Array.isArray(map)
    ? map.map(key => ({key, val: key}))
    : Object.keys(map).map(key => ({key, val: map[key]}))
}
