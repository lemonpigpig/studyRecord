function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments)
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg)
          var value = info.value
        } catch (error) {
          reject(error)
          return
        }
        if (info.done) {
          resolve(value)
        } else {
          return Promise.resolve(value).then(
            function(value) {
              return step('next', value)
            },
            function(err) {
              return step('throw', err)
            }
          )
        }
      }
      return step('next')
    })
  }
}

function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

let test = (function() {
  var ref = _asyncToGenerator(function*() {
    for (let i = 0; i < 10; i++) {
      yield sleep(100)
    }
  })

  return function test() {
    return ref.apply(this, arguments)
  }
})()

function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

async function test() {
  for (let i = 0; i < 10; i++) {
    await sleep(100)
  }
}
