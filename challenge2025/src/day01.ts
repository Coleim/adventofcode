import { readFileSync } from 'fs';

const file = readFileSync('inputs/day01', 'utf8');

let list1: string[] = []

file.split(/\r?\n/).forEach(function (line) {
  list1.push(line.trim())
})


// list1 = ["L68", "L30", "R48", "L5", "R60", "L55", "L1", "L99", "R14", "L82"]

let total = 0
let dial = 50
// for (let i = 0; i < 150; ++i) {
for (let i = 0; i < list1.length; ++i) {
  const move: string = list1[i]
  console.log("Move: ", move)
  if (move.startsWith("R")) {
    const number = Number(move.replace("R", ''))
    const bigDial = dial + number
    total += Math.floor(bigDial / 100)
    dial = (bigDial) % 100
  } else {
    const number = Number(move.replace("L", ''))
    if (dial === 0) dial = 100
    dial = (dial - number)
    if (dial <= 0) {
      total += 1
      total += Math.abs(Math.trunc(dial / 100))
      dial = (100 + (dial % 100)) % 100
    }
  }

  console.log("new dial, ", dial)
  console.log("current total: ", total)
}




console.log(total)
