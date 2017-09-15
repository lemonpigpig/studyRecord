<template>
<div class="gz-loadmore">
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <loadmore :bottom-method="loadBottomFuc" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :top-method="loadTopFuc" @top-status-change="handleTopChange" :autoFill="autoFill" ref="loadmore">
            <div slot="top" class="gz-loadmore-top">
                <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
                <span v-show="topStatus === 'loading'">
                <gz-spinner type="snake"></gz-spinner>
              </span>
            </div>
            <slot></slot>
            <div slot="bottom" class="gz-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                <span v-show="bottomStatus === 'loading'">
                  <gz-spinner type="snake"></gz-spinner>
                </span>
            </div>
            <div class="no-result" v-if="noResult">
                没有更多数据啦
            </div>
        </loadmore>
    </div>
</div>
</template>

<script>
import Vue from 'vue';

import Loadmore from './loadmore/loadmore.vue';
import Spinner from '../spinner/spinner.vue';


export default {
    name: 'gz-loadmore',
    components: {
        [Spinner.name]: Spinner,
        [Loadmore.name]: Loadmore
    },
    props: {
        autoFill: {
            type: Boolean,
            default: true
        },
        loadBottomFuc: {
            type: Function
        },
        loadTopFuc: {
            type: Function
        }
    },
    data() {
        return {
            allLoaded: false,
            bottomStatus: '',
            wrapperHeight: 0,
            topStatus: '',
            noResult: false
        };
    },
    methods: {
        setBottomLoaded() {
            this.$refs.loadmore.onBottomLoaded();
        },
        setTopLoaded() {
            this.$refs.loadmore.onTopLoaded();
        },
        setAllLoaded() {
            this.allLoaded = true;
        },
        setNoResult(flag) {
            if (flag !== undefined) {
                this.$set(this, 'noResult', flag);
            } else {
                this.$set(this, 'noResult', true);
            }
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        handleTopChange(status) {
            this.topStatus = status;
        }
    },

    created() {

    },

    mounted() {
        if (Vue.prototype.$isServer) return;
        this.wrapperHeight = document.documentElement.clientHeight;
        //            this.wrapperHeight = document.documentElement.clientHeight -
        //                this.$refs.wrapper.getBoundingClientRect().top;
    }
};
</script>
