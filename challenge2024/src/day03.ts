
import { warn } from 'console';
import { readFileSync } from 'fs';
import { argv0 } from 'process';


const file = readFileSync('inputs/day03', 'utf8');


const regex = /mul\(\d{1,3},\d{1,3}\)/g
const regexMul = /mul\((\d{1,3}),(\d{1,3})\)/g
let result = 0
const arrayMul = file.match(regex)
arrayMul!.forEach(elt => {
  const groups = [...elt.matchAll(regexMul)]
  const res = Number(groups[0][1]) * Number(groups[0][2])
  console.log("Sum " , res)
  result += res
});


console.log(result)
