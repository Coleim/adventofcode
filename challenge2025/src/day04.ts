import { readFileSync } from "fs";


const file = readFileSync('inputs/day04', 'utf8');

const rollMap: string[][] = []
file.split(/\r?\n/).forEach(function (line) {
  rollMap.push(line.split(''))
})

let total = 0
type coord = { rowIdx: number; colIdx: number }
function findRolls(): coord[] {
  let coordMap: coord[] = []
  for (let i = 0; i < rollMap.length; ++i) {
    const row = rollMap[i]
    console.log(row.join(''))
    for (let j = 0; j < row.length; ++j) {
      if (row[j] === "@" && hasLessThan4Adjacents(i, j)) {
        total++
        coordMap.push({ rowIdx: i, colIdx: j })
      }
    }
  }
  return coordMap
}

function removeRolls(coords: coord[]) {
  for (let coord of coords) {
    rollMap[coord.rowIdx][coord.colIdx] = "."
  }
}

let coords = findRolls()
while (coords.length > 0) {
  removeRolls(coords)
  coords = findRolls()
  console.log(coords)
}

console.log("TOTAL: ", total)


function hasLessThan4Adjacents(rowIndex: number, colIndex: number): boolean {
  let count = 0
  for (let i = rowIndex - 1; i <= rowIndex + 1; ++i) {
    for (let j = colIndex - 1; j <= colIndex + 1; ++j) {
      if (!(i === rowIndex && j === colIndex) && rollMap[i] && rollMap[i][j] === "@") {
        count++
      }
    }
  }
  return count < 4

}
