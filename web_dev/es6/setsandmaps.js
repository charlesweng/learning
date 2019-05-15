/**
 * Created by charlesweng on 1/8/18.
 */
var engines = new Set();

engines.add("Gecko");
engines.add("Trident");
engines.add("Webkit");
engines.add("Hippo");
engines.add("Hippo");

console.log("Engines has Hippo: " + engines.has("Hippo"));
console.log("Engines has Webkit: " + engines.has("Webkit"));
console.log("Engines has Trident: " + engines.has("Webkit"));
console.log("Engines has Gecko: " + engines.has("Webkit"));
console.log();

engines.delete("Hippo");
console.log("Engines has Hippo: " + engines.has("Hippo"));
console.log();

let map = new Map();
map.set(undefined, 'Weng');
map.set(123, 321);
map.set(10, 'Charles');

console.log("Undefined exists: " + map.has(undefined));
if (map.get(undefined)) {
    console.log("Value of key undefined is my last name - " + map.get(undefined));
}
console.log()

map.delete(undefined);
console.log("Undefined exists: " + map.has(undefined));
console.log();