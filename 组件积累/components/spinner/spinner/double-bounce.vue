<template>
<div class="gz-spinner__double-bounce" :style="{
      width: spinnerSize,
      height: spinnerSize
    }">
    <div class="gz-spinner__double-bounce-bounce1" :style="{ backgroundColor: spinnerColor }"></div>
    <div class="gz-spinner__double-bounce-bounce2" :style="{ backgroundColor: spinnerColor }"></div>
</div>
</template>

<script>
import common from './common.vue';

export default {
    name: 'double-bounce',

    mixins: [common],
    mounted() {
        // console.log(677);
    }
};
</script>
