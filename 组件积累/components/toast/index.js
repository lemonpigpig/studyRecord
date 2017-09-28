import Vue from 'vue';
import ToastVue from './toast.vue';

const ToastComponemt = Vue.extend(ToastVue);

let instance = null;

const Toast = (options) => {
    if (Vue.prototype.$isServer) return;

    if (instance) {
        instance.update(options);
    } else {
        instance = new ToastComponemt({
            data: options
        });

        instance.vm = instance.$mount();

        document.body.appendChild(instance.vm.$el);
    }
};

Toast.prototype.destroy = () => {
    if (!instance) {
        return false;
    }

    instance.destroy();
    instance = null;
    return true;
};

export default Toast;
