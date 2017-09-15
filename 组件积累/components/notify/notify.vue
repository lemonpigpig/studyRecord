<template lang="html">
    <div :class="[show ? 'gz-notify--show' : '', 'gz-notify', ...customClass]">
        {{ msg }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: null,
            timeoutId: null,
            defaultDuration: 3000,
            customClass: [],
            show: false
        };
    },
    computed: {
        msg() {
            if (!this.message || this.message === '') {
                return '网络异常，请检查你的网络设置';
            }
            return this.message;
        }
    },
    watch: {
        curNotify() {
            this.startTimer();
        }
    },
    methods: {
        showNotify() {
            setTimeout(() => {
                this.$set(this, 'show', true);
            }, 0);
            this.$set(this, 'timeoutId', setTimeout(() => {
                if (this.show) {
                    this.$emit('allDone');
                    return this.$set(this, 'show', false);
                }
                return '';
            }, this.duration || this.defaultDuration));
        },
        destroy(e, force) {
            if (!this.show || force) {
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el);
            }
        }
    },
    mounted() {
        this.showNotify();
        this.$el.addEventListener('transitionend', this.destroy);
    }
};
</script>
