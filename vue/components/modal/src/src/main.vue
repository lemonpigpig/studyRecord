<template>
  <transition name="boqii-modal">
    <div class="boqii-modal" v-if="visible">
      <templateModal @close="close" :params="propsParams"></templateModal>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
  .boqii-modal {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    transition: opacity 0.3s linear;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0.04rem 0.2rem;
    font-size: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .boqii-modal-pop-enter,
  .boqii-modal-pop-leave-active {
    opacity: 0;
  }
</style>

<script type="text/babel">
  export default {
    props: {
      message: String,
      className: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'middle'
      },
      iconClass: {
        type: String,
        default: ''
      }
    },
  
    data() {
      return {
        visible: false,
        propsParams: {}
      };
    },
    methods: {
      close() {
        console.log("main.vue close")
        this.visible = false;
      }
    }
  };
</script>