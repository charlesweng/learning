// Component Classes
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(otherVector) {
        return new Vector(this.x + otherVector.x, this.y + otherVector.y);
    }

    minus(otherVector) {
        return new Vector(this.x + otherVector.x, this.y + otherVector.y);
    }


}

class BouncingCritter {

    constructor(originChar='o') {
        this.originChar = originChar;
        this.direction = randomElement(directionNames);
    }

    act(view) {
        if (view.look(this.direction) != " ") {
            this.direction = view.find(" ") || "s";
        }
        return {type: 'move', direction: this.direction};
    }
}

class Wall {
    constructor(originChar='#') {
        this.originChar = originChar;
    }
}

let directions = {
    'n' : new Vector(0, -1),
    'ne' : new Vector(1, -1),
    'e' : new Vector(1, 0),
    'se' : new Vector(1, 1),
    's' : new Vector(0, 1),
    'sw' : new Vector(-1, 1),
    'w' : new Vector(-1, 0),
    'nw' : new Vector(-1, -1)
};

// Class to Char & Char to Class converters & Helper Functions
function elementFromChar(legend, ch) {
    if (ch === ' ' || ch === undefined || ch === null) {
        return ' ';
    }
    let element = new legend[ch]();
    element.originChar = ch;
    return element;
}

function charFromElement(element) {
    if (element === null || element === undefined || element === ' ') {
        return null;
    }
    else {
        return element.originChar;
    }
}

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

let directionNames = Object.keys(directions);

// Base Grid Class
class Grid {

    constructor(width, height, legend = { '#': Wall, 'o': BouncingCritter}) {
        this.space = new Array(width * height);
        this.width = width;
        this.height = height;
    }

    isInside(vector) {
        return vector.x >= 0 && vector.x < this.width &&
                vector.y >= 0 && vector.y < this.height;
    }

    get(vector){
        if (this.isInside(vector)) {
            return this.space[vector.x + (vector.y * this.width)];
        }
        return null;
    }

    set(vector, value) {
        if (this.isInside(vector)) {
            this.space[vector.x + (vector.y * this.width)] = value;
        }
    }

    buildWall() {
        for (let x = 0; x < this.width; x++) {
            // create top wall
            this.set(new Vector(x, 0), new Wall());
            // create bottom wall
            this.set(new Vector(x, this.height - 1), new Wall());
        }
        for (let y = 1; y < this.height - 1; y++) {
            // create right wall
            this.set(new Vector(this.width - 1, y), new Wall());
            // create left wall
            this.set(new Vector(0, y), new Wall());
        }
    }

    forEach(f, context) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let value = this.space[x + y * this.width];
                if (value !== null && value !== undefined && value !== ' ') {
                    f.call(context, value, new Vector(x, y));
                }
            }
        }
    }

    toString() {
        let gridString = '';
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let ch =  charFromElement(this.get(new Vector(x, y)));
                gridString += (ch == null) ? ' ' : ch;
            }
            gridString += '\n';
        }
        return gridString;
    }
}



// let grid = new Grid(5, 5);
// console.log(grid.get(new Vector(1, 1)));
// grid.set(new Vector(1,1), 'X');
// console.log(grid.get(new Vector(1, 1)));
// console.log(grid.toString());
// console.log(directionNames);
class RandomGrid extends Grid {

    constructor(width, height, legend = { '#' : Wall, 'o' : BouncingCritter}, weights = [0.2, 0.05]) {
        super(width, height, legend);
        this.legend = legend;
        this.weights = Object.keys(legend).reduce(function(acc, current, currentIndex) {
            if (currentIndex < weights.length) {
                acc[current] = weights[currentIndex];
            }
            return acc;
        }, {});

        this.buildWall();

        this.buildRandomMap();
    }

    buildRandomMap() {
        for (let x = 1; x < this.width - 1; x++) {
            for (let y = 1; y < this.height - 1; y++) {
                this.set(new Vector(x, y), this.randomGridElement());
            }
        }
    }

    randomGridElement() {
        let key;
        let sum = 0;
        let r = Math.random();

        for (key in this.legend) {
            sum += this.weights[key];
            if (r <= sum) {
                return new this.legend[key]();
            }
        }
        return null;
    }

}

class GridFactory {

    constructor() {
    }

    static getGrid(type=undefined, width = 12, height = 28) {
        switch(type) {
            case 'random':
                return new RandomGrid(width, height);
            default:
                return new Grid(width, height);
        }
    }
}

// console.log(GridFactory.getGrid('random').toString());
class View {

    constructor(world, vector) {
        this.world = world;
        this.vector = vector;
    }

    look(dir) {
        let target = this.vector.plus(directions[dir]);
        if (this.world.grid.isInside(target)) {
            return charFromElement(this.world.grid.get(target));
        }
        else {
            return '#';
        }

    }

    find(ch) {
        let found = this.findAll(ch);
        if (found.length == 0) {
            return null;
        }
        return randomElement(found);
    }

    findAll(ch) {
        let found = [];
        for (let dir in directions) {
            if (directions.hasOwnProperty(dir) && this.look(dir) == ch) {
                found.push(dir);
            }
        }
        return found;
    }

}

