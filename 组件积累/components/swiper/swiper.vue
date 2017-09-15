<template>
<div class="swiper-container">
    <slot name="parallax-bg"></slot>
    <div class="swiper-wrapper">
        <slot></slot>
    </div>
    <slot name="pagination"></slot>
    <slot name="button-prev"></slot>
    <slot name="button-next"></slot>
    <slot name="scrollbar"></slot>
</div>
</template>

<script>
import Vue from 'vue';

let Swiper;
const isServer = Vue.prototype.$isServer;

if (!isServer) {
    Swiper = require('swiper'); // eslint-disable-line global-require
}

export default {
    name: 'gz-swiper',
    props: {
        options: {
            type: Object,
            default() {
                return {
                    autoplay: 3500
                };
            }
        }
    },
    mounted() {
        if (!this.swiper && !isServer) {
            this.swiper = new Swiper(this.$el, this.options);
        }
    },
    methods: {
        update() {
            if (this.swiper) {
                if (this.options.reInitializeWhenUpdate) {
                    this.swiper.destroy();
                    this.swiper = new Swiper(this.$el, this.options);
                } else {
                    this.swiper.update();
                }
            }
        }
    },
    updated() {
        this.update();
    },
    beforeDestroy() {
        if (this.swiper) {
            this.swiper.destroy();
            delete this.swiper;
        }
    }
};
</script>
