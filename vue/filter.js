import Vue from 'vue'

Vue.filter('date', input => {
  if (!input) return
  let datetime = new Date(input * 1000)
  let year = datetime.getFullYear()
  let month = datetime.getMonth() + 1
  let date = datetime.getDate()
  let hour = datetime.getHours()
  let minute = datetime.getMinutes()
  let second = datetime.getSeconds()
  let mseconds = datetime.getMilliseconds()
  return year + '年' + month + '月' + date + '日'
})
Vue.filter('time', uData => {
  if (uData.length === 10) {
    var TimeMyDate = new Date(Number(uData) * 1000)
  } else if (uData.length === 13) {
    TimeMyDate = new Date(Number(uData))
  }
  var myDate = new Date(TimeMyDate)
  let year = myDate.getFullYear()
  let month = myDate.getMonth() + 1
  let day = myDate.getDate()
  let h = myDate.getHours()
  let m = myDate.getMinutes()
  let s = myDate.getSeconds()
  return (
    year +
    '年' +
    month +
    '月' +
    day +
    '日' +
    ' ' +
    fillzero(h) +
    ':' +
    fillzero(m) +
    ':' +
    fillzero(s)
  )
  // 处理补0
  function fillzero(n) {
    return n < 10 ? '0' + n : '' + n
  }
})

Vue.filter('formatDates', (time, format = 'YY年MM月DD日') => {
  var date = new Date(time)

  var year = date.getFullYear()

  var month = date.getMonth() + 1
  // 月份是从0开始的

  var day = date.getDate()

  var preArr = Array.apply(null, Array(10)).map(function(elem, index) {
    return '0' + index
  }) /// /开个长度为10的数组 格式为 00 01 02 03

  var newTime = format
    .replace(/YY/g, year)
    .replace(/MM/g, preArr[month] || month)
    .replace(/DD/g, preArr[day] || day)
  return newTime
})
Vue.filter('formatDistance', distance => {
  if (Number(distance) < 1000) {
    return `${distance}m`
  } else {
    return `${(Number(distance) / 1000).toFixed(2)}km`
  }
})
