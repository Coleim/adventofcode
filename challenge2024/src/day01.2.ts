
import { readFileSync } from 'fs';


const file = readFileSync('inputs/day01','utf8');

let list1 = []
let list2 = []

file.split(/\r?\n/).forEach(function(line){
  const cols = line.split('   ')
  if(cols[0].length !== 0) {
    list1.push( cols[0].trim() )
    list2.push( cols[1].trim() )
  }
})

list1.sort()
list2.sort()


// list1 = [3,4,2]
// list2 = [4,3,3]
let total = 0
for(let i = 0; i < list1.length; ++i ) {
  const num = list1[i]
  const mult = list2.filter(x => x === num ).length

  total += num*mult
}
console.log(total)
