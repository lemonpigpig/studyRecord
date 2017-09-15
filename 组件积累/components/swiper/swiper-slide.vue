<template>
<div class="swiper-slide">
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'gz-swiper-slide',
    mounted() {
        this.update();
    },
    updated() {
        this.update();
    },
    methods: {
        update() {
            if (this.$parent && this.$parent.swiper) {
                this.$parent.swiper.update(true);
                if (this.$parent.options.loop) {
                    this.$parent.swiper.destroyLoop();
                    this.$parent.swiper.createLoop();
                }
            }
        }
    }
};
</script>
