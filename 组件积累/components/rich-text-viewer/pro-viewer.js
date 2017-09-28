const getTotalSpan = r => r.columns.reduce((sum, c) => sum + c.span, 0);
const range = end => [...Array(end).keys()];

export default {
    name: 'pro-viewer',
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
        },
        gridColumn: Number
    },
    render(h) {
        return h('div', {
            class: 'gz-rich-text-viewer'
        }, this.mapGrid(this.contents, h));
    },
    methods: {
        mapGrid(contents, h) {
            return contents.map(r => (
                h('div', {
                    class: ['gz-rich-text-viewer-row']
                }, [
                    r.columns.map(c => (
                        h('div', {
                            class: ['gz-rich-text-viewer-col', `col-${c.span}`, c.class],
                            style: {
                                width: `${(100 / this.gridColumn) * c.span}%`
                            }
                        }, [
                            this.getTag(c.content, h)
                        ])
                    )),
                    this.gridColumn - getTotalSpan(r) <= 0
                    ? []
                    : range(this.gridColumn - getTotalSpan(r)).map(() => (
                        h('div', {
                            class: ['gz-rich-text-viewer-col', 'col-1'],
                            style: {
                                width: `${100 / this.gridColumn}%`
                            },
                            domProps: {
                                innerHTML: ''
                            }
                        })
                    ))
                ])
            ));
        },
        getTag(content, h) {
            return h(
                this.parseToHTMLTag(content),
                this.mapDataObject(content),
                this.mapChildren(content, h)
            );
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
            return 'div';
        },
        mapDataObject(c) {
            const dataObject = {};
            if (c.type === 'header') {
                return Object.assign({}, dataObject, {
                    domProps: {
                        innerHTML: c.content
                    }
                });
            } else if (c.type === 'image') {
                return Object.assign({}, dataObject, {
                    class: {
                        link: c.content.linkValue
                    },
                    domProps: {
                        src: c.content.imgURL
                    },
                    on: {
                        click: () => this.$emit('img-jump-to', c.content)
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
            } else if (c.type === 'paragraph') {
                return c.content.split('\n').map(row => h('p', {
                    domProps: {
                        innerHTML: row
                    }
                }));
            }
            return [];
        }
    }
};
