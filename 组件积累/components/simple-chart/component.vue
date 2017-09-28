<template lang="pug">

	.wrapper(:id = "canvas_id")
		canvas

</template>

<script>
// import uuid from 'uuid/v4'

export default {
    name: 'gz-simple-chart',
    components: {},
    props: {
        width: {
            type: Number,
            default: 1
        },
        height: {
            type: Number,
            default: 1
        },
        pointList: {
            type: Array,
            default: [],
            validator: value => value instanceof Array
        },
        dirction: {
            default: 'H',
            validator: value => (value === 'H' || value === 'V')
        },
        option: {

        }
    },
    data() {
        return {
            // canvas_id: uuid()
        };
    },
    beforeMount: () => {
        // debugger;
    }
};
</script>

