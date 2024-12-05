
import { warn } from 'console';
import { readFileSync } from 'fs';
import { argv0, availableMemory } from 'process';


const file = readFileSync('inputs/day03', 'utf8');


const regex = /mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)/g
const regexMul = /mul\((\d{1,3}),(\d{1,3})\)/g
let result = 0
let active = true
const arrayMul = file.match(regex)
arrayMul!.forEach(elt => {
  console.log(elt)
  if (elt === "do()") {
    active = true
    console.log("activeate due to ", elt)
  } else if (elt === "don't()") {
    active = false
    console.log("deactiveate due to ", elt)
  } else {
    console.log("group: ", elt)
    if (active) {
      console.log(active)
      const groups = [...elt.matchAll(regexMul)]
      const res = Number(groups[0][1]) * Number(groups[0][2])
      console.log("Sum ", res)
      result += res

    }
  }
});


console.log(result)
