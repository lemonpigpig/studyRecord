<template>
 <div class="sidebar">
  <div class="item zxkf">
    <span class="vertical">
      在线客服
    </span>
  </div>
  <div class="item cart">
    <span class="vertical">
    购物车
    </span>
    <span class="cartsize" v-text="cartSize"></span>
  </div>
  <div class="item collect">
    <span class="vertical">我的收藏</span>
  </div>
  <div class="item feedback">
    <span class="vertical">反馈</span>
  </div>
  <div class="item backTop" @click="goTop">
    <span class="vertical">返回顶部</span>
    <span class="trialog"></span>
  </div>
  
 </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      timer: null,
      isTop: true
    }
  },
  methods: {
    ...mapActions({ getMergedCart: 'cart/getMergedCart' }),
    goTop () {
      // 设置定时器
      this.timer = setInterval(() => {
        // 获取滚动条距离顶部高度
        const osTop = document.documentElement.scrollTop || document.body.scrollTop
        const ispeed = Math.floor(-osTop / 7)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
        // 到达顶部，清除定时器
        if (osTop === 0) {
          clearInterval(this.timer)
        }
        this.isTop = true
      }, 30)
    }
  },
  mounted () {
    window.onscroll = function () {
      console.log('scroll')
      // 获取页面可视区高度
      const clientHeight = document.documentElement.clientHeight
      // 显示回到顶部按钮
      const osTop = document.documentElement.scrollTop || document.body.scrollTop
      if (osTop >= clientHeight) {
        // btn.style.display = "block"
      } else {
        // btn.style.display = "none"
      }
      // 回到顶部过程中用户滚动滚动条，停止定时器
      if (!this.isTop) {
        clearInterval(this.timer)
      }
      this.isTop = false
    }
    this.getMergedCart()
  },
  computed: {
    ...mapGetters({
      cartSize: 'cart/cartSize'
    })
  }
}
</script>
<style lang="less">
.sidebar {
  position: fixed;
  top: 50%;
  right: 0;
  width: 36px;
  z-index: 9999;
  transform: translateY(-50%);
  height: auto;
  .item {
    text-align: center;
    height: 50px;
    font-size: 12px;
    color: #ffffff;
    line-height: 1.17;
    background: #908888;
    border-bottom: 1px solid #fff;
    display:table;
    width: 36px;
    cursor: pointer;
    &:last-child {
      border-bottom: none;
    }
  }
  .cart {
    position: relative;
    .cartsize {
        height: 12px;
        background: #ff4544;
        position: absolute;
        border-radius: 6px;
        line-height: 12px;
        transform: scale(0.75);
        left: 18px;
        display: inline-block;
        padding-left: 3px;
        padding-right: 3px;
        bottom: 14px;
    }
  }
  .zxkf {
    background-color: #ff4544;
  }
  .backTop {
    background: #651525;
    position: relative;
  }
  .vertical {
    display: table-cell;
    vertical-align: middle;
  }
  .trialog {
    position: absolute;
    width: 0px;
    height: 0px;
    background: transparent;
    display: inline-block;
    border-top: none;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-bottom: 4px solid #fff;
    bottom: 5px;
    left: 15px;
  }
}
</style>
