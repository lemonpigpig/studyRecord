export default {
    props: {
        id: Number,
        content: String
    },
    methods: {
        removeNode() {
            this.$emit('remove-node', [this.id, this.content]);
        },
        inputHandler(e) {
            this.$emit('input', [this.id, e.target.value]);
        },
        changeMode(e) {
            this.$emit('mode-change', [this.id, e.target.value]);
        }
    }
};
