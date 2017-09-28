<template lang="html">
    <div class="gz-rich-text__header">
        <select class="mode" @change="changeMode">
            <option v-for="option in modeOptions" :value="option.value" :selected="option.value === mode">{{option.text}}{{label}}</option>
        </select>
        <div class="triangle"></div>
        <div class="btns">
            <button @click.stop="removeNode">&times;</button>
        </div>
        <input class="content" @input="inputHandler" :value="content" />
    </div>
</template>

<script>
import BasePlugin from './rich-text-base';

export default {
    extends: BasePlugin,
    name: 'gz-rich-text-header',
    props: {
        id: Number,
        mode: String,
        content: String
    },
    data() {
        return {
            label: '标题',
            modeOptions: [{
                value: '1',
                text: '一级'
            }, {
                value: '2',
                text: '二级'
            }, {
                value: '3',
                text: '三级'
            }, {
                value: '4',
                text: '四级'
            }, {
                value: '5',
                text: '五级'
            }]
        };
    },
    methods: {
        getInitData() {
            return {
                mode: '1',
                content: ''
            };
        }
    }
};
</script>
