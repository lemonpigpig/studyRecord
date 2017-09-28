<template lang="pug">
    div(":class"="[isShow ? '' : 'fn-hidden', `${classPrefix}toast`]")
        div(":class"="[`${classPrefix}toast__mask`, mask ? `${classPrefix}toast__mask--show` : '']")
        div(":style"="{left: left, top: top}" ref="content" ":class"="[`${classPrefix}toast__content`]")
            gz-icon(size="40" class-name="loading" icon="loading" v-if="type === 'loading'")
            gz-icon(size="40" icon="error" v-if="type === 'error'")
            gz-icon(size="40" icon="warn" v-if="type === 'warn'")
            gz-icon(size="40" icon="success" v-if="type === 'success'")
            gz-icon(size="40" icon="error" v-if="type === 'fail'")
            gz-icon(size="40" icon="offline" v-if="type === 'offline'")
            div {{ content }}
</template>
<script>
import { PREFIX } from '../../utilities/global-const';

export default {
    data() {
        return {
            type: 'info',    // info, success, fail, warn, loading, offline, error
            content: '',
            mask: false,
            onClose: '',
            duration: 2000,
            isShow: false,
            activeTimeout: {},
            left: '50%',
            top: '50%',
            classPrefix: PREFIX
        };
    },

    methods: {
        show() {
            this.$set(this, 'isShow', true);
            clearTimeout(this.activeTimeout);

            this.$nextTick(() => {
                const rect = this.$refs.content.getBoundingClientRect();
                this.top = `${((window.innerHeight - rect.height) / 2)}px`;
                this.left = `${((window.innerWidth - rect.width) / 2)}px`;
            });

            this.activeTimeout = setTimeout(() => {
                this.$set(this, 'isShow', false);
                this.$set(this, 'mask', false);
                if (typeof (this.onClose) === 'function') {
                    this.onClose();
                }
            }, this.duration);
        },
        destroy() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },
        update(options) {
            if (options.type) {
                this.$set(this, 'type', options.type);
            } else {
                this.$set(this, 'type', 'info');
            }

            if (options.content) {
                this.$set(this, 'content', options.content);
            } else {
                this.$set(this, 'content', '');
            }

            if (options.mask) {
                this.$set(this, 'mask', options.mask);
            } else {
                this.$set(this, 'mask', false);
            }

            if (options.onClose) {
                this.$set(this, 'onClose', options.onClose);
            } else {
                this.$set(this, 'onClose', '');
            }

            if (options.duration) {
                this.$set(this, 'duration', options.duration);
            } else {
                this.$set(this, 'duration', 2000);
            }
            this.show();
        }
    },

    mounted() {
        this.show();
    }
};
</script>
