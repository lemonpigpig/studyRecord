import Vue from 'vue';

// const exportObjs = null;
const exportObj = {};
if (!Vue.prototype.$isServer) {
    const docStyle = document.documentElement.style;
    let engine;
    let translate3d = false;

    if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
        engine = 'presto';
    } else if ('MozAppearance' in docStyle) {
        engine = 'gecko';
    } else if ('WebkitAppearance' in docStyle) {
        engine = 'webkit';
    } else if (typeof navigator.cpuClass === 'string') {
        engine = 'trident';
    }

    const cssPrefix = { trident: '-ms-', gecko: '-moz-', webkit: '-webkit-', presto: '-o-' }[engine];

    const vendorPrefix = { trident: 'ms', gecko: 'Moz', webkit: 'Webkit', presto: 'O' }[engine];

    const helperElem = document.createElement('div');
    const perspectiveProperty = `${vendorPrefix}Perspective`;
    const transformProperty = `${vendorPrefix}Transform`;
    const transformStyleName = `${cssPrefix}transform`;
    const transitionProperty = `${vendorPrefix}Transition`;
    const transitionStyleName = `${cssPrefix}transition`;
    const transitionEndProperty = `${vendorPrefix.toLowerCase()}TransitionEnd`;

    if (helperElem.style[perspectiveProperty] !== undefined) {
        translate3d = true;
    }

    const getTranslate = function (element) {
        const result = { left: 0, top: 0 };
        if (element === null || element.style === null) return result;

        const transform = element.style[transformProperty];
        const matches = /translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/ig.exec(transform);
        if (matches) {
            result.left = +matches[1];
            result.top = +matches[3];
        }

        return result;
    };
    const cancelTranslateElement = function (elementP) {
        const element = elementP;
        if (element === null || element.style === null) return;
        let transformValue = element.style[transformProperty];
        if (transformValue) {
            transformValue = transformValue.replace(/translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g, '');
            element.style[transformProperty] = transformValue;
        }
    };

    const translateElement = function (elementP, xx, yy) {
        const element = elementP;
        let x = xx;
        let y = yy;
        if (x === null && y === null) return;

        if (element === null || element === undefined || element.style === null) return;

        if (!element.style[transformProperty] && x === 0 && y === 0) return;

        if (x === null || y === null) {
            const translate = getTranslate(element);
            if (x === null) {
                x = translate.left;
            }
            if (y === null) {
                y = translate.top;
            }
        }

        cancelTranslateElement(element);
        const xpx = x ? (`${x}px`) : '0px';
        const ypx = y ? (`${y}px`) : '0px';


        if (translate3d) {
            element.style[transformProperty] += ` translate(${xpx}, ${ypx}) translateZ(0px)`;
        } else {
            element.style[transformProperty] += ` translate(${xpx}, ${ypx})`;
        }
    };

    exportObj.transformProperty = transformProperty;
    exportObj.transformStyleName = transformStyleName;
    exportObj.transitionProperty = transitionProperty;
    exportObj.transitionStyleName = transitionStyleName;
    exportObj.transitionEndProperty = transitionEndProperty;

    exportObj.getElementTranslate = getTranslate;
    exportObj.translateElement = translateElement;
    exportObj.cancelTranslateElement = cancelTranslateElement;

    // exportObjs = exportObj;
}
export default exportObj;
