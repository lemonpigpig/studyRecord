<template>
<div class="gz-spinner__triple-bounce">
    <div class="gz-spinner-triple-bounce-bounce1" :style="bounceStyle"></div>
    <div class="gz-spinner-triple-bounce-bounce2" :style="bounceStyle"></div>
    <div class="gz-spinner-triple-bounce-bounce3" :style="bounceStyle"></div>
</div>
</template>

<script>
import common from './common.vue';

export default {
    name: 'triple-bounce',

    mixins: [common],

    computed: {
        spinnerSize() {
            return `${(this.size || this.$parent.size || 28) / 3}px`;
        },

        bounceStyle() {
            return {
                width: this.spinnerSize,
                height: this.spinnerSize,
                backgroundColor: this.spinnerColor
            };
        }
    }
};
</script>
