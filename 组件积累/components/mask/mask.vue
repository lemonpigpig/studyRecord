<template>
    <div class="gz-mask" :class="{'gz-mask--show':!isHidden||show}" @click="click">
        <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue';

    const freezeVp = (e) => {
        e.preventDefault();
    };

    export default {
        name: 'gz-mask',
        props: {
            isHidden: {
                type: Boolean,
                default: true
            },
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                originBodyOverflow: ''
            };
        },
        methods: {
            click() {
                this.$emit('click');
            },
            setOverflowHidden(value) {
                if (Vue.prototype.$isServer) return;

                const html = global.document.querySelector('html');
                if (value) {
                    this.$set(this, 'originBodyOverflow',
                        window.getComputedStyle(html, null).overflow);
                    html.style.overflow = 'hidden';
                    global.document.addEventListener('touchmove', freezeVp, false);
                } else {
                    html.style.overflow = this.originBodyOverflow;
                    global.document.removeEventListener('touchmove', freezeVp, false);
                }
            }
        },
        watch: {
            show(value) {
                this.setOverflowHidden(value);
            },
            isHidden(value) {
                this.setOverflowHidden(!value);
            }
        },
        mounted() {
            if (this.show || !this.isHidden) {
                this.setOverflowHidden(true);
            }
        },
        destroyed() {
            this.setOverflowHidden(false);
        }
    };
</script>
