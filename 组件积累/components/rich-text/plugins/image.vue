<template lang="html">
    <div class="gz-rich-text__image">
        <label class="label">{{label}}</label>
        <div class="btns">
            <button @click.stop="removeNode">&times;</button>
        </div>
        <div class="preview">
            <img :src="imgURL" @click="imgClickHandelr">
            <div class="input-group">
                <input type="text" class="content" @keypress.entry="inputHandler" @blur="inputHandler" :value="content">
            </div>
        </div>
    </div>
</template>

<script>
import BasePlugin from './rich-text-base';

export default {
    extends: BasePlugin,
    name: 'gz-rich-text-image',
    props: {
        id: Number,
        content: String
    },
    data() {
        return {
            label: '图片'
        };
    },
    computed: {
        imgURL() {
            return (this.content && this.content !== '') ? this.content : '/public/img/gz-vue/rich-text-bg.svg';
        }
    },
    methods: {
        getInitData() {
            return {
                content: ''
            };
        },
        imgClickHandelr(e) {
            this.$emit('img-click', [e, this.id]);
        }
    }
};
</script>
