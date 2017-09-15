import NormalViewer from './nomal-viewer';
import ProViewer from './pro-viewer';

export default {
    name: 'gz-rich-text-viewer',
    components: {
        [NormalViewer.name]: NormalViewer,
        [ProViewer.name]: ProViewer
    },
    props: {
        contents: {
            type: [Array, Object],
            default() {
                return [];
            }
        },
        nodeClass: {
            type: Object,
            default() {
                return {};
            }
        },
        type: {
            type: String,
            default() {
                return 'normal';
            }
        }
    },
    render(h) {
        return h(`${this.type}-viewer`, {
            class: `gz-rich-text-viewer-${this.type}`,
            props: {
                contents: this.type === 'pro' ? this.contents.gridData : this.contents,
                nodeClass: this.nodeClass,
                gridColumn: this.type === 'pro' ? this.contents.gridColumn : null
            },
            on: {
                'img-jump-to': params => this.$emit('img-jump-to', params)
            }
        });
    }
};
