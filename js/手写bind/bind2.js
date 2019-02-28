// 使用场景
function test() {
  console.log(this.a)
}
test.bind({ a: 123 })()

// 自己实现bind
// 基于Function.prototype原型扩展

Function.prototype.bind = function() {
  let args = [].slice.apply(arguments)
  let context = args.shift()
  let fn = this
  return function() {
    if (arguments.length > 0) {
      args = args.concat([].slice.apply(arguments))
    } else {
      fn.apply(context, args)
    }
  }
}
