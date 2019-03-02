var arr = [

    { id: 1, pid: 0 },
    { id: 2, pid: 0 },
    { id: 11, pid: 1 },
    { id: 12, pid: 1 },
    { id: 21, pid: 2 },
    {
        id: 111,
        pid: 11
    }

]
arr.sort((a, b) => {
    return b.id - a.id
})
let output = []
let obj = {}
for (let i in arr) {
    obj[arr[i].id] = arr[i]
}

let rootid = arr[arr.length - 1].id
obj[rootid].children = []
for (let i in arr) {
    let pid = arr[i].pid
    let id = arr[i].id
    console.log(pid, id)

    if (pid == 0) {
        output.push(obj[id])
    } else if (pid > 0) {
        if (!obj[pid].children) {
            obj[pid].children = []
        }
        obj[pid].children.push(obj[id])
    }
}
console.log('-----output----:', output)