const prompt = require("prompt-sync")({sigint: true});

const line = prompt("line: ")
const line_arr = line.split("");

let unique_chars = [];
let chars_map = new Map();
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

for (let i = 0; i < line_arr.length; i++) {
    if ( !unique_chars.includes(line_arr[i]) && letters.includes(line_arr[i])) {
        unique_chars.push(line_arr[i]);
        chars_map.set(line_arr[i], 1);
    }
    else {
        chars_map.set(line_arr[i], chars_map.get(line_arr[i]) + 1);
    }
}

console.log(unique_chars.length);
let unique_chars_str = "";
for (let i = 0; i < unique_chars.length; i++) {
    unique_chars_str += chars_map.get(unique_chars[i]).toString();
}
console.log(unique_chars_str)

unique_chars_str = ""

for (let i = 0; i < unique_chars.length; i++) {

    unique_chars_str += unique_chars[i] + ": " + chars_map.get(unique_chars[i]).toString() + ", ";
}


console.log(unique_chars_str)
