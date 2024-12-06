
import { trace } from 'console';
import { verify } from 'crypto';
import { readFileSync } from 'fs';

interface Position {
  x: number;
  y: number;
}
function isInMap(point: Position, map: string[][]) {
  if (point.x < 0 || point.y < 0) return false
  if (point.x >= map[0].length || point.y >= map.length) return false
  return true
}

function moveGuard(guard: Position, momentumX: number, momentumY: number, map: string[][]) {
  while (isInMap(guard, map) && map[guard.y][guard.x] !== '#' && map[guard.y][guard.x] !== 'O') {
    map[guard.y][guard.x] = "X"
    guard.y += momentumY
    guard.x += momentumX
  }
  if (isInMap(guard, map)) {
    // go backward to not be on the wall
    guard.y -= momentumY
    guard.x -= momentumX
  }
}

function traverseMap(guard: Position, map: string[][]) {
  let nextDirection = "up"
  let countIterations = 20000
  while (isInMap(guard, map) && countIterations > 0) {
    countIterations--
    // map[guard.y][guard.x] = "X"
    if (nextDirection === "up") {
      // move up
      moveGuard(guard, 0, -1, map);
      nextDirection = "right"
    } else if (nextDirection === 'right') {
      // move right
      moveGuard(guard, 1, 0, map);
      nextDirection = 'down'
    } else if (nextDirection === 'down') {
      moveGuard(guard, 0, 1, map);
      nextDirection = 'left'
    } else {
      moveGuard(guard, -1, 0, map);
      nextDirection = 'up'
    }
  }
  console.log("iterations left: ", countIterations)
}

const file = readFileSync('inputs/day06', 'utf8');

const map: string[][] = []
let guard: Position = { x: -1, y: -1 }
let count = 0

file.split(/\r?\n/).forEach(function(line) {
  if (line.length === 0) return
  map.push(line.split(''))
  if (guard.x === -1) {
    guard.x = line.indexOf('^')
    guard.y = count
  }
  ++count
})

traverseMap({ x: guard.x, y: guard.y }, map);

// get the list of X
const xPos: Position[] = []
for (let y = 0; y < map.length; ++y) {
  for (let x = 0; x < map[y].length; ++x) {
    if (map[y][x] === 'X') {
      xPos.push({ x, y })
    }
  }
}

// put randomly on X a O
let loopCount = 0
for (let pos of xPos) {
  const copyMap = JSON.parse(JSON.stringify(map));
  copyMap[pos.y][pos.x] = 'O'

  const newGuard = { x: guard.x, y: guard.y }
  // traverse the map again and check if guard is on the map
  traverseMap(newGuard, copyMap)
  if (isInMap(newGuard, map)) {
    loopCount++
  }
}

console.log(loopCount)
