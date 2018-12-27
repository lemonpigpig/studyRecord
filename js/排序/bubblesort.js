function bubblesort(arr) {
  debugger
  let len = arr.length
  while (len) {
    for (let i = 0, j = i + 1; j < len; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
      i = j
    }
    len = len - 1
  }
  return arr
}

console.log(bubblesort([100, 21, 2, 3, 78]))
