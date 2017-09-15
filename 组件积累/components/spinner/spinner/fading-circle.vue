<template>
<div :class="['gz-spinner__fading-circle circle-color-' + _uid]" :style="{
      width: spinnerSize,
      height: spinnerSize
    }">
    <div v-for="n in 12" :class="['is-circle' + (n + 1)]" class="gz-spinner-fading-circle-circle"></div>
</div>
</template>

<script>
import common from './common.vue';

export default {
    name: 'fading-circle',

    mixins: [common],

    created() {
        if (this.$isServer) return;
        this.styleNode = document.createElement('style');
        const css = `.circle-color-${this._uid} > div::before { background-color: ${this.spinnerColor}; }`;

        this.styleNode.type = 'text/css';
        this.styleNode.rel = 'stylesheet';
        this.styleNode.title = 'fading circle style';
        document.getElementsByTagName('head')[0].appendChild(this.styleNode);
        this.styleNode.appendChild(document.createTextNode(css));
    },

    destroyed() {
        if (this.styleNode) {
            this.styleNode.parentNode.removeChild(this.styleNode);
        }
    }
};
</script>
