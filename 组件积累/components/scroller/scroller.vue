<template>
<gz-swiper class="gz-scroller" :options="scrollerOptions" :style="{ width: options.width, height: options.height }">
    <gz-swiper-slide class="gz-scroller-content" :style="{ width: sliderWidth, height: sliderHeight }">
        <slot></slot>
    </gz-swiper-slide>
    <div class="swiper-scrollbar" v-if="scrollerOptions.showScrollbar"></div>
</gz-swiper>
</template>

<script>
import Swiper from '../swiper';

const defaultOptions = {
    scrollbar: '.swiper-scrollbar',
    direction: 'horizontal',
    slidesPerView: 'auto',
    mousewheelControl: true,
    freeMode: true,
    showScrollbar: true
};

export default {
    name: 'gz-scroller',
    components: {
        [Swiper.swiper.name]: Swiper.swiper,
        [Swiper.swiperSlide.name]: Swiper.swiperSlide
    },
    computed: {
        sliderWidth() {
            if (this.scrollerOptions.direction === 'vertical') {
                return '100%';
            }
            return 'auto';
        },
        sliderHeight() {
            if (this.scrollerOptions.direction === 'horizontal') {
                return '100%';
            }
            return 'auto';
        }
    },
    props: {
        options: Object
    },
    data() {
        const scrollerOptions = Object.assign(defaultOptions, this.options);
        delete scrollerOptions.width;
        delete scrollerOptions.height;
        return {
            scrollerOptions
        };
    }
};
</script>
