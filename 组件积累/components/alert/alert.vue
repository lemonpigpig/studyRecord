<template>
<div class="gz-alert" :class="{'show':show}">
    <gz-mask :show="show"></gz-mask>
    <div class="gz-alert-content" :class="{'show':show}">
        <slot></slot>
        <div class="gz-alert-buttons">
            <div class="btn-wrap" v-if="leftButtonText">
                <div class="gz-button left-button" @click="leftButtonClick">{{leftButtonText}}</div>
            </div>
            <div class="btn-wrap" v-if="rightButtonText">
                <div class="gz-button right-button" @click="rightButtonClick">{{rightButtonText}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import GzMask from '../mask';

export default {
    name: 'gz-alert',
    components: {
        [GzMask.name]: GzMask
    },
    props: {
        show: {
            type: Boolean,
            default() {
                return false;
            }
        },
        leftButtonText: String,
        rightButtonText: String
    },
    methods: {
        leftButtonClick() {
            this.$emit('leftButtonClick');
        },
        rightButtonClick() {
            this.$emit('rightButtonClick');
        }
    }
};
</script>
