Vue.directive('count-down', function (el, binding) {
  let text = el.innerHTML;
  let callback = binding.value;
  let leftSec = 60;
  let clock = '';
  el.onclick = function () {
      if (leftSec < 60) return;
      callback().then(result => {
          leftSec -= 1;
          el.innerHTML = leftSec + 's';
          clock = setInterval(() => {
              if (leftSec < 60 && leftSec > 0) {
                  leftSec -= 1;
                  el.innerHTML = leftSec + 's';
              } else {
                  clearInterval(clock)
                  el.innerHTML = '重新发送';
                  leftSec = 60;
              }
          }, 1000)
      }, err => {

      })
  }
})

//<el-button type="primary" v-count-down="sendCode">发送验证码</el-button>