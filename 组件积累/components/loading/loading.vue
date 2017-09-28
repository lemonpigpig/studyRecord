<template>
<div class="gz-loading" v-if="show">
    <slot name="title">
        <div class="loding-txt" v-text="title" v-if="title"></div>
    </slot>
    <component :is="spinner"></component>
</div>
</template>

<script>
const SPINNERS = [
    'snake',
    'double-bounce'
];
const parseSpinner = (indexA) => {
    let index = indexA;
    if ({}.toString.call(index) === '[object Number]') {
        if (SPINNERS.length <= index) {
            // console.warn(`'${index}' spinner not found, use the default spinner.`);
            index = 0;
        }
        return SPINNERS[index];
    }

    if (SPINNERS.indexOf(index) === -1) {
        // console.warn(`'${index}' spinner not found, use the default spinner.`);
        index = SPINNERS[0];
    }
    return index;
};


export default {
    name: 'gz-loading',
    data() {
        return {

        };
    },
    computed: {
        spinner() {
            return `spinner-${parseSpinner(this.type)}`;
        }
    },
    components: {
        SpinnerSnake: require('../spinner/spinner/snake.vue'),   // eslint-disable-line global-require
        SpinnerDoubleBounce: require('../spinner/spinner/double-bounce.vue') // eslint-disable-line global-require
    },
    props: {
        type: {
            default: 0
        },
        title: {
            type: String
        },
        show: {
            type: Boolean,
            default: true
        }
    },
    methods: {

    }
};
</script>
