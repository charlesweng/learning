var animals = [
{ name: 'john', species: 'dog', weight: 180},
{ name: 'chuck', species: 'dog', weight: 240},
{ name: 'kevin', species: 'cat', weight: 165},
{ name: 'fan', species: 'dog', weight: 175}]
console.log('data: ');
console.log('======');
console.log(animals);
console.log('======');

// list = list.filter(function(list_element)=>boolean)
var dogs = animals.filter((animal) => animal.species === 'dog');
console.log();
console.log('animals.filter((animal) => animal.species === "dog"')
console.log('=>');
console.log(dogs);
console.log();

// list_of_sub_element = list.map(function(list_element)=>list_sub_element)
var names = animals.map((animal) => animal.name + ' is a ' + animal.species);
console.log();
console.log("animals.map((animal) => animal.name + ' is a ' + animal.species)");
console.log('=>');
console.log(names);
console.log();

// variable = list.reduce(function(initial_element, list_element)=>list_sub_element*op*initial_element, initial_value)
var total_weight = animals.reduce((total_weight, animal) => total_weight + animal.weight, 0);
console.log();
console.log("animals.reduce((total_weight, animal) => total_weight + animal.weight, 0)");
console.log('=>');
console.log(total_weight);
console.log();

/*
use currying to improve
=======================

var has_species = (species, obj) => species === obj.species;
var cats = animals.filter(animal => has_species('cat', animal));

console.log(cats);

*/

//curry-improved
has_species =
  species =>
    animal =>
      species === animal.species;

let cats = animals.filter(has_species('cat'));
console.log();
console.log(
  "has_species =\n"+
  "  species =>\n"+
  "    animal =>\n"+
  "      species === animal.species;"
    );
console.log();
console.log("let cats = animals.filter(has_species('cat'));");
console.log('=>');
console.log(cats);
console.log();
