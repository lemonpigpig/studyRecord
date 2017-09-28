<template lang="html">
    <div class="gz-rich-text-pro__paragraph">
        <label class="label" for="">{{label}}</label>
        <textarea class="content" :rows="rows" @input="inputHandler" :value="content"></textarea>
    </div>
</template>

<script>
import BasePlugin from './rich-text-base';

export default {
    extends: BasePlugin,
    name: 'gz-rich-text-paragraph',
    props: {
        id: Number,
        content: String
    },
    computed: {
        rows() {
            return Math.max((this.content || '').split('\n').length, 1);
        }
    },
    data() {
        return {
            label: '段落'
        };
    },
    methods: {
        getInitData() {
            return {
                content: ''
            };
        }
    }
};
</script>
