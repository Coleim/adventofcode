
import { readFileSync } from 'fs';


const file = readFileSync('inputs/day01','utf8');

const list1 = []
const list2 = []

file.split(/\r?\n/).forEach(function(line){
  const cols = line.split('   ')
  if(cols[0].length !== 0) {
    list1.push( cols[0].trim() )
    list2.push( cols[1].trim() )
  }
})

list1.sort()
list2.sort()

let total = 0
for(let i = 0; i < list2.length; ++i ) {
  const res = Math.abs( list1[i]-list2[i] )
  total += res
}
console.log(total)
