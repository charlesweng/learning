let addNum = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if (num1 === 0 || num2 === 0) {
            reject(new Error('numbers cannot be zero.'))
        }
        resolve(num1 + num2);
    });
};

Promise.all([
    addNum(1,1),
    addNum(2,2),
    addNum(0,3) //(3,3)
]).then((returnValue) => {
    console.log(returnValue);
}).catch((reason) => {
    console.log('rejected because ' + reason);
});
