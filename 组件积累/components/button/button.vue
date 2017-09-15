<template>
<div class="gz-button" @click="click">
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'gz-button',
    methods: {
        click() {
            this.$emit('click');
        }
    }
};
</script>
