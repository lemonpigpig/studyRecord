<template lang="html">
    <div class="gz-rich-text-pro__image">
        <div class="preview">
            <img :src="imgURL" @click="imgClickHandelr">
            <div class="input-group">
                <select class="link-prefix" v-model="linkType">
                    <option :value="item.value" v-for="item in imgLinkTypes">{{item.name}}</option>
                </select>
                <input
                    type="text"
                    class="link-input"
                    @keypress.entry="linkChangeHandler"
                    @blur="linkChangeHandler"
                    :value="content.linkValue">
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
        content: Object,
        imgLinkTypes: Array
    },
    data() {
        return {
            label: '图片',
            linkValueReg: /^\/[A-Za-z0-9+&@#/%?=~_|!,.]/i,
            linkValue: '',
            linkType: ''
        };
    },
    watch: {
        linkType() {
            this.$emit('input', [this.id, Object.assign({}, this.content, {
                linkValue: this.linkValueValid ? this.linkValue : '',
                linkType: this.linkValueValid ? this.linkType : 'URL'
            })]);
        }
    },
    computed: {
        imgURL() {
            return (this.content && this.content.imgURL && this.content.imgURL !== '')
                ? this.content.imgURL
                : '/public/img/gz-vue/rich-text-bg.svg';
        },
        linkValueValid() {
            if (this.linkType === 'URL') {
                return this.linkValue === '' || this.linkValueReg.test(this.linkValue);
            }
            return true;
        }
    },
    methods: {
        getInitData() {
            return {
                content: {
                    imgURL: '',
                    linkValue: '',
                    linkType: ''
                }
            };
        },
        imgClickHandelr(e) {
            this.$emit('img-click', [e, this.id]);
        },
        linkChangeHandler(e) {
            const linkValue = e.target.value;
            this.$set(this, 'linkValue', linkValue);
            this.$emit('input', [this.id, Object.assign({}, this.content, {
                linkValue: this.linkValueValid ? linkValue : '',
                linkType: this.linkValueValid ? this.linkType : 'URL'
            })]);
        }
    },
    mounted() {
        this.$set(this, 'linkValue', this.content.linkValue);
        this.$set(this, 'linkType', this.content.linkType);
    }
};
</script>
