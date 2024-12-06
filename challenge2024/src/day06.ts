
import { readFileSync } from 'fs';
import { argv0 } from 'process';

function isInMap(guardPositionX: number, guardPositionY: number, map: string[][]) {
  if (guardPositionX < 0 || guardPositionY < 0) return false
  if (guardPositionX >= map[0].length || guardPositionY >= map.length) return false
  return true
}

function moveGuard(guardPositionX: number, guardPositionY: number, momentumX: number, momentumY: number, map: string[][]): number {
  let moveCount = 0

  while (isInMap(guardPositionX, guardPositionY, map) && map[guardPositionY][guardPositionX] !== '#') {
    map[guardPositionY][guardPositionX] = "X"
    guardPositionY += momentumY
    guardPositionX += momentumX
    moveCount++
  }
  if (!isInMap(guardPositionX, guardPositionY, map)) {
    moveCount++
  }
  return moveCount
}
const file = readFileSync('inputs/day06', 'utf8');

const map: string[][] = []
let guardPositionX = -1
let guardPositionY = -1
let count = 0

// console.log(isInMap(guardPositionX, guardPositionY, map))

file.split(/\r?\n/).forEach(function(line) {
  if (line.length === 0) return
  map.push(line.split(''))
  if (guardPositionX === -1) {
    guardPositionX = line.indexOf('^')
    guardPositionY = count
  }
  ++count
})

console.log(map.map(e => e.join('')).join('\n'))
console.log("guardPosition: ", guardPositionX, ' - ', guardPositionY)


let countIterations = 20000
while (isInMap(guardPositionX, guardPositionY, map) && countIterations > 0) {
  countIterations--
  // get the guard
  const guard = map[guardPositionY][guardPositionX]
  console.log("guard: ", guard)
  map[guardPositionY][guardPositionX] = "X"
  if (guard === "^") {
    // move up
    const movedCount = moveGuard(guardPositionX, guardPositionY, 0, -1, map);
    guardPositionY -= movedCount - 1
    if (isInMap(guardPositionX, guardPositionY, map)) {
      map[guardPositionY][guardPositionX] = ">"
    }
  } else if (guard === '>') {
    // move right
    const movedCount = moveGuard(guardPositionX, guardPositionY, 1, 0, map);
    guardPositionX += movedCount - 1
    if (isInMap(guardPositionX, guardPositionY, map)) {
      map[guardPositionY][guardPositionX] = "v"
    }
  } else if (guard === 'v') {
    const movedCount = moveGuard(guardPositionX, guardPositionY, 0, 1, map);
    guardPositionY += movedCount - 1
    if (isInMap(guardPositionX, guardPositionY, map)) {
      map[guardPositionY][guardPositionX] = "<"
    }
  } else {
    const movedCount = moveGuard(guardPositionX, guardPositionY, -1, 0, map);
    guardPositionX -= movedCount - 1
    if (isInMap(guardPositionX, guardPositionY, map)) {
      map[guardPositionY][guardPositionX] = "^"
    }
  }
  // console.log(map.map(e => e.join('')).join('\n'))
  // console.log("\x1b[36m%s\x1b[0m ", "--------------------------")
}
console.log("iterations left: ", countIterations)

console.log(map.map(e => e.join('')).join('\n'))
console.log(map.map(e => e.filter(g => g === 'X').join('')).join('').length)
