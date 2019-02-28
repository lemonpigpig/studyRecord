var arr = [6, 12, 8, 4, 3, 9]

// 2 4 3  8 9
// [] [8, 4, 3, 9]
function quicksort(arr, target = []) {
    for (let i = 0; i < arr.length; i++) {
        let leftarr = []
        let rightarr = []
        for (let j = 0; j < arr.length; j++) {
            // debugger
            if (arr[i] > arr[j]) {
                leftarr.push(arr[j])
            } else {
                rightarr.push(arr[j])
            }
        }
        // console.log('---leftarr-----', arr[i], leftarr.length, rightarr)
        target[leftarr.length] = arr[i]

    }
    console.log(target)
    return target
}
quicksort(arr)

//不依赖新的数组
var arr = [5, 7, 2, 9, 3, 8, 4, 7, 1];
// 每次选择最左边的数作为基数
function quickSort1(arr) {
    if (arr.length < 2) { return arr; }
    // 定义左指针
    var left = 0;
    // 定义右指针
    var right = arr.length - 1;
    //开启每一轮的排序
    while (left < right) {
        // 寻找右边比arr[0]小的数的下标
        while (arr[right] >= arr[0] && left < right) {
            right = right - 1;
        }
        // 寻找左边比arr[0]大的数的下标
        while (arr[left] <= arr[0] && left < right) {
            left++;
        }
        //当左边指针与右边指针相遇后，交换arr[0]与当前两个指针所在的元素
        if (right == left) {
            let mid = arr[right];
            arr[right] = arr[0];
            arr[0] = mid;
            break;
        }
        // 当左指针小于右指针的位置，交换两个指针当前位置的元素
        let tem = arr[right];
        arr[right] = arr[left];
        arr[left] = tem;
    }
    //递归实现
    return quickSort(arr.slice(0, left)).concat(arr.slice(left, right + 1)).concat(quickSort(arr.slice(right + 1)));
}
//对数组进行排序
console.log(quickSort(arr));

function buble(arr) {
    let i = arr.length,
        j
    let temp = ''
    while (i > 0) {
        for (j = 0; j < i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
        i--
    }
    return arr
}


// 快排
function quickSort2(arr, i, j) {
    if (i < j) {
        let left = i;
        let right = j;
        let pivot = arr[left];
        while (i < j) {
            while (arr[j] >= pivot && i < j) { // 从后往前找比基准小的数
                j--;
            }
            if (i < j) {
                arr[i++] = arr[j];
            }
            while (arr[i] <= pivot && i < j) { // 从前往后找比基准大的数
                i++;
            }
            if (i < j) {
                arr[j--] = arr[i];
            }
        }
        arr[i] = pivot;
        quickSort2(arr, left, i - 1);
        quickSort2(arr, i + 1, right);
        return arr;
    }
}

// example
let arr = [2, 10, 4, 1, 0, 9, 5, 2];
console.log(quickSort(arr, 0, arr.length - 1));