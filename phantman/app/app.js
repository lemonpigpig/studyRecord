import Vue from 'vue';
import {
    sync,
} from 'vuex-router-sync';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import VueLazyload from 'vue-lazyload';
import GzRichTextViewer from 'gz-vue/src/components/rich-text-viewer';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon.vue';

import App from './App.vue';
import store from './vuex/store';
import router from './router';
import axios from './utilities/custom-axios';
import Notify from './components/common/notify';

import * as filters from './filters';
import directives from './directives';

Vue.use(VueRouter);
Vue.use(GzRichTextViewer);
// register global icons
Vue.component('icon', Icon);

// lazyload
Vue.use(VueLazyload, {
    preLoad: '3',
    loading: '/public/img/placeholder.jpg',
});

// Axios config
Vue.use(VueAxios, axios);

if (!Vue.prototype.$isServer) {
    require('./gz-native.js');
}

Vue.axios.interceptors.request.use(config => Object.assign({}, config, {
    headers: {
        // userId: store.getters.userId,
        token: store.getters.sessionId,
        'Gz-Device': 2,
    },
}));

Vue.axios.interceptors.response.use((res) => {
    if (res.status === 401 || (res.data.code && res.data.code.toString() === '401')) {
        store.dispatch('signOut').then(() => {
            router.replace('/signIn');
        });
        return Promise.reject(res.data);
    } else if (res.status >= 400 || Number.parseInt(res.data.code, 10) >= 400) {
        return Promise.reject(res.data);
    } else if (res.status === 200) {
        if (!res.data) {
            return Promise.resolve({ data: { msg: '操作成功', code: null } });
        }
    }
    return res.data;
});

// router config

router.beforeEach((to, from, next) => {
    // 埋点
    // 订单提交页面访问量
    if (to.fullPath === '/addOrder') {
        global.gzNative.logEnterPage({
            name: '/addOrder',
        });
    }
    Notify.prototype.clear();
    if (to.fullPath === '/') {
        next({
            path: '/home',
        });
    } else if (!Vue.prototype.$isServer && to.matched.some(record => record.meta.requiresAuth)) {
        const sessionId = global.localStorage && global.localStorage.getItem('sessionId');
        // const userId = global.localStorage && global.localStorage.getItem('userId');

        if (!sessionId) {
            next({
                path: '/signIn',
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

// register global utility filters.
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});

Object.keys(directives).forEach((key) => {
    Vue.directive(key, directives[key]);
});

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    ...App,
});

if (!Vue.prototype.$isServer) {
    global.gzNative.__appInit();
}

// expose the app, the router and the store.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.

