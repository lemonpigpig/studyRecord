function debounce(func, delay, immediate) {
  let context,args,timeout,now, result
  function later() {
    let last = new Date().getTime() - now
    if(last < delay && last > 0) {
      timeout = setTimeout(() => {
        result = func.call(context, args)
      }, delay-last);
    } else {
      timeout = null
      if(!immediate) {
        func.call(context, args)
      }
      // 去掉引用避免内幕才能泄露
      if(!timeout) context = args = null
    }
  }
  return function() {
    context = this
    args = arguments
    now = new Date().getTime()
    if(!timeout) timeout = setTimeout(later, delay)
    if(!timeout && immediate) {
      result =func.call(context, args)
      // 注意去掉引用
      context = args = null
    }
    
    return result
  }
  
}