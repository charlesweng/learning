/**
 * Created by charlesweng on 1/8/18.
 */
//confirm('please confirm');
//prompt('are you gay, does your mother know you\'re gay?');

// var theNumber = Number(prompt("Pick a number", ""));
// if (!isNaN(theNumber)) {
//     alert("Your number is the square root of " + theNumber * theNumber);
// }

//looping triangle
/*
    create a triangular hashtag
    #
    ##
    ###
    ####
    #####
    ######
    #######
 */
console.log("TRIANGLE");
function hashTagTriangle(begin = 0, end = 7) {
    let literal = '';
    let stackedLiteral = '';
    for (let i = begin; i < end; i++) {
        literal += '#';
        stackedLiteral += literal;
        if (i < end - 1) {
            stackedLiteral += '\n';
        }
    }
    return stackedLiteral;
}
console.log(hashTagTriangle());
console.log();

console.log("DIVISIBILITY");
function divisibleByThreeAndFive(begin = 1, end = 100) {
    let hundreds = '';
    for (let i = begin; i <= end; i++) {
        switch (true) {
            case i % 3 == 0 && i % 5 == 0:
                hundreds += 'FizzBuzz';
                break;
            case i % 3 == 0:
                hundreds += 'Fizz';
                break;
            case i % 5 == 0:
                hundreds += 'Buzz';
                break;
            default:
                hundreds += ''+i;
                break;
        }
        if (i < end) {
            hundreds += '\n';
        }
    }
    return hundreds;
}
console.log(divisibleByThreeAndFive());
console.log();

console.log("CHESSBOARD");
function chessBoard(width = 8, height = 8) {
    let row = '';
    for (let i = 0; i < width; i++) {
        row += (i % 2 === 0) ? '#' : ' ';
    }
    let board = '';
    for (let j = 0; j < height; j++) {
        if (j % 2 == 0) {
            board += ' ';
        }
        board += row;
        if (j < height - 1) {
            board += '\n';
        }
    }
    return board;
}
console.log(chessBoard());
console.log();