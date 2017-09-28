import Gallery from './gallery.vue';

Gallery.install = (Vue) => {
    Vue.component(Gallery.name, Gallery);
};

export default Gallery;
