import Main from './main.vue'
import Vue from 'vue'

let modalStack = [];
let ModalConstructor = function () {};

function initModal(Main) {
    ModalConstructor = Vue.extend(Main)
}

let getAnInstance = () => {
    if (modalStack.length > 0) {
        let instance = modalStack[0];
        modalStack.splice(0, 1);
        return instance;
    }
    return new ModalConstructor({
        el: document.createElement('div')
    });
};

let returnAnInstance = instance => {
    if (instance) {
        modalStack.push(instance);
    }
};

let removeDom = event => {
    if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
    }
};
ModalConstructor.prototype.close = function () {
    this.visible = false;
    this.$el.addEventListener('transitionend', removeDom);
    this.closed = true;
    returnAnInstance(this);
};

let BoqiiModal = (options = {}) => {
    let templateModal = options.template;
    let props = options.params || {};
    let instance = {};
    Main.components = {
        templateModal
    };
    initModal(Main);
    instance = getAnInstance();
    instance.closed = false;
    clearTimeout(instance.timer);

    document.body.appendChild(instance.$el);
    Vue.nextTick(function () {
        instance.propsParams = props;
        instance.visible = true;
        instance.$el.removeEventListener('transitionend', removeDom);
    });
    return instance;
};

export default BoqiiModal;
