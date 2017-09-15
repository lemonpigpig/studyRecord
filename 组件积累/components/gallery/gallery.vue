<template>
    <div class="gz-gallery">
        <div class="waterfall">
            <div class="img-box"
                 v-for="(item,index) in items"
                 @click="showGallerySlider(index)">
                <img :src="item.imageUrl">
            </div>
        </div>
        <div class="gallery-slider-container"
             v-if="isShowGallerySlider"
             @click="hideGallerySlider">
            <gz-gallery-slider :items="items"
                               :initIndex="currentIndex"
                               @click="hideGallerySlider"></gz-gallery-slider>
        </div>
    </div>
</template>

<script>
import GzGallerySlider from './gallery-slider.vue';

export default {
    name: 'gz-gallery',
    data() {
        return {
            currentIndex: 0,
            isShowGallerySlider: false
        };
    },
    computed: {

    },
    props: {
        options: Object,
        items: Array
    },
    methods: {
        showGallerySlider(index) {
            this.$set(this, 'currentIndex', index);
            this.$set(this, 'isShowGallerySlider', true);
        },
        hideGallerySlider() {
            this.$set(this, 'isShowGallerySlider', false);
        }
    },
    components: {
        [GzGallerySlider.name]: GzGallerySlider
    },
    mounted() {
        // console.log(this.options, this.items);
    }
};
</script>
