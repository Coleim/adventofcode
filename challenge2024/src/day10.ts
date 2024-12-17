
import { readFileSync } from 'fs';

const file = readFileSync('inputs/day10', 'utf8');

interface Position {
  x: number;
  y: number;
}
const map: number[][] = [];
const startingPoints: Position[] = []
let y = 0
file.split(/\r?\n/).forEach(function(line) {
  if (line.length === 0) return
  const cols = line.split('').map(s => Number(s))
  map.push(cols)
  cols.map((e, i) => e === 0 ? i : null).filter(s => s !== null).forEach(s => startingPoints.push({ x: s, y }))
  ++y
})

console.log("> Map: ", map)
console.log("> Starting Points: ", startingPoints)

let trailheads = 0



startingPoints.forEach(p => {
  const copyMap = JSON.parse(JSON.stringify(map));
  let t = walk(p, copyMap)
  console.log("found : ", t)
  trailheads += t
})

console.log("Trail : ", trailheads)

// console.log("> Map: ", map)

function walk(p: Position, map: number[][]) {

  const weight = map[p.y][p.x]
  // console.log(`w[${p.x}][${p.y}]: `, weight)
  // if w == 9 => it is the end, so add 1
  if (weight === 9) {
    // console.log("Found trailhead")
    map[p.y][p.x] = -1
    return 1
  }

  let pathFounds = 0

  // Search bigger weight around
  if (map[p.y - 1] !== undefined && map[p.y - 1][p.x] === weight + 1) {
    pathFounds += walk({ x: p.x, y: p.y - 1 }, map)

  }
  if (map[p.y + 1] !== undefined && map[p.y + 1][p.x] === weight + 1) {
    pathFounds += walk({ y: p.y + 1, x: p.x }, map)
  }
  if (map[p.y][p.x + 1] === weight + 1) {
    pathFounds += walk({ y: p.y, x: p.x + 1 }, map)
  }
  if (map[p.y][p.x - 1] === weight + 1) {
    pathFounds += walk({ y: p.y, x: p.x - 1 }, map)
  }


  return pathFounds


}



