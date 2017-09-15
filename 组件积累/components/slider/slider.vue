<template>
    <gz-swiper class="gz-slider"
               :options="sliderOptions"
               :style="{ height: options.height, width: options.width }">
        <gz-swiper-slide class="gz-slider-item"
                         v-for="(item, index) in items"
                         :key="index">
            <a class="gz-slider-item-content"
               v-if="!item.customClickData"
               :href="item.url">
                <div v-if="!sliderOptions.lazyLoading"
                     class="gz-slider-bg"
                     :style="{backgroundImage:'url('+item.background+')'}"></div>
                <div v-if="sliderOptions.lazyLoading"
                     class="gz-slider-bg swiper-lazy"
                     :data-background="item.background">
                    <div v-if="sliderOptions.lazyLoading"
                         class="swiper-lazy-preloader"></div>
                </div>
            </a>
            <div class="gz-slider-item-content"
                 v-if="item.customClickData"
                 @click="customClick(item.customClickData)">
                <div v-if="!sliderOptions.lazyLoading"
                     class="gz-slider-bg"
                     :style="{backgroundImage:'url('+item.background+')'}"></div>
                <div v-if="sliderOptions.lazyLoading"
                     class="gz-slider-bg swiper-lazy"
                     :data-background="item.background">
                    <div v-if="sliderOptions.lazyLoading"
                         class="swiper-lazy-preloader"></div>
                </div>
            </div>
        </gz-swiper-slide>
        <div v-if="sliderOptions.showPagination"
             class="swiper-pagination"
             slot="pagination"></div>
        <div v-if="sliderOptions.showPreNextButton"
             class="swiper-button-prev"
             slot="button-prev"></div>
        <div v-if="sliderOptions.showPreNextButton"
             class="swiper-button-next"
             slot="button-next"></div>
    </gz-swiper>
</template>

<script>
import Swiper from '../swiper';

const defaultOptions = {
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 1, // 默认同时显示1个Slider
    showPagination: true, // 默认显示页码区域
    paginationClickable: false, // 页码区域默认不可点击
    showPreNextButton: false, // 默认隐藏上一页下一页按钮
    spaceBetween: 0, // Slider之间空隙默认为0
    loop: true, // 默认开启循环
    autoplayDisableOnInteraction: false,
    preloadImages: false,
    lazyLoading: true, // 默认开启lazyLoading
    lazyLoadingInPrevNext: true, // 默认预加载图片
    lazyLoadingInPrevNextAmount: 1, // 默认预加载数量
    reInitializeWhenUpdate: true // 更新时重新初始化
};

export default {
    name: 'gz-slider',
    components: {
        [Swiper.swiper.name]: Swiper.swiper,
        [Swiper.swiperSlide.name]: Swiper.swiperSlide
    },
    props: {
        options: Object,
        items: Array
    },
    computed: {
        sliderOptions() {
            const options = Object.assign({}, defaultOptions, this.options);
            delete options.width;
            delete options.height;
            if (this.items && this.items.length === 1) {
                options.autoplay = false;
                options.noSwiping = true;
                options.noSwipingClass = 'gz-slider-item';
                options.showPagination = false;
                options.showPreNextButton = false;
                options.lazyLoadingInPrevNext = false;
            }
            return options;
        }
    },
    methods: {
        customClick(data) {
            this.$emit('customClick', data);
        }
    }
};
</script>
