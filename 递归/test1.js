//递归求和
var arr = [1,2,3,11]
function add(arr, n) {
    if(n>0)
        return arr[n] + add(arr, n-1)
    else
        return arr[0];
}
console.log(add(arr, 3));
// 11+add(arr, 2); return 11 + 6
// 3+add(arr, 1); return 3 + 3
// 2+add(arr, 0); => return 2+1
// return 1
