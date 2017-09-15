import Vue from 'vue';
import NotifyCostructor from './notify.vue';

const NotifyComponent = Vue.extend(NotifyCostructor);

let instance = null;

const Notify = (options) => {
    if (Vue.prototype.$isServer) return;

    if (instance) {
        instance.destroy({}, true);
    }
    instance = new NotifyComponent({
        data: {
            message: options.message,
            duration: options.duration
        }
    });
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el); // eslint-disable-line no-undef
    instance.vm.$on('allDone', () => {
        instance = null;
    });
};

Notify.prototype.clear = () => {
    if (!instance) return;
    instance.destroy({}, true);
    instance = null;
};

Notify.install = () => {
    Vue.prototype.$notify = Notify;
};

export default Notify;
