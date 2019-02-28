// 实现一个sum函数，运算结果可以满足如下输出
// sum(1,2,3).valueOf() => 6

// sum(2,3)(2).valueOf() => 7

// sum(1)(2)(3)(4).valueOf() => 10

// sum(2)(4,1)(2).valueOf() => 9

function sum() {
  let args = [].slice.apply(arguments)
  let _add = function() {
    args = args.concat([].slice.apply(arguments))
    if (arguments.length === 0) {
      return [].reduce.call(args, function(accumulator, current) {
        return accumulator + current
      })
    } else {
      return _add
    }
  }

  return _add
}
Function.prototype.valueOf = function() {
  let fn = this
  return fn()
}
sum(2)(4, 1)(2).valueOf()
