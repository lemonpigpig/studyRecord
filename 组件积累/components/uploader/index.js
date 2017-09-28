import GzUploader from './uploader.vue';
import GzUploaderProgress from './uploader-progress.vue';

GzUploader.install = (Vue) => {
    Vue.component(GzUploader.name, GzUploader);
    Vue.component(GzUploaderProgress.name, GzUploaderProgress);
};

export default GzUploader;
