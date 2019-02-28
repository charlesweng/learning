/**
 * Created by charlesweng on 1/13/18.
 */
/**
 * methods:
 * String
 * ======
 * concat
 * slice
 * indexOf
 * lastIndexOf
 * trim
 *
 * array
 * =====
 * indexOf
 * lastIndexOf
 * slice
 * shift (pop)
 * unshift (insert)
 * push
 * 
 */

arr = [];
arr.push(1);
arr.push(2);
arr.push(3);
console.log('push 1 2 3');
console.log(arr);
console.log('shift()')
arr.shift();
console.log(arr);
arr.unshift(1);
console.log(arr);
console.log(arr.indexOf(1));
console.log(arr.slice(0,2));
arr.push(1);
console.log(arr.lastIndexOf(1));
console.log([1,2,3].concat([4,5,6]));

//range sum
function range(start, end, step = 1) {
    let arr = [];
    for (let i = start; i <= end; i += step) {
        arr.push(i);
    }
    return arr;
}

function sum(arr) {
    return arr.reduce((summation, num) => { return summation + num }, 0);
}
console.log(sum(range(1,9,2)));

//reverse array
function reverseArray(arr) {
    if (arr == null) {
        return null;
    }
    let new_arr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        new_arr.push(arr[i]);
    }
    return new_arr;
}
console.log(reverseArray([1,2,3]));

function reverseArrayInPlace(arr) {
    if (arr == null) {
        return null;
    }
    for (let i = 0; i < arr.length / 2; i++) {
        let temp = arr[i];
        arr[i] = arr[arr.length - i - 1];
        arr[arr.length - i - 1] = temp;
    }
    return arr;
}
console.log(reverseArrayInPlace([1,2,3]));

//convert array to linked list
function listToArray(arr) {
    if (arr.length === 0) {
        return arr;
    }
    let list = { data: arr[arr.length-1], next: null };
    for (let i = arr.length-2; i >= 0; i--) {
        list = { data: arr[i], next: list };
    }
    return list;
}
console.log(listToArray([1,2,3]).next.next.data);

//deepEqual
function deepEqual(obj1, obj2) {
    if (obj1 === null && obj2 === null) {
        return true;
    }
    else if (obj1 === null || obj2 === null) {
        return false;
    }
    else if (typeof obj1 == typeof obj2) {
        if (Object.keys(obj1).length != Object.keys(obj2).length) {
            return false;
        }
        for (let k in obj1) {
            if (!(obj1.hasOwnProperty(k) && obj2.hasOwnProperty(k)
                && obj1[k] === obj2[k])) {
                return false;
            }
        }
    }
    return true;
}
console.log(deepEqual({'name': 'charles', 'gender': 'male'}, {'name': 'charles', 'gender': 'male'}));
console.log(deepEqual({'name': 'charles', 'gender': 'male'}, {'name': 'charles', 'gender': 'male', 'age': 25}));
console.log(deepEqual({'name': 'charles', 'gender': 'male'}, {'name': 'charles', 'gender': 'female'}));

