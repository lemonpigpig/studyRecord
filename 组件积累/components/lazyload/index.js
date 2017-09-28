import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

const GzLazyload = {
    name: 'gz-lazyload',
    install: () => {
        Vue.use(VueLazyload);
    }
};

export default GzLazyload;
