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


console.log(ingredientsIndex)

ingredientsIndex = joinIndexes(ingredientsIndex)

console.log(ingredientsIndex)
console.log(ingredients)

function joinIndexes(indexes: number[][]): number[][] {
  let sorted = indexes.sort((a, b) => a[0] - b[0])
  return sorted
}


let total = 0

for (const ingredient of ingredients) {
  for (let range of ingredientsIndex) {
    if (range[0] <= ingredient && ingredient <= range[1]) {
      total++
      break
    }
  }
}


console.log("TOTAL: ", total)


