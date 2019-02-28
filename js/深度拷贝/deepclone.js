function deepClone(source) {
  let target
  // for null
  if (!source) {
    return source
  }
  if (typeof source === 'object') {
    if (source.constructor === Array) {
      target = []
      for (let i in source) {
        target.push(deepClone(source[i]))
      }
    } else {
      target = {}
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = deepClone(source[key])
        }
      }
    }
  } else {
    return source
  }
  return target
}
var source = {
  a: 1,
  b: { c: null, d: undefined, e: [1], f: [] },
  c: { test: 1 }
}
var target = deepClone(source)

//VM311:4 Uncaught TypeError: Cannot read property 'constructor' of null
// 应为typeof null 是object 但是constructor
