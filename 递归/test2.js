//递归实现deep拷贝
var source = {a: 1,b:{ c:null, d: undefined,e: [1], f: [] }, c: {test: 1}};


function deepCopy(source) {
    var obj;
    if(source === null) return source;//注意null
    if(isArray(source)){
        obj = [];
    } else if(isPlainObj(source)){
        obj = {};
    } else {
        //不再具有下一层次
        return source;
    }
    if(isArray(source)){
        for(var i = 0, len = source.length; i < len; i++){
            obj.push(deepCopy(source[i]));
        }
    } else if(isPlainObj(source)){
        for(var key in source){
            if(source.hasOwnProperty(key)) {
                obj[key] = deepCopy(source[key]);
            }
        }
    }
    return obj;

}
function isObj(obj) {
    return typeof obj === 'object';
}
function isPlainObj(obj) {
    return typeof obj === 'object' && obj.constructor === Object;
}
function isArray(obj) {
    return typeof obj === 'object' && obj.constructor === Array;
}
var target = deepCopy(source);
target.a = 'testt'
console.log("source:", source, target);