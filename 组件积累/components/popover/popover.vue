<template lang="pug">
    div(":class"="[isShow ? '' : 'fn-hidden', `${classPrefix}popover`, theme == 'dark' ? `${classPrefix}popover--dark` : '']")
        div(":class"="[`${classPrefix}popover__mask`, `${classPrefix}popover__mask--show`]"
            @click='close')
            slot
</template>
<script>
    import { PREFIX } from '../../utilities/global-const';

    export default {
        name: `${PREFIX}popover`,
        data() {
            return {
                classPrefix: PREFIX
            };
        },

        props: {
            theme: {
                type: String,
                default: ''
            },
            isShow: {
                type: Boolean,
                default: false
            },
            placement: {
                type: String,
                default: 'bottomRight'  // 'left','right','top','bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
            }
        },

        methods: {
            close() {
                this.$emit('close');
            }

        }
    };
</script>
