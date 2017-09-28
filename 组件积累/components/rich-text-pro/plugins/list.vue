<template lang="html">
    <div class="gz-rich-text-pro__list">
        <select class="mode" @change="changeMode">
            <option v-for="option in modeOptions" :value="option.value" :selected="option.value === mode">{{option.text}}{{label}}</option>
        </select>
        <div class="triangle"></div>
        <div class="input-group" v-for="(row, index) in content">
            <div class="prefix" @click="removeRow(index)">-</div>
            <input class="content" :value="row" @input="changeRow(index, $event)"/>
        </div>
        <div class="input-group add">
            <div class="prefix" @click="addRow">+</div>
            <input class="content" v-model="newRow" @keypress.enter="addRow" placeholder="创建新行"/>
        </div>
    </div>
</template>

<script>
import BasePlugin from './rich-text-base';

export default {
    extends: BasePlugin,
    name: 'gz-rich-text-list',
    props: {
        id: Number,
        mode: String,
        content: Array
    },
    data() {
        return {
            label: '列表',
            modeOptions: [{
                value: 'ol',
                text: '有序'
            }, {
                value: 'ul',
                text: '无序'
            }],
            newRow: ''
        };
    },
    methods: {
        getInitData() {
            return {
                mode: 'ul',
                content: []
            };
        },
        addRow() {
            const newRow = this.newRow;
            this.$set(this, 'newRow', '');
            this.$emit('input', [this.id, [...this.content, newRow]]);
        },
        changeRow(index, e) {
            this.$emit('input', [this.id, this.content.map((r, i) => (i === index ? e.target.value : r))]);
        },
        removeRow(index) {
            this.$emit('input', [this.id, this.content.filter((r, i) => i !== index)]);
        }
    }
};
</script>
