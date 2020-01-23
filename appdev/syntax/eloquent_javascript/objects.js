/**
 * Created by charlesweng on 1/17/18.
 */
//es5
// function Vector(x, y) {
//     this.x = x;
//     this.y = y;
// };
// let v = new Vector(1,1);

//es6
class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(otherVector) {
        return new Vector(this.x + otherVector.x, this.y + otherVector.y);
    }

    minus(otherVector) {
        return new Vector(this.x - otherVector.x, this.y - otherVector.y);
    }

    get length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

}

let v1 = new Vector(1, 1);
let v2 = new Vector(1, 1);
console.log(v1.plus(v2));
console.log(v1.minus(v2));
console.log(v2.length);

/*
Build a table/cell creator -
It should delimit cell and perfectly gauge the right width for each cell like so:

See Eloquent Javascript, the Secret Life of Object Chapter

1. Use the largest width of the column
2. Use Underline the headers
3. Try to use as much higher order functions
   a. map
   b. reduce
4. Right align numbers
5. Left align letters

Example:

Country       Code Power
------------- ---- -----
United States  001 Huge
China          002 Huge
Russia         003 Huge
Germany        004 Huge
France         005 Ok
England        006 Weak

6. Create StretchCell(inner, width, height) which ensures
that each cell is at least width and height - even if the inner cell
is naturally smaller.
 */

/*
Sequence interface
1. find when end of sequence is reached
2. logFive()
 */

class Sequence {

    constructor(seq) {
        this.seq = seq;
    }

    get lastIndex() {
        return this.seq.arr.length-1;
    }

    get lastElement() {
        return this.seq.arr[this.lastIndex()];
    }

    iterate() {
        this.seq.arr.forEach((num) => console.log(num));
    }

    logFive() {
        for (let i = 0; i < 5; i++) {
            if (this.seq.arr.length == i) {
                break;
            }
            console.log(this.seq.arr[i]);
        }
    }

}

class ArraySeq {
    constructor(arr) {
        this.arr = arr;
    }
}

class RangeSeq {
    constructor(from, to) {
        this.arr = [];
        for (let i = from; i <= to; i++) {
            this.arr.push(i);
        }
    }
}

let seq1 = new Sequence(new RangeSeq(1,5));
let seq2 = new Sequence(new ArraySeq([1,2,3,4,5]));

seq1.logFive();
seq2.logFive();
