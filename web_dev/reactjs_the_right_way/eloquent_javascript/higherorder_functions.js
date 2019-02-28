/**
 * Created by charlesweng on 1/15/18.
 */
function flatten(arr) {
    return arr.reduce((flattened, sub_arr) => { return flattened.concat(sub_arr) }, []);
}
console.log(flatten([[1,2],[3]]));
/*
Huge Ancestry Problem
 */
let ancestry = [
    {"name": "Emma de Milliano", "sex": "f",
        "born": 1876, "died": 1956, "father": "Petrus de Milliano", "mother": "Sophia van Damme"},
    {"name": "Carolus Haverbeke", "sex": "m", "born": 1832, "died": 1905,
        "father": "Carel Haverbeke",
        "mother": "Maria van Brussel"},
    {"name": "Sophia van Damme", "sex": "m", "born": 1800, "died": 1880,
        "father": "Carel Haverbeke",
        "mother": "Virginia van Brussel"},
    {"name": "Maria van Brussel", "sex": "f", "born": 1808, "died": 1905,
        "father": "Carel Haverbeke",
        "mother": "Virgina van Brussel"}
];
function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus);
}
let byName = {};
ancestry.forEach(function(person) {
    byName[person.name] = person;
});
/*
get all the mothers
get all their children
 */
function findMotherChildAverage(byNameData) {
    function motherChildDifference(sumage_and_count = { sumage: 0, count: 0}, person = {}) {
        if (person.mother != null && byNameData.hasOwnProperty(person.mother)) {
            sumage_and_count.count += 1;
            sumage_and_count.sumage += (person.born - byNameData[person.mother].born)
            return sumage_and_count;
        }
        else {
            return sumage_and_count;
        }
    }
    let sumage_and_count = ancestry.reduce(motherChildDifference, { sumage: 0, count: 0 });
    console.log(sumage_and_count);
    return (sumage_and_count.sumage / sumage_and_count.count);
}
console.log(findMotherChildAverage(byName));

/*
group by century
 */
function groupBy(group, person) {
    let century = Math.ceil(person.died/100);
    if (group === null || group === undefined) {
        group = {};
        group[century] = [ person ];
    }
    else if (group[century] === undefined) {
        group[century] = [ person ];
    }
    else {
        group[century] = group[century].concat(person);
    }
    return group;
}

function centuryAvg(group) {
    for (let key in group) {
        if (group.hasOwnProperty(key)) {
            let avg_age_of_people_of_the_century = group[key].reduce((avg, person) => {
                return avg + person.died - person.born;
            }, 0);
            group[key] = Math.round(avg_age_of_people_of_the_century / group[key].length);
        }
    }
    return group;
}
console.log(ancestry.reduce(groupBy, undefined));
console.log(centuryAvg(ancestry.reduce(groupBy, undefined)));

// Every & Some
function every(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
        if (!fn(arr[i])) {
            return false;
        }
    }
    return true;
}

function some(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i])) {
            return true;
        }
    }
    return false;
}

console.log(every([1,2,3], (num) => num > 0));
console.log(some([1,2,3], (num) => num < 2));
