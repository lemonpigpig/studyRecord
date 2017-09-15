<template>
    <gz-swiper class="gz-gallery__slider"
               :options="sliderOptions">
        <gz-swiper-slide class="gz-slider-item"
                         v-for="(item, index) in items"
                         :key="index">
            <img class="gz-slider-image"
                 :src="item.imageUrl"> </gz-swiper-slide>
        <div v-if="sliderOptions.showPagination"
             class="swiper-pagination"
             slot="pagination"></div>
    </gz-swiper>
</template>

<script>
import Swiper from '../swiper';

const defaultOptions = {
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 1, // 默认同时显示1个Slider
    showPagination: true, // 默认不显示页码区域
    paginationType: 'fraction',
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
    name: 'gz-gallery-slider',
    components: {
        [Swiper.swiper.name]: Swiper.swiper,
        [Swiper.swiperSlide.name]: Swiper.swiperSlide
    },
    props: {
        options: Object,
        items: Array,
        initIndex: Number
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
    mounted() {
        this.$el.swiper.slideTo(this.initIndex + 1, 0);
    }
};
</script>
