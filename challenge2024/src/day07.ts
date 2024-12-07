
import { readFileSync } from 'fs';


const file = readFileSync('inputs/day07', 'utf8');

let sum = 0
file.split(/\r?\n/).forEach(function(line) {
  if (line.length === 0) return
  const parts = line.split(': ')
  console.log(parts)
  const total = Number(parts[0])
  const operators = parts[1].split(' ').map(a => Number(a))

  console.log("toalt: ", total)
  console.log(" operators: ", operators)
  if (isValid(total, operators, 1, operators[0])) {
    sum += total
    console.log("is isValid ")
  }
})


console.log(" Sum : ", sum)

function isValid(total: number, operators: number[], start: number, calculated: number) {

  if (operators.length === start) {
    return total === calculated
  }

  calculated += operators[start]
  if (isValid(total, operators, start + 1, calculated)) return true
  calculated -= operators[start]
  calculated *= operators[start]
  if (isValid(total, operators, start + 1, calculated)) return true

  return false

}
