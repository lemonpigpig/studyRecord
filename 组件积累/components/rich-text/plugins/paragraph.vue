<template lang="html">
    <div class="gz-rich-text__paragraph">
        <label class="label" for="">{{label}}</label>
        <div class="btns">
            <button @click.stop="removeNode">&times;</button>
        </div>
        <textarea class="content" rows="8" @input="inputHandler" :value="content"></textarea>
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