class World {
    constructor(map, legend) {
        let grid = new RandomGrid(28, 12);
        if (map !== null && map !== undefined) {
            grid = new Grid(map[0].length, map.length, legend);
            map.forEach((line, y) => {
                for (let x = 0; x < line.length; x++) {
                    grid.set(new Vector(x, y),
                        elementFromChar(legend, line[x]));
                }
            });
        }
        this.grid = grid;
        this.legend = legend;
    }

    turn() {
        let acted = [];
        this.grid.forEach(function(critter, vector) {
            if (critter.act && acted.indexOf(critter) == -1) {
                acted.push(critter);
                this.letAct(critter, vector);
            }
        }, this);
    }

    letAct(critter, vector) {
        let action = critter.act(new View(this, vector));
        if (action && action.type == 'move') {
            let dest = this.checkDestination(action, vector);
            if (dest && this.grid.get(dest) == null) {
                this.grid.set(vector, null);
                this.grid.set(dest, critter);
            }
        }
    }

    checkDestination(action, vector) {
        if (directions.hasOwnProperty(action.direction)) {
            let dest = vector.plus(directions[action.direction]);
            if (this.grid.isInside(dest)) {
                return dest;
            }
        }
    }

    toString() {
        let output = '';
        for (let y = 0; y < this.grid.height; y++) {
            for (let x = 0; x < this.grid.width; x++) {
                let element = this.grid.get(new Vector(x, y));
                let ch = charFromElement(element);
                output += (ch == null) ? ' ' : ch;
            }
            output += '\n';
        }
        return output;
    }

}

// console.log(GridFactory.getGrid('random').toString());
let world = new World(undefined, {'#': Wall, "o": BouncingCritter});
// console.log(world.toString());
// for (var i = 0; i < 5; i++) {
//     world.turn();
//     console.log(world.toString());
// }


function dirPlus(dir, n) {
    let index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}

class WallFollower {
    constructor() {
        this.dir = 's';
    }

    act(view) {
        let start = this.dir;
        if (view.look(dirPlus(this.dir, -3))) {
            start = this.dir = dirPlus(this.dir, -2);
        }
        do {
            this.dir = dirPlus(this.dir, 1);
        } while (this.dir != start && view.look(this.dir) != ' ');
        return { type: 'move', direction: this.dir };
    }
}

let actionTypes = {
    grow: function(critter) {
        critter.energy += 0.5;
        return true;
    },

    move: function(critter, vector, action) {
        let dest = this.checkDestination(action, vector);
        if (dest == null || critter.energy <= 1 || this.grid.get(dest) != null) {
            return false;
        }
        critter.energy -= 1;
        this.grid.set(vector, null);
        this.grid.set(dest, critter);
        return true;
    },

    eat: function(critter, vector, action) {
        let dest = this.checkDestination(action, vector);
        let atDest = dest != null && this.grid.get(dest);
        if (!atDest || atDest.energy == null) {
            return false;
        }
        critter.energy += atDest.energy;
        this.grid.set(dest,null);
        return true;
    },

    reproduce: function(critter, vector, action) {
        let baby = elementFromChar(this.legend, critter.originChar);
        let dest = this.checkDestination(action, vector);
        if (dest == null || critter.energy <= 2 * baby.energy || this.grid.get(dest) != null) {
            return false;
        }
        critter.energy -= 2 * baby.energy;
        this.grid.set(dest, baby);
        return true;
    }
};

class LifeLikeWorld extends World {
    constructor(map, legend) {
        super(map, legend);
    }

    letAct(critter, vector) {
        let action = critter.act(new View(this, vector));
        let handled = action && action.type in actionTypes &&
                actionTypes[action.type].call(this, critter, vector, action);

        if (!handled) {
            critter.energy -= 2;
            if (critter.energy <= 0) {
                this.grid.set(vector, null);
            }
        }
    }
}

class Plant {
    constructor() {
        this.energy = 3 + Math.random() * 4;
    }

    act(view) {
        if (this.energy > 15) {
            let space = view.find(null);
            if (space != null) {
                return { type: 'reproduce', direction: space };
            }
        }
        else if (this.energy < 20) {
            return { type: 'grow' };
        }
    }
}

class PlantEater {
    constructor() {
        this.energy = 20;
    }

    act(view) {
        let space = view.find(null);
        if (this.energy > 60 && space) {
            return { type: 'reproduce', direction: space };
        }
        let plant = view.find('*');
        if (plant) {
            return { type: 'eat', direction: plant };
        }
        if (space) {
            return { type: 'move', direction: space };
        }
    }
}

let valley = new LifeLikeWorld(
    ["############################",
     "#####                  #####",
     "##   ***                **##",
     "#   *##**          **  o *##",
     "#    ***      o    ##**   *#",
     "#       o          ##***   #",
     "#                  ##**    #",
     "#   o       #*             #",
     "#*          #**        o   #",
     "#***        ##**     o   **#",
     "##****     ###***        *##",
     "############################"
    ],
    {"#": Wall,
     "o": PlantEater,
     "*": Plant}
);
console.log(valley.toString());
for (var i = 0; i < 30; i++) {
    valley.turn();
    console.log(valley.toString());
}
