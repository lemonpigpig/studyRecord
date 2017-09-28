<script>
    import Plugins from './plugins';

    export default {
        name: 'gz-rich-text',
        data() {
            return {
                contents: [],
                showTags: false
            };
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
            nodeClass: {
                type: Object,
                default() {
                    return {};
                }
            },
            defaultContents: Array
        },
        render(h) {
            return h('div', { class: ['gz-rich-text'] },
                [
                    this.contents.filter(node => this.allowTags.indexOf(node.type) >= 0)
                        .sort((a, b) => Number.parseInt(a.id, 10) - Number.parseInt(b.id, 10))
                        .map(node => ((
                            node, h(`gz-rich-text-${node.type}`, {
                                props: {
                                    id: node.id,
                                    content: node.content,
                                    mode: node.mode
                                },
                                class: this.nodeClass[node.type],
                                domProps: {
                                    key: node.id
                                },
                                on: {
                                    'remove-node': () => this.showRemoveConfirm(node),
                                    input: ([id, value]) => this.$set(this, 'contents', this.contents.map(c => (c.id === id ? Object.assign({}, c, {
                                        content: value
                                    }) : c))),
                                    'mode-change': ([id, mode]) => this.$set(this, 'contents', this.contents.map(c => (c.id === id ? Object.assign({}, c, {
                                        mode
                                    }) : c))),
                                    'img-click': params => this.$emit('img-click', [...params, this.setContent])
                                }
                            })
                        ))),
                    h('div', {
                        class: {
                            'rich-text-append': true,
                            hide: this.showTags
                        },
                        domProps: {
                            innerHTML: '+'
                        },
                        on: {
                            click: this.showTagOptions
                        }
                    }),
                    h('div', {
                        class: 'rich-text-options',
                        style: {
                            display: this.showTags ? 'block' : 'none'
                        }
                    }, [
                        this.allowTags.map(t => (
                            h('div', {
                                class: ['option', t],
                                domProps: {
                                    innerHTML: this.tagNames[t] || t.substring(0, 1)
                                },
                                on: {
                                    click: () => this.chooseTag(t)
                                }
                            })
                        )),
                        h('div', {
                            class: ['option', 'close'],
                            domProps: {
                                innerHTML: '&times;'
                            },
                            on: {
                                click: this.hideTagOptions
                            }
                        })
                    ])
                ]);
        },
        watch: {
            contents(val) {
                const error = this.validateContents(val);
                if (error) return this.$emit('contents-error', error);
                return this.$emit('input', val);
            },
            defaultContents() {
                if (this.contents.length === 0) this.$set(this, 'contents', this.defaultContents);
            }
        },
        components: {
            ...Plugins.reduce((obj, plugin) => Object.assign({}, obj, {
                [plugin.name]: plugin
            }), {})
        },
        methods: {
            setContent(id, content) {
                this.$set(this, 'contents', this.contents.map(c => ((c.id !== id || c.type !== 'image') ? c : Object.assign({}, c, {
                    content
                }))));
            },
            validateContents() {
                return null;
            },
            showTagOptions() {
                this.$set(this, 'showTags', true);
            },
            hideTagOptions() {
                this.$set(this, 'showTags', false);
            },
            showRemoveConfirm(removeNode) {
                const remove = global.confirm('确认要删除吗?');
                if (remove) {
                    this.$set(this, 'contents', this.contents.filter(c => c.id !== removeNode.id));
                }
            },
            chooseTag(type) {
                this.$set(this, 'contents', [...this.contents, Object.assign({
                    id: this.contents.length === 0 ?
                    0 : (this.contents[this.contents.length - 1].id + 1),
                    type
                }, Plugins.find(p => p.name === `gz-rich-text-${type}`).methods.getInitData())]);
                this.hideTagOptions();
            }
        }
    };
</script>
