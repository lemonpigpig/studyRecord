export default {
    props: {
        id: Number,
        content: String
    },
    methods: {
        inputHandler(e) {
            this.$emit('input', [this.id, e.target.value]);
        },
        changeMode(e) {
            this.$emit('mode-change', [this.id, e.target.value]);
        }
    }
};
