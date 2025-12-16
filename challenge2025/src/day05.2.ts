import { readFileSync } from "fs";


const file = readFileSync('inputs/day05', 'utf8');

const ingredients: number[] = []
let ingredientsIndex: number[][] = []
let parseIngredients = false
file.split(/\r?\n/).forEach(function (line) {
  console.log(line)
  if (line.length === 0) {
    parseIngredients = true
  } else {
    if (parseIngredients) {
      ingredients.push(Number(line))
    } else {
      ingredientsIndex.push(line.split('-').map(Number))
    }
  }
})



let ingredientsIds: Set<number> = new Set()
ingredientsIndex = joinIndexes(ingredientsIndex)
console.log(" NEW RANGES ", ingredientsIndex)

function joinIndexes(indexes: number[][]): number[][] {
  let sorted = indexes.sort((a, b) => a[0] - b[0])
  // console.log("Sorted: ", sorted)
  // find overlapping ranges
  const newRanges: number[][] = []
  for (let idx = 0; idx < indexes.length; ++idx) {
    let r = indexes[idx]
    let minR: number = r[0]
    let maxR: number = r[1]
    for (let rightIdx = idx + 1; rightIdx < indexes.length; ++rightIdx) {
      const lr = indexes[rightIdx]
      console.log(" comparing ", [minR, maxR], " with ", lr)
      if (maxR < lr[0]) {
        break
      }
      if (lr[0] <= maxR && maxR <= lr[1]) {
        maxR = lr[1]
        idx = rightIdx
      }
      if (lr[1] <= maxR) {
        idx = rightIdx
      }
    }
    newRanges.push([minR, maxR])
  }
  return newRanges
}


let total = 0

for (let range of ingredientsIndex) {

  const count = range[1] - range[0] + 1
  total += count
  // console.log("range: ", range, "count: ", count)
}


console.log("TOTAL: ", total)


