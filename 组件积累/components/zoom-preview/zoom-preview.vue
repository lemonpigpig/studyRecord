<template lang="pug">
    div(":class"="`${classPrefix}zoom-preview`"
        ref="zoomPreview"
        ":style"="{ height: `${height}px`, width: `${width}px`}"
        @mouseleave="showPreview = false"
        @mousemove="preview($event)")
            img(":src"="src")
            div(":class"="`${classPrefix}zoom-preview__zoom`" v-show="showPreview"
                ":style"="{ top: `${top}px`, left: `${left}px`, height: `${zoomHeight}px`, width: `${zoomWidth}px` }")
            div(":class"="`${classPrefix}zoom-preview__preview`"
                v-show="showPreview"
                ":style"="{ height: `${height}px`, width: `${width}px`, left: `${width + 10}px`}")
                img(":src"="previewSrc"
                    ref="previewImg"
                    ":style"="{ top: `${-top * zoom}px`, left: `${-left * zoom}px` }"
                    @load="setZoom")
</template>
<script>
    import { PREFIX } from '../../utilities/global-const';

    export default {
        name: `${PREFIX}zoom-preview`,
        data() {
            return {
                showPreview: false,
                top: 0,
                left: 0,
                classPrefix: PREFIX,
                zoom: 2,
                zoomHeight: 200,
                zoomWidth: 200
            };
        },
        props: {
            src: {
                type: String,
                default: '/public/img/gz-vue/zoom-preview-default.png'
            },
            previewSrc: {
                type: String,
                default: '/public/img/gz-vue/zoom-preview-src.png'
            },
            height: {
                type: Number,
                default: 400
            },
            width: {
                type: Number,
                default: 400
            }
        },
        methods: {
            setZoom() {
                this.$set(this, 'zoom', this.$refs.previewImg.naturalHeight / this.height);
                this.$set(this, 'zoomHeight', this.height / this.zoom);
                this.$set(this, 'zoomWidth', this.width / this.zoom);

                this.$refs.previewImg.style.height = `${this.$refs.previewImg.height}px`;
                this.$refs.previewImg.style.width = `${this.$refs.previewImg.width}px`;
            },
            preview(event) {
                const halfZoomHeight = this.zoomHeight / 2;
                const halfZoomWidth = this.zoomWidth / 2;
                let top = event.pageY - this.$refs.zoomPreview.parentElement.offsetTop;
                let left = event.pageX - this.$refs.zoomPreview.parentElement.offsetLeft;

                if (top < halfZoomHeight) {
                    top = 0;
                } else if (top > this.height - halfZoomHeight) {
                    top = this.height - this.zoomHeight;
                } else {
                    top -= halfZoomHeight;
                }

                if (left < halfZoomWidth) {
                    left = 0;
                } else if (left > this.width - halfZoomWidth) {
                    left = this.width - this.zoomWidth;
                } else {
                    left -= halfZoomWidth;
                }
                this.$set(this, 'showPreview', true);
                this.$set(this, 'top', top);
                this.$set(this, 'left', left);
            },
            destroy() {
                this.$destroy(true);
                this.$el.removeAttribute('style');
                this.$el.removeChild(this.$el.children[1]);
                this.$el.removeChild(this.$el.children[1]);
            }
        }
    };
</script>
