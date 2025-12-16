import { readFileSync } from "fs";


const file = readFileSync('inputs/day03', 'utf8');

let totalSum = 0
file.split(/\r?\n/).forEach(function (line) {
  // console.log("line: ", line)
  totalSum += computeMaxVoltage(line)
})

//
//
console.log("SUM: ", totalSum)

function computeMaxVoltage(line: string): number {

  let maxVoltage = ""
  let limit = 11
  let maxDigit = 0
  let maxIndex = -1

  for (let i = 0; i <= limit; ++i) {
    [maxDigit, maxIndex] = getMaxDigit(line, maxIndex + 1, limit - i)
    maxVoltage = maxVoltage + maxDigit
  }
  // console.log("maxVolate: ", maxVoltage)
  return Number(maxVoltage)
}

function getMaxDigit(line: string, startsAt: number, limit: number): [maxDigit: number, maxIndex: number] {
  let maxIndex = 0
  let maxDigit = 0

  for (let i = startsAt; i < line.length - limit; ++i) {
    const char = line[i]
    const digit = Number(char)
    if (digit > maxDigit) {
      maxDigit = digit
      maxIndex = i
    }
  }

  return [maxDigit, maxIndex]
}
