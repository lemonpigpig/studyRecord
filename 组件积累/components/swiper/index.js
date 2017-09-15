import Vue from 'vue';
import SwiperComponent from './swiper.vue';
import SlideComponent from './swiper-slide.vue';

let swiperPlugins = {};

if (!Vue.prototype.$isServer) {
    const Swiper = require('swiper'); // eslint-disable-line global-require
    swiperPlugins = Swiper.prototype.plugins;
}

const GzSwiper = {
    swiperSlide: SlideComponent,
    swiper: SwiperComponent,
    swiperPlugins,
    install: () => {
        Vue.component(SwiperComponent.name, SwiperComponent);
        Vue.component(SlideComponent.name, SlideComponent);
    }
};

export default GzSwiper;
