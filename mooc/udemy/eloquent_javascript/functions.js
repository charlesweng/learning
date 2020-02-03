/**
 * Created by charlesweng on 1/9/18.
 */
//closure
function divisibleBy(divisor) {
    return function(number) {
        return number % divisor == 0;
    }
}

let divisibleByThree = divisibleBy(3);
console.log("9 is divisible by 3: " + divisibleByThree(9));
console.log("10 is divisible by 3: " + divisibleByThree(10));
console.log();


//check if a number is a reachable by multiplying 3 or adding 5
function reachable(target, factor1 = 3, factor2 = 5, memory = 1, path = '1') {
    if (memory === target) {
        // console.log(path);
        console.log(path);
        return memory;
    }
    else if (memory > target) {
        console.log(path);
        return null;
    }
    else {
        let isNull = reachable(target, factor1, factor2, memory * factor1, '( ' + path + ' * ' + factor1 + ' )');
        if (isNull === null) {
            return reachable(target, factor1, factor2, memory + factor2, '( ' + path + ' + ' + factor2 + ' )');
        }
        else {
            return isNull;
        }
    }
}

console.log(reachable(13));
console.log();

function min(num1, num2) {
    if (num1 > num2) {
        return num2;
    }
    return num1;
}
console.log(min(10,9));
console.log(min(10,10));
console.log(min(10,11));
console.log();

function isEven(num) {
    if (num === 0) {
        return true;
    }
    else if (num === 1) {
        return false;
    }
    else {
        if (num > 0) {
            return isEven(num - 2);
        }
        else {
            return isEven(num + 2);
        }
    }
}
console.log('-2 is even: ' + isEven(-2));
console.log();

//currying countB's
function countChars(ch) {
    return (str) => {
        let charCount = 0;
        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) === ch) {
                charCount++;
            }
        }
        return charCount;
    }
}

let countBs = countChars('b');
console.log(countBs('abba'));
