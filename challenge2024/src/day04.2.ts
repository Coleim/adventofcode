
import { readFileSync } from 'fs';


const file = readFileSync('inputs/day04','utf8').replace(/[^MAS\n]/g, '.');

const map: string[][] = [];
file.split(/\r?\n/).forEach(function(line){
  map.push(line.split(''));
})
console.log(map);

let xmasCount = 0;
for(let row = 0; row < map.length; ++row) {
    // console.log("row: ", row, " = " , map[row]);
    for(let col = 0; col < map[row].length; ++col) {
        // console.log("col: ", col, " = " , map[row][col]);
        if (map[row][col] === 'A') {
            if( map[row-1] === undefined || map[row+1] === undefined) continue
            if( (map[row-1][col-1] === 'M' && map[row+1][col+1] === 'S') 
                || (map[row-1][col-1] === 'S' && map[row+1][col+1] === 'M')) {
                if( (map[row-1][col+1] === 'M' && map[row+1][col-1] === 'S') 
                    || (map[row-1][col+1] === 'S' && map[row+1][col-1] === 'M') ) { 
                    xmasCount++
                }
            }
        }
    }
}

console.log("MAS count: ", xmasCount);


