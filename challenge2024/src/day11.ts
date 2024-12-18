import { readFileSync } from 'fs';

const file = readFileSync('inputs/day11', 'utf8').trimEnd();

console.log(file)

let stoneArrangement: string[] = file.split(' ')
const blinks = 25
for (let blink = 0; blink < blinks; ++blink) {

  let newArragement: string[] = []
  for (let stone of stoneArrangement) {
    console.log("processing stone: -", stone, "- len: ", newArragement.length)
    newArragement.push(...processStone(stone))
  }
  stoneArrangement = newArragement
  // console.log(`After ${blink} blink`)
  // console.log(`${newArragement}`)
}

console.log(">> Response: ", stoneArrangement.length)

function processStone(stone: string): string[] {
  if (stone === '0') return ['1']
  // console.log(stone.length)
  if (stone.length % 2 === 0) {
    const half = stone.length / 2
    // console.log(" half : ", half)
    // console.log(Number(stone.slice(0, half)))
    return [
      Number(stone.slice(0, half)).toString(),
      Number(stone.slice(half, stone.length)).toString()
    ]
  }


  return [(Number(stone) * 2024).toString()]
}
