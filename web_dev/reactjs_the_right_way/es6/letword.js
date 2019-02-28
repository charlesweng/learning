let message = 'hi';
{
    let message = 'bye';
}
console.log(message);
console.log();

var fs = [];
for (let i = 0; i < 10; i++) {
    fs.push(function () {
        console.log(i);
    })
}

fs.forEach((f) => f());
console.log();

function varFunc(n) {
    var previous = 0;
    var current = 1;
    var i;
    var temp;

    for (i = 0; i < n; i++) {
        temp = previous;
        previous = current;
        current = temp + current;
        console.log(current);
    }
}
varFunc(10);
console.log();

function varFunc(n) {
    let previous = 0;
    let current = 1;
    for (let i = 0; i < 10; i++) {
        let temp = previous;
        previous = current;
        current = temp + current;
        console.log(current);
    }
}
varFunc(10);
console.log();