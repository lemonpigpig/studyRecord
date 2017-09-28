import Selector from './selector';
import utils from './utils';

export default {
    name: 'gz-rich-text-grid',
    props: {
        gridData: Array,
        allowTags: Array,
        allowClasses: Array,
        tagNames: Object,
        gridColumn: Number,
        imgLinkTypes: Array
    },
    render(h) {
        return h('div', { class: ['gz-rich-text-grid'] }, [
            this.gridData ? this.gridData.map((r, ri) => (
                h('div', {
                    class: {
                        'gz-rich-text-row': true,
                        editing: r.editing
                    }
                }, [
                    r.columns.map((c) => {
                        const columnClass = this.allowClasses.find(allow => allow.tag === c.class) || { tag: '', displayName: '默认' };
                        return (
                            h('div', {
                                class: ['gz-rich-text-col', `col-${c.span}`, 'selected', columnClass.tag],
                                style: {
                                    width: `${(100 / this.gridColumn) * c.span}%`
                                }
                            }, [
                                h('gz-rich-text-selector', {
                                    ref: `selector-${c.id}`,
                                    props: {
                                        allowTags: this.allowTags,
                                        tagNames: this.tagNames,
                                        id: c.id,
                                        content: c.content,
                                        imgLinkTypes: this.imgLinkTypes
                                    },
                                    on: {
                                        input: params => this.$emit('input', params),
                                        'img-click': params => this.$emit('img-click', params),
                                        'mode-change': params => this.$emit('mode-change', params),
                                        'choose-tag': params => this.$emit('choose-tag', params)
                                    }
                                }),
                                h('div', {
                                    class: ['gz-rich-text-btn-choose-class'],
                                    domProps: {
                                        innerHTML: columnClass.displayName
                                    },
                                    on: {
                                        click: (e) => {
                                            e.stopPropagation();
                                            this.$emit('choose-class', { e, cid: c.id });
                                        }
                                    }
                                }),
                                h('div', {
                                    class: ['gz-rich-text-btn-remove'],
                                    domProps: {
                                        innerHTML: '&times;'
                                    },
                                    on: {
                                        click: (e) => {
                                            e.stopPropagation();
                                            this.$emit('remove-col', { ri, cid: c.id });
                                        }
                                    }
                                }),
                                h('div', {
                                    class: ['gz-rich-text-btn-clear'],
                                    domProps: {
                                        innerHTML: '-'
                                    },
                                    on: {
                                        click: (e) => {
                                            e.stopPropagation();
                                            this.$emit('clear-col', { ri, cid: c.id });
                                        }
                                    }
                                })
                            ])
                        );
                    }),
                    utils.getTotalSpan(r) >= this.gridColumn
                    ? []
                    : utils.range(this.gridColumn - utils.getTotalSpan(r)).map(i => (
                        h('div', {
                            class: ['gz-rich-text-col', 'col-1'],
                            style: {
                                width: `${100 / this.gridColumn}%`
                            },
                            domProps: {
                                innerHTML: utils.showEmptyColText(r.editing, i)
                            },
                            on: {
                                click: (e) => {
                                    e.stopPropagation();
                                    if (!r.editing && i === 0) {
                                        this.$emit('modify-row-state', { ri, state: true });
                                    } else if (r.editing) {
                                        this.$emit('malloc-col', { ri, span: i + 1 });
                                    }
                                }
                            }
                        })
                    ))
                ])
            )) : []
        ]);
    },
    components: {
        [Selector.name]: Selector
    },
    methods: {
        chooseDefaultTag(id) {
            this.$refs[`selector-${id}`].chooseDefaultTag();
        }
    }
};
