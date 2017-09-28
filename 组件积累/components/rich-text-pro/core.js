import Vue from 'vue';
import GzAlert from '../alert';
import Grid from './grid';
import Utils from './utils';

export default {
    name: 'gz-rich-text-pro',
    components: {
        [Grid.name]: Grid,
        [GzAlert.name]: GzAlert
    },
    data() {
        return {
            gridData: [],
            gridColumn: 0,
            editingCol: null,
            showClassSelector: null
        };
    },
    computed: {
        id() {
            return Utils.getNextId(this.gridData);
        }
    },
    props: {
        allowTags: {
            type: Array,
            default() {
                return ['paragraph', 'image', 'header', 'list'];
            }
        },
        tagNames: {
            type: Object,
            default() {
                return {
                    paragraph: '段落',
                    image: '图片',
                    header: '标题',
                    list: '列表'
                };
            }
        },
        defaultGridData: Object,
        allowClasses: {
            type: Array,
            default() {
                return [];
            }
        },
        imgLinkTypes: {
            type: Array,
            default() {
                return [{
                    value: 'URL',
                    name: 'URL'
                }];
            }
        }
    },
    watch: {
        gridData(val) {
            const error = this.validateContents(val);
            if (error) return this.$emit('contents-error', error);
            return this.$emit('input', {
                gridData: val,
                gridColumn: this.gridColumn
            });
        },
        defaultGridData() {
            if (this.gridData && this.gridData.length === 0) this.$set(this, 'gridData', this.defaultGridData.gridData);
            this.$set(this, 'gridColumn', Number.parseInt(this.defaultGridData.gridColumn, 10));
        }
    },
    render(h) {
        return h('div', {
            class: ['gz-rich-text-pro']
        }, [
            h('div', {
                class: ['gz-rich-text-global-params']
            }, [
                h('label', {
                    class: ['gz-rich-text-param-label'],
                    domProps: {
                        innerHTML: '总列数:'
                    }
                }),
                h('input', {
                    class: ['gz-rich-text-param-label'],
                    domProps: {
                        type: 'number',
                        value: this.gridColumn
                    },
                    on: {
                        keypress: this.gridColumnPressHandler
                    }
                })
            ]),
            h('gz-rich-text-grid', {
                ref: 'grid',
                props: {
                    allowTags: this.allowTags,
                    allowClasses: this.allowClasses,
                    tagNames: this.tagNames,
                    gridData: this.gridData,
                    gridColumn: this.gridColumn,
                    imgLinkTypes: this.imgLinkTypes
                },
                on: {
                    input: this.inputHandler,
                    'modify-row-state': this.modifyRowState,
                    'malloc-col': this.mallocCol,
                    'remove-col': this.removeCol,
                    'clear-col': this.clearCol,
                    'choose-tag': this.chooseTag,
                    'choose-class': this.showChooseClass,
                    'img-click': params => this.$emit('img-click', [...params, this.setContent]),
                    'mode-change': this.modeChagne
                }
            }),
            h('div', {
                class: ['gz-rich-text-grid-append'],
                domProps: {
                    innerHTML: '+点击新增一行'
                },
                on: {
                    click: this.appendRow
                }
            }),
            h('div', {
                class: ['gz-rich-text-classes-selector'],
                style: [{
                    display: this.showClassSelector ? 'block' : 'none',
                    top: `${this.showClassSelector ? this.showClassSelector.top + 27 : 0}px`,
                    left: `${this.showClassSelector ? this.showClassSelector.left : 0}px`
                }]
            }, [
                this.allowClasses.map(cls => (
                    h('div', {
                        class: ['gz-rich-text-class'],
                        domProps: {
                            innerHTML: cls.displayName
                        },
                        on: {
                            click: () => this.chooseClass(cls)
                        }
                    })
                ))
            ]),
            h('div', {
                class: ['gz-rich-text-mask'],
                style: [{
                    display: (this.gridData && this.gridData.find(r => r.editing)) ? 'block' : 'none'
                }],
                on: {
                    click: this.resetGridDataState
                }
            })
        ]);
    },
    methods: {
        validateContents() {
            return null;
        },
        setContent(id, imgURL) {
            const col = Utils.findColumnById(this.gridData, id);
            this.$set(col, 'content', Object.assign({}, col.content, {
                content: Object.assign({}, col.content.content, {
                    imgURL
                })
            }));
        },
        chooseTag([id, initData]) {
            const col = Utils.findColumnById(this.gridData, id);
            this.$set(col, 'content', initData);
        },
        modeChagne([id, mode]) {
            const col = Utils.findColumnById(this.gridData, id);
            this.$set(col, 'content', Object.assign({}, col.content, {
                mode
            }));
        },
        inputHandler([id, value]) {
            const col = Utils.findColumnById(this.gridData, id);
            this.$set(col, 'content', Object.assign({}, col.content, {
                content: value
            }));
        },
        appendRow() {
            this.$set(this, 'gridData', [...(this.gridData || []), {
                columns: []
            }]);
            if (this.allowClasses.length === 1 && this.gridColumn === 1) {
                const col = this.mallocCol({
                    ri: this.gridData.length - 1,
                    span: this.gridColumn
                });
                Vue.nextTick(() => {
                    this.$refs.grid.chooseDefaultTag(col.id);
                });
            }
        },
        modifyRowState({ ri, state }) {
            this.resetGridDataState();
            this.$set(this.gridData[ri], 'editing', state);
        },
        showChooseClass({ e, cid }) {
            if (this.showClassSelector) {
                this.$set(this, 'editingCol', null);
                this.$set(this, 'showClassSelector', null);
            } else {
                const offset = e.target.getBoundingClientRect();
                const origin = Utils.getParent(e.target, '.gz-rich-text-grid').getBoundingClientRect();
                this.$set(this, 'editingCol', Utils.findColumnById(this.gridData, cid));
                this.$set(this, 'showClassSelector', {
                    top: offset.top - origin.top,
                    left: offset.left - origin.left
                });
            }
        },
        chooseClass(c) {
            this.$set(this.editingCol, 'class', c.tag);
            this.$set(this, 'editingCol', null);
            this.$set(this, 'showClassSelector', null);
        },
        resetGridDataState() {
            this.$set(this, 'gridData', this.gridData.map(r => Object.assign({}, r, {
                editing: false
            })));
        },
        mallocCol({ ri, span }) {
            const row = this.gridData[ri];
            const newCol = {
                id: this.id,
                span
            };
            this.$set(row, 'columns', [...row.columns, newCol]);
            this.resetGridDataState();
            return newCol;
        },
        removeCol({ ri, cid }) {
            const row = this.gridData[ri];
            this.$set(row, 'columns', row.columns.filter(c => c.id !== cid));
        },
        clearCol({ ri, cid }) {
            const col = this.gridData[ri].columns.find(c => c.id === cid);
            this.$set(col, 'content', null);
        },
        gridColumnPressHandler(e) {
            if (e.keyCode !== 13) return;
            this.$emit('grid-column-change', [e.target.value, this.changeGridColumn]);
        },
        changeGridColumn(value) {
            this.$set(this, 'gridData', null);
            this.$set(this, 'gridColumn', Number.parseInt(value, 10));
        }
    },
    beforeMount() {
        if (!this.defaultGridData) return;
        if (this.defaultGridData.gridColumn) {
            this.$set(this, 'gridColumn', this.defaultGridData.gridColumn);
        }
        if (this.defaultGridData.gridData) {
            this.$set(this, 'gridData', this.defaultGridData.gridData.map(r => Object.assign({}, r, {
                editing: false
            })));
        }
    }
};
