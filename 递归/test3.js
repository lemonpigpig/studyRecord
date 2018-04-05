// f(n) = f(n-1)+f(n-2)

function fb(n) {
    if(n > 2) {
        return fb(n-1) + fb(n-2)
    } else return 1;
    
}

console.log(fb(7));

// fb(7) => fb(6) + fb(5); 8 + 5 = 13;
// fb(6) => fb(5) + fb(4); 5+3 = 8
// fb(5) => fb(4) + fb(3); 3+ 2 = 5
// f(4) => fb(3) + fb(2); 3
// fb(3) => f(2) + f(1); => 2