var Person = function(firstAndLast) {
    this.firstAndLast = firstAndLast;
    // Complete the method below and implement the others similarly
    this.getFullName = function() {
      return this.firstAndLast;
    };
    this.getFirstName = function() {
      return this.firstAndLast.split(' ')[0];
    };
    this.getLastName = function () {
      return this.firstAndLast.split(' ')[1];
    };
    this.setFirstName = function(first) {
      let replace = firstAndLast.split(' ');
      replace[0] = first;
      this.firstAndLast = replace.join(' ');
    };
    this.setLastName = function(last) {
      let replace = firstAndLast.split(' ');
      replace[1] = last;
      this.firstAndLast = replace.join(' ');
    };

    this.setFullName = function(firstAndLast) {
      this.firstAndLast = firstAndLast;
    };

    return firstAndLast;
};

var bob = new Person('Bob Ross');
bob.setFirstName('Billy');
console.log(bob.getFirstName());
