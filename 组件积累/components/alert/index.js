import GzAlert from './alert.vue';

GzAlert.install = (Vue) => {
    Vue.component(GzAlert.name, GzAlert);
};

export default GzAlert;
