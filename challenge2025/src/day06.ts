import { readFileSync } from "fs";


const file = readFileSync('inputs/day06', 'utf8');

let operations: string[] = []
const numbers: number[][] = []
file.split(/\r?\n/).forEach(function (line) {
  // console.log(line[0])
  if (Number.isNaN(Number(line[0]))) {
    // console.log("NAN")
    operations.push(...line.split(' ').filter(o => o.length > 0))
    console.log(operations)
  } else {
    numbers.push(line.split(' ').filter(n => n.length > 0).map(Number))
  }
})

console.log("numbers: ", numbers)
console.log("op: ", operations)

let total = 0

for (let col = 0; col < operations.length; ++col) {
  let subTotal: number | undefined = undefined
  let op = operations[col]
  for (let line = 0; line < numbers.length; ++line) {
    // let number = numbers[line][col]
    console.log(numbers[line][col])
    if (subTotal) {
      subTotal = operate(subTotal, numbers[line][col], op)
    } else {
      subTotal = numbers[line][col]

    }
  }
  total += subTotal!
}

function operate(number1: number, number2: number, operation: string): number {

  switch (operation) {
    case '*': return number1 * number2;
    case '+': return number1 + number2;
  }
  return 0;
}

console.log("TOTAL: ", total)


