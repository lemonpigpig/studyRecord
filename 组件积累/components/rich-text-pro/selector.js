import Plugins from './plugins';

export default {
    name: 'gz-rich-text-selector',
    data() {
        return {
            showTags: false
        };
    },
    props: {
        id: Number,
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
        content: Object,
        imgLinkTypes: Array
    },
    render(h) {
        return h('div', { class: ['gz-rich-text-selector'] },
            [
                this.content
                ? h(`gz-rich-text-${this.content.type}`, {
                    props: {
                        id: this.id,
                        ...this.content,
                        imgLinkTypes: this.imgLinkTypes
                    },
                    on: {
                        'mode-change': params => this.$emit('mode-change', params),
                        input: params => this.$emit('input', params),
                        'img-click': params => this.$emit('img-click', params)
                    }
                })
                : h('div', {
                    class: {
                        'rich-text-append': true,
                        hide: this.showTags || !!this.content
                    },
                    domProps: {
                        innerHTML: '?'
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
                    ...this.allowTags.map(t => (
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
    components: {
        ...Plugins.reduce((obj, plugin) => Object.assign({}, obj, {
            [plugin.name]: plugin
        }), {})
    },
    methods: {
        showTagOptions() {
            this.$set(this, 'showTags', true);
        },
        hideTagOptions() {
            this.$set(this, 'showTags', false);
        },
        chooseTag(type) {
            this.$emit('choose-tag', [this.id, Object.assign(
                Plugins.find(p => p.name === `gz-rich-text-${type}`).methods.getInitData(),
                { type },
            )]);
            this.hideTagOptions();
        },
        chooseDefaultTag() {
            this.chooseTag(this.allowTags[0]);
        }
    }
};
