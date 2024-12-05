
import { readFileSync } from 'fs';


const file = readFileSync('inputs/day04','utf8').replace(/[^XMAS\n]/g, '.');

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
        if (map[row][col] === 'X') {
            if( map[row][col-1] === 'M' && map[row][col-2] === 'A' && map[row][col-3] === 'S') {
                xmasCount++
            }
            if( map[row][col+1] === 'M' && map[row][col+2] === 'A' && map[row][col+3] === 'S') {
                xmasCount++
            }
            if( map[row+3] && map[row+1][col] === 'M' && map[row+2][col] === 'A' && map[row+3][col] === 'S') {
                xmasCount++
            }
            if( map[row-3] && map[row-1][col] === 'M' && map[row-2][col] === 'A' && map[row-3][col] === 'S') {
                xmasCount++
            }
            // Check diagonals
            if( map[row+3] && map[row+1][col+1] === 'M' && map[row+2][col+2] === 'A' && map[row+3][col+3] === 'S') {
                xmasCount++
            }
            if( map[row+3] && map[row+1][col-1] === 'M' && map[row+2][col-2] === 'A' && map[row+3][col-3] === 'S') {
                xmasCount++
            }
            if( map[row-3] && map[row-1][col+1] === 'M' && map[row-2][col+2] === 'A' && map[row-3][col+3] === 'S') {
                xmasCount++
            }
            if( map[row-3] && map[row-1][col-1] === 'M' && map[row-2][col-2] === 'A' && map[row-3][col-3] === 'S') {
                xmasCount++
            }
        }
    }
}

console.log("XMAS count: ", xmasCount);


