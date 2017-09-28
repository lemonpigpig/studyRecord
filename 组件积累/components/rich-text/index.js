import GzRichText from './core.vue';

GzRichText.install = (Vue) => {
    Vue.component(GzRichText.name, GzRichText);
};

export default GzRichText;
