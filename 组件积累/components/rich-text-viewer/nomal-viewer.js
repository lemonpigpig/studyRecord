export default {
    name: 'normal-viewer',
    props: {
        contents: {
            type: Array,
            default() {
                return [];
            }
        },
        nodeClass: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    render(h) {
        return h('div', {
            class: 'gz-rich-text-viewer'
        }, this.mapContentsTags(this.contents, h));
    },
    methods: {
        mapContentsTags(contents, h) {
            return contents.map(c => h(
                this.parseToHTMLTag(c),
                this.mapDataObject(c),
                this.mapChildren(c, h)
            ));
        },
        parseToHTMLTag(cA) {
            const c = cA;
            if (c.type === 'image') {
                return 'img';
            } else if (c.type === 'header') {
                return `h${c.mode}`;
            } else if (c.type === 'list') {
                return c.mode;
            }
            return 'p';
        },
        mapDataObject(c) {
            const dataObject = {
                class: this.nodeClass[this.parseToHTMLTag(c)]
            };
            if (c.type === 'paragraph' || c.type === 'header') {
                return Object.assign({}, dataObject, {
                    domProps: {
                        innerHTML: c.content
                    }
                });
            } else if (c.type === 'image') {
                return Object.assign({}, dataObject, {
                    domProps: {
                        src: c.content
                    }
                });
            }
            return dataObject;
        },
        mapChildren(c, h) {
            if (c.type === 'list') {
                return c.content.map(row => h('li', {
                    domProps: {
                        innerHTML: row
                    }
                }));
            }
            return [];
        }
    }
};
