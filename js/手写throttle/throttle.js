function throttle(func, delay, option) {
  let context, args, timeout, result, now
  let previous = 0
  if(!option) option = {}
  function later() {
    previous = option.leading === false ? 0 : new Date().getTime()
    timeout = null
    result = func.apply(context, args)
    if(!timeout) context = args = null
  }

  return function() {
    now = new Date().getTime()
    context = this
    args = arguments
    // 给previous赋初始值
    if(!previous && option.leading === false) {
      previous = now
    }
    let remaing = delay - (now-previous)
    if (remaing <= 0 || remaing > delay) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;

    } else if(!timeout && option.trailing !== false) {
      timeout = setTimeout(later, remaing)
    }
  }
}