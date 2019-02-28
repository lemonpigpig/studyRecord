/* eslint-disable */
'use strict'

var customBiz = {
  selectedDate: {},
  init: function(outerCallback) {
    var self = this
    // 初始化日历

    var calendar = new Calendar({
      // swiper滑动容器
      container: '#calendar',
      // 上一月节点
      pre: '.pre',
      // 下一月节点
      next: '.next',
      // 回到今天
      backToToday: '.backToday',
      // 业务数据改变
      dataRequest: function(currdate, callback, _this) {
        // 无日程安排
        var data = [
          {
            date: '2018-11-30'
          }
          // {
          //   date: '2018-04-17'
          // },
          // {
          //   date: '2018-04-16'
          // }
        ]
        callback && callback(data)
      },
      // 点击日期事件
      onItemClick: function(item) {
        console.log('----onItemClick---:', item)
        self.selectedDate = item
        // var defaultDate = item.date
        // // 设置标题
        // setTitle(defaultDate)
      },
      // 滑动回调
      swipeCallback: function(item) {
        debugger
        var customeDate = item.year + '年' + item.month + '月'
        console.log('---customeDate---:', item)
        self.selectedDate = item
        outerCallback({date: item})
        // 设置标题
        setTitle(customeDate)

        // 动态新增点击样式
        calendar.addActiveStyleFordate(customeDate)
      },
      disableSwiperCallback: function(item) {
        outerCallback({direction: item})
      },
      template(value, curr) {
        let template = ''
        if (value.date == curr) {
          // 今天
          if (value.isSelected) {
            template =
              '<div class="boqii-calendar-item boqii-calendar-active  isforbid{{isforbid}} tip{{tip}}" date="{{date}}"><span class="day">{{day}}</span><span class="dot dot-type1"></span></div>'
          } else {
            template =
              '<div class="boqii-calendar-item boqii-calendar-active  isforbid{{isforbid}} tip{{tip}}" date="{{date}}"><span class="day">{{day}}</span></div>'
          }
        } else {
          if (value.isSelected) {
            // 个性化和业务贴近
            template =
              '<div class="boqii-calendar-item isforbid{{isforbid}} tip{{tip}}" date="{{date}}" ><span class="day">{{day}}</span><span class="dot dot-type1"></span></div>'
          } else {
            template =
              '<div class="boqii-calendar-item  isforbid{{isforbid}} tip{{tip}}" date="{{date}}"><span class="day">{{day}}</span></div>'
          }
        }
        return template
      },
      // 调试
      isDebug: false
    })
    // 设置标题
    var titleNode = document.querySelector('.calendar-bar_title .title-cur_date')

    function setTitle(date) {
      if (titleNode) titleNode.innerText = date
    }
  }
}
window.customBiz = customBiz
// 初始化
