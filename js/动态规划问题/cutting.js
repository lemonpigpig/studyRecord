// 剪绳子问题
function cutting(n) {
  let result = [0, 1, 2, 3]
  let max = 0
  debugger
  for (let i = 4; i < n + 1; i++) {
    let max = i
    for (let j = 1; j < Math.ceil(i / 2) + 1; j++) {
      let val = result[j] * result[i - j]
      // console.log(val, j, '*', i - j, result[j], result[i - j])
      if (val > max) {
        max = val
      }
    }
    result[i] = max
  }

  return result[n]
}
cutting(7)
