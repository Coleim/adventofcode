import { readFileSync } from "fs";


const file = readFileSync('inputs/day02', 'utf8');
// const file = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124"

let totalSum = 0
file.split(',').forEach(range => {
  console.log("range: ", range)
  totalSum += findInvalidIdsInRange(range).reduce((acc, val) => acc + val, 0)
})

//
//
console.log("SUM: ", totalSum)


function findInvalidIdsInRange(range: string): number[] {

  const ranges = range.split('-')
  const first = Number(ranges[0])
  const second = Number(ranges[1])

  const invalidIds: number[] = []
  for (let i = first; i <= second; ++i) {
    if (isInvalidId(i)) {
      invalidIds.push(i)
    }
  }
  console.log("invalids: ", invalidIds)
  return invalidIds
}

function isInvalidId(id: number): boolean {

  const idStr: string = id.toString()

  // 2121212121
  for (let i = 0; i < idStr.length; ++i) {
    const pattern: string = idStr.substring(0, i + 1)
    const range: number = pattern.length
    if (range === idStr.length) return false

    let allSame = true
    for (let j = i + 1; j < idStr.length; j += range) {
      // 21 212121
      const strComp = idStr.substring(j, j + range)
      if (strComp !== pattern) {
        allSame = false
        break
      }
    }
    if (allSame) {
      return true
    }
    // Aller voir la chaine de SiimonnLeGalerien
    //
  }

  return false
}
