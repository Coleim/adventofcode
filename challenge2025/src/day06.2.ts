import { readFileSync } from "fs";

const file = readFileSync('inputs/day06', 'utf8');

let fileStr = file.split(/\r?\n/).filter(l => l.length > 0)
const operations: string[] = []
let opIdx = -1
fileStr.pop()!.split('').forEach(letter => {
  if (letter === ' ') {
    operations[opIdx] += letter
  } else {
    operations.push(letter)
    opIdx++
  }
})
const opCount = operations.reduce((acc, val) => { return val.length > 0 ? acc + 1 : acc }, 0)

const numbers: string[][] = []
fileStr.forEach((line, idx) => {
  // split the line 
  let start = 0
  let groupIdx = 0
  for (let op of operations) {
    const group = line.substring(start, start + op.length - 1).split('').reverse().join('')
    start = start + op.length

    if (idx === 0) {
      numbers.push([group])
    } else {
      numbers[groupIdx].push(group)
    }
    groupIdx++
  }
})

let total = 0


for (let gId = 0; gId < numbers.length; ++gId) {
  const op = operations[gId]
  const group = numbers[gId]

  const maxLen = group[0].length

  let subTotal: number | undefined = undefined
  for (let nIdx = 0; nIdx < maxLen; ++nIdx) {
    let num = ""
    for (let g of group) {
      console.log(g[nIdx])
      num += g[nIdx]
    }
    if (subTotal) {
      subTotal = operate(subTotal, Number(num.replace(' ', '')), op)
    } else {
      subTotal = Number(num)
    }
  }
  total += subTotal!
}

function operate(number1: number, number2: number, operation: string): number {

  switch (operation.trim()) {
    case '*': return number1 * number2;
    case '+': return number1 + number2;
  }
  return 0;
}

console.log("TOTAL: ", total)


