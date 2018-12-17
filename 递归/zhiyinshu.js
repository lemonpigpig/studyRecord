function chai(num) {
	let stack=[], res = []
	stack.push(num)
	
	while(stack.length > 0) {
		let temp = stack.pop()
		for(let i = 2;i<=temp;i++) {
			if(temp%i===0) {
				if(iszhishu(i)) {
					res.push(i)
					stack.push(temp/i)
					break
				}
			}
		}
	}
	return res;
}
function iszhishu(num) {
	if(num === 1) return false;
	for(let i = 2; i<num; i++) {
		if(num%2===0) {
			return false
		}
	}
	return true
}
