<template>
    <div class="gz-picker"
         :class="{ 'picker-3d': rotateEffect }">
        <div class="gz-picker-toolbar"
             v-if="showToolbar">
            <slot>
                <div class="gz-picker-btn">
                    <span @click="cancle" v-text="cancelText"></span>
                    <span @click="confirm" v-text="confirmText"></span>
                </div>
            </slot>
        </div>
        <div class="gz-picker-items">
            <picker-slot v-for="(slot, index) in slots"
                         v-model="values[slot.valueIndex]"
                         :key="index"
                         :valueKey="valueKey"
                         :values="slot.values || []"
                         :text-align="slot.textAlign || 'center'"
                         :visible-item-count="visibleItemCount"
                         :class-name="slot.className"
                         :flex="slot.flex"
                         :rotate-effect="rotateEffect"
                         :divider="slot.divider"
                         :content="slot.content"
                         :itemHeight="computedItemHeight"
                         :default-index="slot.defaultIndex"></picker-slot>
            <div class="gz-picker-center-highlight"
                 :style="{ height: computedItemHeight + 'px', marginTop: -computedItemHeight/4 +'px' }"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'gz-picker',
        componentName: 'picker',
        props: {
            slots: {
                type: Array
            },
            showToolbar: {
                type: Boolean,
                default: false
            },
            visibleItemCount: {
                type: Number,
                default: 5
            },
            valueKey: String,
            rotateEffect: {
                type: Boolean,
                default: false
            },
            itemHeight: {
                type: Number,
                default: 36
            },
            value: null,
            cancelText: {
                type: String,
                default: '取消'
            },
            confirmText: {
                type: String,
                default: '确定'
            },
            col: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                currentValue: null,
                show: true
            };
        },
        watch: {
            value(val) {
                this.currentValue = val;
            }
        },
        components: {
            PickerSlot: require('./picker-slot.vue') // eslint-disable-line global-require
        },
        created() {
            this.$on('slotValueChange', this.slotValueChange);
            const slots = this.slots || [];
            this.values = [];
            const values = this.values;
            let valueIndexCount = 0;
            slots.forEach((slotA) => {
                const slot = slotA;
                if (!slot.divider) {
                    valueIndexCount += 1;
                    slot.valueIndex = valueIndexCount;
                    values[slot.valueIndex] = (slot.values || [])[slot.defaultIndex || 0];
                }
            });
        },

        mounted() {
            this.currentValue = this.value;
            if (this.currentValue) {
                this.setSlotsByValues(this.currentValue);
            }
        },
        methods: {
            hideMask() {
                this.show = false;
            },
            onChange(picker) {
                const values = picker.$children.filter(child =>
                child.currentValue !== undefined).map(child => child.currentValue);
                this.currentValue = this.getValue(values);
                this.handleValueChange();
            },
            getValue(values) {
                let value;
                if (this.col === 1) {
                    value = values.join('');
                } else if (this.col === 2) {
                    value = values.join('-');
                }
                return value;
            },
            setSlotsByValues(values) {
                const setSlotValue = this.setSlotValue;
                if (this.col === 1) {
                    setSlotValue(0, values.split(/-|\/|\./)[0]);
                } else if (this.col === 2) {
                    setSlotValue(0, values.split(/-|\/|\./)[0]);
                    setSlotValue(1, values.split(/-|\/|\./)[1]);
                }
                [].forEach.call(this.$children, child => child.doOnValueChange());
            },
            confirm() {
                this.$emit('confirm', this.currentValue);
            },
            cancle() {
                this.$emit('cancel', this.currentValue);
            },
            handleValueChange() {
                this.$emit('input', this.currentValue);
            },
            slotValueChange() {
                this.onChange(this);
                this.$emit('change', this, this.values);
            },
            getSlot(slotIndex) {
                const slots = this.slots || [];
                let count = 0;
                let target;
                const children = this.$children.filter(child => child.$options.name === 'picker-slot');

                slots.forEach((slot, index) => {
                    if (!slot.divider) {
                        if (slotIndex === count) {
                            target = children[index];
                        }
                        count += 1;
                    }
                });

                return target;
            },
            getSlotValue(index) {
                const slot = this.getSlot(index);
                if (slot) {
                    return slot.value;
                }
                return null;
            },
            setSlotValue(index, value) {
                const slot = this.getSlot(index);
                if (slot) {
                    slot.currentValue = value;
                }
            },
            getSlotValues(index) {
                const slot = this.getSlot(index);
                if (slot) {
                    return slot.mutatingValues;
                }
                return null;
            },
            setSlotValues(index, values) {
                const slot = this.getSlot(index);
                if (slot) {
                    slot.mutatingValues = values;
                }
            },
            getValues() {
                return this.values;
            },
            setValues(valuesA) {
                const slotCount = this.slotCount;
                const values = valuesA || [];
                if (slotCount !== values.length) {
                    throw new Error('values length is not equal slot count.');
                }
                values.forEach((value, index) => {
                    this.setSlotValue(index, value);
                });
            }
        },

        computed: {
            values() {
                const slots = this.slots || [];
                const values = [];
                slots.forEach((slot) => {
                    if (!slot.divider) values.push(slot.value);
                });

                return values;
            },
            slotCount() {
                const slots = this.slots || [];
                let result = 0;
                slots.forEach((slot) => {
                    if (!slot.divider) {
                        result += 1;
                    }
                });
                return result;
            },
            computedItemHeight() {
                if (document && document.querySelector('html').dataset.dpr === '1') {
                    return this.itemHeight / 2;
                }
                return this.itemHeight;
            }
        }
    };
</script>
