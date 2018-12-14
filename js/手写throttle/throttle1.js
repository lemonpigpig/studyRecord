function throttle(func, delay, option) {
  let context, timeout, result, now, args
  let previous = 0
  if(!option) option = {}

  function later() {
    previous = option.leading === false ? 0 : new Date().getTime()
    timeout = null
    result = func.apply(context, args)
    if(!timeout) context = args = null
  }

  return function() {
    context = this
    args = arguments
    now = new Date().getTime()
    if(!previous && option.leading === false) {
      previous = new Date().getTime()
    }
    let remaing = delay - (now - previous)
    if(remaing <= 0 || remaing > delay) {
      clearTimeout(timeout)
      result = func.apply(context, args)
    } else if(!timeout && option.trailing !== false) {
      timeout = setTimeout(later, remaing)
    }
    return result
  }
}