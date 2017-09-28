import GzRichTextViewer from './rich-text-viewer';

GzRichTextViewer.install = (Vue) => {
    Vue.component(GzRichTextViewer.name, GzRichTextViewer);
};

export default GzRichTextViewer;
