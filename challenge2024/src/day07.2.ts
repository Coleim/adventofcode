
import { readFileSync } from 'fs';


const file = readFileSync('inputs/day07', 'utf8');

let sum = 0
file.split(/\r?\n/).forEach(function(line) {
  if (line.length === 0) return
  const parts = line.split(': ')
  console.log(parts)
  const total = Number(parts[0])
  const operators = parts[1].split(' ')
  console.log("toalt: ", total)
  console.log(" operators: ", operators)
  if (isValid(total, operators, 1, Number(operators[0]))) {
    sum += total
    console.log('\x1b[36m%s\x1b[0m', 'Is Valid')
  }
})


console.log(" Sum : ", sum)

function isValid(total: number, operators: string[], start: number, calculated: number) {

  if (operators.length === start) {
    return total === calculated
  }

  let newCalc = `${calculated}${operators[start]}`;
  if (isValid(total, operators, start + 1, Number(newCalc))) return true

  calculated += Number(operators[start])
  if (isValid(total, operators, start + 1, calculated)) return true
  calculated -= Number(operators[start])
  calculated *= Number(operators[start])
  if (isValid(total, operators, start + 1, calculated)) return true

  return false

}
