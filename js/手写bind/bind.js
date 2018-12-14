Function.prototype.bind = function() {
  let fn = this
  let args = [].slice.apply(arguments)
  let context = args.shift(0)
  return function() {
    fn.apply(context, args.concat( [].slice.apply(arguments)))
  }
}

// test.bind({a:123})()