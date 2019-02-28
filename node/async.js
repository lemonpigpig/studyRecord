const arr = [1, 2, 3]
const waitFor = ms =>
  new Promise(r => {
    setTimeout(() => {
      r()
    }, ms)
  })
async function callback(item) {
  await waitFor(1050)
  console.log(item)
}

// arr.forEach(callback)
// console.log('done')

/**
 * output is
 * done
 * 1
 * 2
 * 3
 */

async function asyncForEach(arr, callback) {
  for (var index = 0; index < arr.length; index++) {
    await callback(arr[index], index, arr)
    console.log('----index----:', index)
  }
}
// asyncForEach(arr, callback)
// console.log('done')
/**
 * output is
 * done
 * 1
 * 2
 * 3
 * 但是1，2，3不是一块出来的，而是根据timeout的间隔依次出现, await估计跳出了循环
 */

const start = async () => {
  await asyncForEach(arr, callback)
  console.log('done')
}
start()
